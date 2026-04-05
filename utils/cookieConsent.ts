/** Ключ в localStorage */
export const COOKIE_CONSENT_STORAGE_KEY = 'puc_cookie_consent'

export const COOKIE_CONSENT_OPEN_EVENT = 'puc:cookie-consent-open'

/**
 * Сбрасывает сохранённый выбор и снова показывает плашку (слушает CookieConsent).
 */
export function openCookieConsentBanner(): void {
  if (!import.meta.client) return
  localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT))
}
