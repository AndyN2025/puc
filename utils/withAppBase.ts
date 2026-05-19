/**
 * Публичные пути (/diploms/…) и ассеты без baseURL ломаются на GitHub Pages (app.baseURL = /puc/).
 * Импорты из assets/ Vite обычно уже с префиксом — их не трогаем.
 */
export function withAppBase(path: string): string {
  if (!path) return path
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith(base)) return path

  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  const subPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseWithSlash}${subPath}`
}
