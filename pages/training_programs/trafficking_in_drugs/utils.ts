import diplomaDoc13 from '@/assets/documents/diploms/Выдаваемый документ №13.jpg'
import requestDrugs17 from '@/assets/documents/requestStudy/17) Заявка Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров.doc'
import requestDrugs18 from '@/assets/documents/requestStudy/18) Заявка Государственное регулирование в сфере оборота наркотических средств, психотропных веществ и их прекурсоров при осуществлении медицинской и фармацевтической деятельности.doc'

/** Общие для всех программ раздела (прекурсоры / оборот). */
export const drugsListeners = [
  'Руководители и специалисты, ответственные за оборот наркотических средств, психотропных веществ и их прекурсоров на предприятии;',
  'Работники лабораторий, организаций фармацевтической промышленности;',
  'Фармацевты, провизоры;',
  'Медперсонал, участвующий в обороте наркотических средств, психотропных веществ и их прекурсоров.'
]

export const drugsRequirements = [
  'Лица, имеющие среднее профессиональное и (или) высшее образование.',
  'Лица, получающие среднее профессиональное и (или) высшее образование.'
]

export const drugsFormats = [
  'Дистанционная (онлайн в любое время и из любого региона).',
  'Очная с применением дистанционных образовательных технологий.'
]

/** Как у курсов охраны труда / пожарной безопасности — для единого шаблона [code].vue */
export interface DrugsTrainingProgram {
  /** Колонка «Код» в таблице; «-» или пусто — URL задаётся `code` (slug). */
  textCode?: string
  /** Slug URL: `/training_programs/trafficking_in_drugs/<code>` */
  code: string
  title: string
  hours: number
  mainDescription: string
  document: string | string[]
  img?: string | string[]
  users: string[]
  requiremets?: string[]
  format?: string
  period?: string
  programm?: string
  application?: string
}

const drugsFormatCombined = drugsFormats.join(' ')

const drugsDocumentDefault =
  'Удостоверение о повышении квалификации установленного образца с внесением в реестр ФИС ФРДО — уточняйте у менеджеров учебного центра.'

export const drugsPrograms: DrugsTrainingProgram[] = [
  {
    code: 'nar_01',
    textCode: '-',
    title:
      'Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров, культивирование наркосодержащих растений',
    hours: 48,
    mainDescription: '',
    users: drugsListeners,
    requiremets: drugsRequirements,
    format: drugsFormatCombined,
    document: drugsDocumentDefault,
    img: diplomaDoc13,
    application: requestDrugs17
  },
  {
    code: 'nar_02',
    textCode: '-',
    title:
      'Государственное регулирование в сфере оборота наркотических средств, психотропных веществ и их прекурсоров при осуществлении медицинской и фармацевтической деятельности',
    hours: 72,
    mainDescription: '',
    users: drugsListeners,
    requiremets: drugsRequirements,
    format: drugsFormatCombined,
    document: drugsDocumentDefault,
    img: diplomaDoc13,
    application: requestDrugs18
  }
]

export function findDrugsProgramByCode(codeParam: string): DrugsTrainingProgram | undefined {
  const decoded = decodeURIComponent(codeParam)
  return drugsPrograms.find((p) => p.code === decoded)
}
