/**
 * Единые публичные контакты и короткие тексты сайта.
 * Списки программ/курсов остаются в своих utils — сюда не выносим.
 */

export const SITE_EMAIL = 'ekc_06@mail.ru'

/** Отображение в шапке (как у заказчика) */
export const SITE_EMAIL_HEADER_DISPLAY = 'EKC_06@MAIL.RU'

/** Ссылка для страницы контактов / футера (можно и нижний регистр) */
export const SITE_EMAIL_CONTACTS_DISPLAY = 'EKC_06@mail.ru'

export function siteMailto(): string {
  return `mailto:${SITE_EMAIL}`
}

export interface SitePhone {
  /** URI для href, напр. +74842562183 */
  tel: string
  /** Вид «8 (…) …» */
  display8: string
  /** Вид «+7 (…) …» */
  displayPlus7: string
}

export const SITE_PHONES: readonly SitePhone[] = [
  {
    tel: '+74842562183',
    display8: '8 (4842) 56-21-83',
    displayPlus7: '+7 (4842) 56-21-83'
  },
  {
    tel: '+74842597583',
    display8: '8 (4842) 59-75-83',
    displayPlus7: '+7 (4842) 59-75-83'
  },
  {
    tel: '+79105201564',
    display8: '8 (910) 520-15-64',
    displayPlus7: '+7 (910) 520-15-64'
  }
] as const

/** Для виджета консультации (формат пропа phones) */
export function sitePhonesForConsultantWidget() {
  return SITE_PHONES.map((p) => ({
    number: p.tel,
    formatted: p.displayPlus7
  }))
}

export const SITE_ADDRESS = {
  /** Футер */
  footer: 'г. Калуга, ул. Никитина, д. 41, четвертый этаж, офис 401',
  /** Карточки, коротко */
  short: 'г.Калуга, ул. Никитина, д. 41',
  /** Юридический адрес (сведения) */
  legal: '248002, Калужская область, г. Калуга, ул. Никитина, д. 41 помещ. 6',
  /** Страница контактов — две строки */
  contactsLine1: 'г. Калуга, ул. Никитина, д. 41',
  contactsLine2: '4 этаж, офис 401'
} as const

export const SITE_ORG = {
  shortName: 'Приокский учебный центр',
  /** Полное наименование (сведения) */
  nameFull:
    'Автономная некоммерческая организация дополнительного профессионального образования «Приокский учебный центр»'
} as const

/** Тексты, которые повторяются на разных страницах */
export const SITE_COPY = {
  contactsLead:
    'АНО ДПО «Приокский учебный центр» — дополнительное профессиональное образование и аттестация в Калуге. Звоните, пишите на почту или приезжайте в офис — подскажем по программам и срокам.'
} as const
