import { joinURL, withTrailingSlash } from 'ufo'

type NuxtWindow = Window & {
  __NUXT__?: {
    config?: {
      app?: {
        baseURL?: string
      }
    }
  }
}

/** Базовый путь приложения (/puc/). Vite в клиентском бандле подставляет BASE_URL как «./» — это ломает fetch. */
export function resolveAppBaseURL(explicit?: string): string {
  if (explicit && explicit !== './') return explicit

  const fromEnv = import.meta.env.BASE_URL
  if (fromEnv && fromEnv !== './') return fromEnv

  if (typeof window !== 'undefined') {
    const fromNuxt = (window as NuxtWindow).__NUXT__?.config?.app?.baseURL
    if (fromNuxt && fromNuxt !== './') return fromNuxt
  }

  return '/'
}

/**
 * Публичные пути (/diploms/…) без baseURL ломаются на GitHub Pages (app.baseURL = /puc/).
 * Импорты из assets/ Vite обычно уже с префиксом — их не трогаем.
 */
export function withAppBase(path: string, baseURL?: string): string {
  if (!path) return path
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  if (path.includes('/_nuxt/')) return path

  const base = resolveAppBaseURL(baseURL)
  const normalizedBase = withTrailingSlash(base)
  if (path.startsWith(normalizedBase) || path.startsWith(base)) return path

  return joinURL(normalizedBase, path.startsWith('/') ? path.slice(1) : path)
}
