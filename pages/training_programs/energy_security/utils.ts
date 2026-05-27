const requestEnergy = '/request-study/req-03.doc'
import { getProgramDocByRelativePath } from '../../../utils/programDocs'

/**
 * Кто должен проходить проверку знаний — каждый элемент = категория + периодичность в одном пункте
 * (в шаблоне курса выводится как список с тем же смыслом, что «категории слушателей»).
 */
export const energyKnowledgeCheckAudience = [
  'Оперативные руководители, оперативный, диспетчерский, оперативно-ремонтный и ремонтный персонал, принимающий непосредственное участие в эксплуатации технологического оборудования объектов теплоснабжения и (или) теплопотребляющих установок, их ремонте, наладке, регулировании, испытаниях, а также ответственные лица за исправное состояние и безопасную эксплуатацию и лица их замещающие. Периодичность: не реже 1 раза в год.',
  'Руководящие работники эксплуатирующей организации, руководители структурных подразделений, управленческий персонал и специалисты. Периодичность: не реже 1 раза в 5 лет.'
]

/** Формы обучения (в карточке курса — одно поле «Форма обучения», строка из вариантов). */
export const energyTrainingFormatsLine =
  'Дистанционно (онлайн), очно, заочно.'

export const energyRequirements = [
  'Подготовка и подтверждение готовности обязательны для работников, выполняющих трудовые функции по эксплуатации тепловых энергоустановок (ТЭУ): дежурного, оперативного, оперативно-ремонтного персонала, ответственных лиц и специалистов, назначенных за безопасную эксплуатацию объектов теплоснабжения и теплопотребляющих установок.',
  'Работники муниципальных и коммерческих теплоснабжающих организаций, теплосетевых организаций и организаций-потребителей тепловой энергии подпадают под эти требования.'
]

const energyDocumentDefault =
  'По итогам обучения слушателю выдаётся удостоверение установленного образца, подтверждающее его допуск к работам на тепловых энергоустановках в качестве лица, ответственного за организацию и безопасную эксплуатацию тепловых энергоустановок.'

const energyMainIntro =
  'Ниже перечислены категории работников, для которых предусмотрена проверка знаний в области энергетической (тепловой) безопасности, и периодичность проверки.'

/** Как у курсов охраны труда — для шаблона [code].vue */
export interface EnergyTrainingProgram {
  /** В колонке «Код» таблицы; «-» или пустая строка — роут задаётся полем `code` (slug). */
  textCode?: string
  /** Slug URL: `/training_programs/energy_security/<code>` */
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

/**
 * Две строки таблицы = два типа программ из вашего списка.
 * Часы для ООП задайте фактические при появлении данных.
 */
export const energyPrograms: EnergyTrainingProgram[] = [
  {
    code: 'en_01',
    textCode: '-',
    title:
      'Дополнительная общеобразовательная общеразвивающая программа в области энергетической безопасности',
    hours: 36,
    mainDescription: energyMainIntro,
    users: energyKnowledgeCheckAudience,
    requiremets: energyRequirements,
    format: energyTrainingFormatsLine,
    document: energyDocumentDefault,
    programm: getProgramDocByRelativePath('teu/teu_01.doc')
  },
  {
    code: 'en_02',
    textCode: '-',
    title:
      '«Энергетическая безопасность» — предэкзаменационная подготовка работников организаций, осуществляющих эксплуатацию тепловых энергоустановок',
    hours: 18,
    mainDescription: energyMainIntro,
    users: energyKnowledgeCheckAudience,
    requiremets: energyRequirements,
    format: energyTrainingFormatsLine,
    document: energyDocumentDefault,
    img: ['/diploms/doc-03.jpg', '/diploms/doc-04.jpg'],
    programm: getProgramDocByRelativePath('teu/teu_02.doc'),
    application: requestEnergy
  }
]

export function findEnergyProgramByCode(codeParam: string): EnergyTrainingProgram | undefined {
  const decoded = decodeURIComponent(codeParam)
  return energyPrograms.find((p) => p.code === decoded)
}
