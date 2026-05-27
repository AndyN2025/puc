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

const PROGRAM_FILE_UNAVAILABLE_MSG =
  'Файл программы недоступен на сайте (не найден на сервере). Обратитесь к менеджерам учебного центра.'

/**
 * Скачивает документ. Перед скачиванием проверяет, что файл отдаётся сервером (не 404).
 * Сообщение Chrome «файл недоступен на сайте» обычно значит 404 на GitHub Pages.
 */
export async function downloadSafeDocument(value: unknown, fileName: string) {
  const href = resolveDocumentHref(value)
  if (!href || typeof document === 'undefined') return false

  try {
    const res = await fetch(href, { method: 'HEAD' })
    if (!res.ok) {
      alert(PROGRAM_FILE_UNAVAILABLE_MSG)
      return false
    }
  } catch {
    // при сбое проверки всё равно пробуем открыть ссылку
  }

  const link = document.createElement('a')
  link.href = href
  link.download = sanitizeDownloadFileName(fileName)
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return true
}
