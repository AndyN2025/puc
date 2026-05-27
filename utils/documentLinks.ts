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

/** Публичный URL для скачивания (с префиксом /puc/ на GitHub Pages). */
export function resolveDocumentHref(value: unknown, baseURL?: string) {
  const href = getSafeDocumentHref(value)
  if (!href) return null
  return withAppBase(href, baseURL)
}
