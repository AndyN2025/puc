import { joinURL, withTrailingSlash } from 'ufo'
import { APP_BASE_URL } from './appBase'

type NuxtWindow = Window & {
  __NUXT__?: {
    config?: {
      app?: {
        baseURL?: string
      }
    }
  }
}

function detectBaseFromPathname(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const { pathname } = window.location
  if (pathname === APP_BASE_URL.slice(0, -1) || pathname.startsWith(APP_BASE_URL)) {
    return APP_BASE_URL
  }
  return undefined
}

/** Базовый путь приложения (/puc/). */
export function resolveAppBaseURL(explicit?: string): string {
  if (explicit && explicit !== './') return explicit

  const fromEnv = import.meta.env.BASE_URL
  // При prerender Vite часто подставляет «/» или «./» вместо «/puc/»
  if (fromEnv && fromEnv !== './' && fromEnv !== '/') return fromEnv

  if (typeof window !== 'undefined') {
    const fromNuxt = (window as NuxtWindow).__NUXT__?.config?.app?.baseURL
    if (fromNuxt && fromNuxt !== './') return fromNuxt

    const fromPath = detectBaseFromPathname()
    if (fromPath) return fromPath
  }

  return APP_BASE_URL
}

/**
 * Публичные пути (/diploms/…, /documents/…) с учётом baseURL на GitHub Pages.
 * Импорты из assets через Vite (/_nuxt/…) не трогаем.
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
