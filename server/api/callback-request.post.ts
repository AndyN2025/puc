import nodemailer from 'nodemailer'
import type { H3Event } from 'h3'
import { SITE_EMAIL } from '~/utils/site'

const MAX_BODY_BYTES = 8 * 1024
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const rateLimitStore = new Map<string, number[]>()

interface CallbackRequestBody {
  name?: string
  phone?: string
  phoneDigits?: string
  website?: string
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalizePhone(raw: string) {
  return raw.replace(/\D/g, '')
}

/** Имя: только кириллица, пробел, дефис, апостроф */
const NAME_PATTERN =
  /^[а-яА-ЯёЁ]+(?:[\s'-][а-яА-ЯёЁ]+)*$/u

function formatRuMobileFromDigits(d: string) {
  if (!/^79\d{9}$/.test(d)) return d
  const r = d.slice(1)
  return `+7 (${r.slice(0, 3)}) ${r.slice(3, 6)}-${r.slice(6, 8)}-${r.slice(8, 10)}`
}

function getClientIp(event: H3Event) {
  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  const firstForwarded = forwarded?.split(',')[0]?.trim()
  return firstForwarded || event.node.req.socket.remoteAddress || 'unknown'
}

function assertRateLimit(ip: string) {
  const now = Date.now()
  const recent = (rateLimitStore.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  )

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent)
    throw createError({
      statusCode: 429,
      message: 'Слишком много заявок. Попробуйте позже.'
    })
  }

  recent.push(now)
  rateLimitStore.set(ip, recent)
}

async function readLimitedJsonBody(event: H3Event): Promise<CallbackRequestBody> {
  const chunks: Buffer[] = []
  let total = 0

  for await (const chunk of event.node.req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    total += buffer.length

    if (total > MAX_BODY_BYTES) {
      throw createError({
        statusCode: 413,
        message: 'Слишком большой запрос.'
      })
    }

    chunks.push(buffer)
  }

  if (chunks.length === 0) {
    return {}
  }

  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Body must be a JSON object')
    }
    return parsed as CallbackRequestBody
  } catch {
    throw createError({
      statusCode: 400,
      message: 'Некорректный JSON в запросе.'
    })
  }
}

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Метод не поддерживается.'
    })
  }

  const contentType = getRequestHeader(event, 'content-type') || ''
  if (!contentType.toLowerCase().includes('application/json')) {
    throw createError({
      statusCode: 415,
      message: 'Ожидается Content-Type: application/json.'
    })
  }

  assertRateLimit(getClientIp(event))

  const body = await readLimitedJsonBody(event)

  if (body?.website) {
    return { ok: true }
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const phoneRaw = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const digitsFromField =
    typeof body?.phoneDigits === 'string'
      ? body.phoneDigits.replace(/\D/g, '')
      : ''
  const digitsFromFormatted = normalizePhone(phoneRaw)
  const phoneDigits =
    digitsFromField.length === 11
      ? digitsFromField
      : digitsFromFormatted

  if (name.length < 2 || name.length > 120) {
    throw createError({
      statusCode: 400,
      message: 'Укажите имя (от 2 до 120 символов).'
    })
  }

  if (!NAME_PATTERN.test(name)) {
    throw createError({
      statusCode: 400,
      message: 'Имя укажите на русском языке.'
    })
  }

  if (!/^79\d{9}$/.test(phoneDigits)) {
    throw createError({
      statusCode: 400,
      message: 'Укажите полный российский мобильный номер (10 цифр после +7, с 9).'
    })
  }

  const phonePretty =
    phoneRaw.length > 5 && /^\+7\s*\(/.test(phoneRaw)
      ? phoneRaw
      : formatRuMobileFromDigits(phoneDigits)

  const config = useRuntimeConfig()
  const host = config.callbackSmtpHost as string
  const mailTo =
    (config.callbackMailTo as string)?.trim() || SITE_EMAIL
  const mailFrom =
    (config.callbackMailFrom as string) || (config.callbackSmtpUser as string) || mailTo

  if (!host) {
    throw createError({
      statusCode: 503,
      message:
        'Отправка заявок по почте не настроена на сервере. Обратитесь к администратору сайта.'
    })
  }

  const port = Number(config.callbackSmtpPort || 465)
  const secure =
    String(config.callbackSmtpSecure).toLowerCase() !== 'false' && port === 465
  const user = config.callbackSmtpUser as string
  const pass = config.callbackSmtpPass as string

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined
  })

  const subject = `Заявка на звонок с сайта: ${name}`
  const text = `Новая заявка на обратный звонок\n\nИмя: ${name}\nТелефон: ${phonePretty}\n`
  const html = `
    <p><strong>Новая заявка на обратный звонок</strong></p>
    <p>Имя: ${escapeHtml(name)}</p>
    <p>Телефон: ${escapeHtml(phonePretty)}</p>
  `

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: mailFrom,
      subject,
      text,
      html
    })
  } catch (e) {
    console.error('[callback-request] SMTP error', e)
    throw createError({
      statusCode: 502,
      message: 'Не удалось отправить письмо. Попробуйте позже или позвоните нам.'
    })
  }

  return { ok: true }
})
