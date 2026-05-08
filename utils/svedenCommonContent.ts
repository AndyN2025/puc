/**
 * Тексты и обозначения для подраздела «Основные сведения» (/sveden/common/).
 * Микроразметка: методические рекомендации (табл. 3.2.1) — только атрибуты itemprop,
 * отдельного требования указывать schema.org itemtype в документе нет.
 */

/** Подписи полей блока основных сведений (видимые пользователю) */
export const SVEDEN_ORG_FIELD_LABELS = {
  fullName: 'Полное наименование образовательной организации',
  shortName: 'Сокращенное наименование образовательной организации',
  regDate: 'Дата создания образовательной организации',
  founder: 'Информация об учредителе',
  address: 'Адрес местонахождения образовательной организации',
  workTime: 'Режим, график работы',
  phones: 'Контактные телефоны',
  email: 'Адрес электронной почты'
} as const

/** Значения, общие для страницы сведений и при необходимости микроразметки */
export const SVEDEN_ORG_TEXT = {
  /** Сокращённое наименование как на сайте (itemprop shortName) */
  shortName: 'АНО ДПО «ПУЦ»',
  regDate: '05.05.2014 г.',
  /** п. 5.1 — наименование учредителя (внутри блока uchredLaw) */
  founderName: 'Смоловик Андрей Евгеньевич',
  workTime: `Понедельник - пятница с 08:00 по 17:00
Суббота, воскресенье - выходной`
} as const

/**
 * Дополнительные сведения об учредителе (п. 5.2–5.5 методички).
 * Если данных нет в открытом доступе, по методичке можно указывать «нет» / «отсутствует».
 */
export const SVEDEN_UCHRED_EXTRA = {
  addressUchred: 'нет',
  telUchred: 'нет',
  mailUchred: 'нет',
  websiteUchred: 'нет'
} as const

/** Заголовки документов в аккордеоне на /sveden/common/ (тексты отдельно от файлов) */
export const SVEDEN_COMMON_DOC_TITLES = {
  license: 'Лицензия на осуществление образовательной деятельности.',
  licenseExtract:
    'Выписка из реестра лицензий по состоянию на 01.08.2024г (изменение лицензии)',
  otRegistry:
    'Выписка из реестра организаций, оказывающих услуги в области охраны труда',
  accreditation: 'Уведомление об аккредитации'
} as const

/**
 * Атрибуты itemprop для документов блока «Документы» на /sveden/common/ (табл. 3.2.1, addRef).
 * — лицензия и выписка из реестра лицензий: licenseDocLink (п. 10);
 * — выписка по ОТ: не лицензия и не аккредитация — доп. материал addRef (общие правила про addRef в методичке);
 * — аккредитация: accreditationDocLink (п. 11).
 */
export const SVEDEN_COMMON_DOC_MICRO = {
  license: 'licenseDocLink',
  licenseExtract: 'licenseDocLink',
  otRegistry: 'addRef',
  accreditation: 'accreditationDocLink'
} as const

export const SVEDEN_COMMON_PAGE = {
  dotTitleSveden: 'Сведения об образовательной организации',
  dotTitleDocuments: 'Документы',
  breadcrumbOrg: 'Сведения об организации',
  /** Название текущей страницы в крошках и titleCommon */
  pageTitle: 'Основные сведения'
} as const
