import { joinURL, withTrailingSlash } from 'ufo'

/**
 * Публичные пути (/diploms/…) без baseURL ломаются на GitHub Pages (app.baseURL = /puc/).
 * Импорты из assets/ Vite обычно уже с префиксом — их не трогаем.
 */
export function withAppBase(path: string, baseURL?: string): string {
  if (!path) return path
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  if (path.includes('/_nuxt/')) return path

  const base = baseURL ?? import.meta.env.BASE_URL ?? '/'
  const normalizedBase = withTrailingSlash(base)
  if (path.startsWith(normalizedBase) || path.startsWith(base)) return path

  return joinURL(normalizedBase, path.startsWith('/') ? path.slice(1) : path)
}
