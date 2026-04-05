import nodemailer from 'nodemailer'
import { SITE_EMAIL } from '~/utils/site'

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

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    phone?: string
    phoneDigits?: string
    website?: string
  }>(event)

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
