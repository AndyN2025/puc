import { withAppBase } from './withAppBase'

const ALLOWED_DOCUMENT_EXTENSIONS = new Set(['pdf', 'doc', 'docx'])

function stripQueryAndHash(url: string) {
  return url.split(/[?#]/, 1)[0]
}

function getDocumentExtension(url: string) {
  const pathname = stripQueryAndHash(url).toLowerCase()
  const match = pathname.match(/\.([a-z0-9]+)$/)
  return match?.[1] || ''
}

function hasUnsafeProtocol(url: string) {
  if (url.startsWith('//')) return true
  return /^(?:javascript|data|vbscript|file|blob):/i.test(url)
}

export function getSafeDocumentHref(value: unknown) {
  if (typeof value !== 'string') return null

  const href = value.trim()
  if (!href || href === '#' || hasUnsafeProtocol(href)) return null

  const extension = getDocumentExtension(href)
  if (!ALLOWED_DOCUMENT_EXTENSIONS.has(extension)) return null

  return href
}

export function getSafePdfEmbedSrc(value: unknown) {
  const href = getSafeDocumentHref(value)
  if (!href || getDocumentExtension(href) !== 'pdf') return null

  return `${stripQueryAndHash(href)}#page=1`
}

export function sanitizeDownloadFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]+/g, '_').trim() || 'document'
}

/** Публичный URL документа с учётом app.baseURL (GitHub Pages /puc/). */
export function resolveDocumentHref(value: unknown) {
  const href = getSafeDocumentHref(value)
  if (!href) return null
  return withAppBase(href)
}

function toAbsoluteUrl(href: string): string {
  if (/^https?:/i.test(href)) return href
  if (typeof window === 'undefined') return href
  return new URL(href, window.location.origin).href
}

async function isDocumentReachable(url: string): Promise<boolean> {
  try {
    let res = await fetch(url, { method: 'HEAD' })
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-0' } })
    }
    return res.ok
  } catch {
    return false
  }
}

const PROGRAM_FILE_UNAVAILABLE_MSG =
  'Файл программы недоступен на сайте (не найден на сервере). Обратитесь к менеджерам учебного центра.'

/**
 * Скачивает документ. Перед скачиванием проверяет, что файл отдаётся сервером (не 404).
 */
export async function downloadSafeDocument(value: unknown, fileName: string) {
  const href = resolveDocumentHref(value)
  if (!href || typeof document === 'undefined') return false

  const absoluteHref = toAbsoluteUrl(href)

  const reachable = await isDocumentReachable(absoluteHref)
  if (!reachable) {
    alert(PROGRAM_FILE_UNAVAILABLE_MSG)
    return false
  }

  const link = document.createElement('a')
  link.href = absoluteHref
  link.download = sanitizeDownloadFileName(fileName)
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return true
}
