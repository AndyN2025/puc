const requestEco11 = '/request-study/req-11.doc'
const requestEco16 = '/request-study/req-16.doc'
import { getProgramDocByRelativePath } from '../../../utils/programDocs'

const ecoFormat =
  'Заочная с применением дистанционных образовательных технологий, без отрыва от работы (онлайн в любое время и из любого региона).'

const ecoRequirements = [
  'Лица, имеющие среднее профессиональное и (или) высшее образование.',
  'Лица, получающие среднее профессиональное и (или) высшее образование.'
]

const docPq =
  'Удостоверение о повышении квалификации с внесением в реестр ФИС ФРДО.'

const docPpo =
  'Диплом о профессиональной переподготовке с внесением в реестр ФИС ФРДО.'

const mainFz7Art73 =
  'На основании ФЗ № 7 «Об охране окружающей среды» от 10.01.2002, статья 73. Руководители организаций и специалисты, ответственные за принятие решений при осуществлении хозяйственной и иной деятельности, которая оказывает или может оказать негативное воздействие на окружающую среду, должны иметь подготовку в области охраны окружающей среды и экологической безопасности.'

export interface EnvironmentalTrainingProgram {
  textCode?: string
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

/** Повышение квалификации */
export const environmentalProgramsPq: EnvironmentalTrainingProgram[] = [
  {
    code: 'eco_01',
    textCode: '-',
    title:
      'Дополнительная профессиональная программа повышения квалификации. Обеспечение экологической безопасности в области сбора, транспортирования, обработки, утилизации, обезвреживания, размещения отходов I–IV классов опасности',
    hours: 38,
    mainDescription:
      'На основании 89-ФЗ от 24.06.1998 «Об отходах производства и потребления», статья 15. Лица, которые допущены к сбору, транспортированию, обработке, утилизации, обезвреживанию, размещению отходов I–IV классов опасности, обязаны иметь документы о квалификации, выданные по результатам прохождения профессионального обучения или получения дополнительного профессионального образования, необходимых для работы с отходами I–IV классов опасности.',
    users: [
      'Лица, допущенные к сбору, транспортированию, обработке, утилизации, обезвреживанию, накоплению, размещению отходов I–IV классов опасности.'
    ],
    requiremets: ecoRequirements,
    format: ecoFormat,
    period: 'Не реже одного раза в 3 года.',
    document: docPq,
    img: '/diploms/doc-09.jpg',
    programm: getProgramDocByRelativePath(
      'Экология/«Обеспечение экологической безопасности при работах в области обращения с отходами I-IV классов опасности».docx'
    ),
    application: requestEco11
  },
  {
    code: 'eco_02',
    textCode: '-',
    title:
      'Дополнительная профессиональная программа повышения квалификации. Обеспечение экологической безопасности руководителями и специалистами общехозяйственных систем управления',
    hours: 72,
    mainDescription: mainFz7Art73,
    users: [
      'Руководители и специалисты организаций, в должностные обязанности которых входят вопросы обеспечения экологической безопасности общехозяйственных систем управления.'
    ],
    requiremets: ecoRequirements,
    format: ecoFormat,
    period: 'Не реже одного раза в 5 лет.',
    document: docPq,
    img: '/diploms/doc-10.jpg',
    programm: getProgramDocByRelativePath(
      'Экология/«Обеспечение экологической безопасности руководителями и специалистами».docx'
    ),
    application: requestEco11
  },
  {
    code: 'eco_03',
    textCode: '-',
    title:
      'Дополнительная профессиональная программа повышения квалификации. Системы управления обеспечением экологической безопасности',
    hours: 200,
    mainDescription: mainFz7Art73,
    users: [
      'Руководители и специалисты субъектов хозяйственной или иной деятельности, которая может оказать негативное воздействие на окружающую среду.'
    ],
    requiremets: ecoRequirements,
    format: ecoFormat,
    period: 'Не реже одного раза в 5 лет.',
    document: docPq,
    img: '/diploms/doc-11.jpg'
  }
]

/** Профессиональная переподготовка */
export const environmentalProgramsPpo: EnvironmentalTrainingProgram[] = [
  {
    code: 'eco_04',
    textCode: '-',
    title:
      'Дополнительная профессиональная программа профессиональной переподготовки для получения квалификации. Специалист по экологической безопасности',
    hours: 256,
    mainDescription:
      'Целью обучения является формирование у слушателей профессиональных компетенций, необходимых для профессиональной деятельности в области экологической безопасности, направленных на предотвращение (минимизацию) негативного воздействия производственной деятельности промышленной организации на окружающую среду.',
    users: [
      'Руководители организаций и специалисты, ответственные за принятие решений при осуществлении хозяйственной и иной деятельности, которая оказывает или может оказать негативное воздействие на окружающую среду.'
    ],
    requiremets: ecoRequirements,
    format: ecoFormat,
    document: docPpo,
    img: '/diploms/doc-12.jpg',
    programm: getProgramDocByRelativePath(
      'Экология/Переподготовка  «Специалист по экологической безопасности»  .docx'
    ),
    application: requestEco16
  }
]

function allEnvironmentalProgramsFlat(): EnvironmentalTrainingProgram[] {
  return [...environmentalProgramsPq, ...environmentalProgramsPpo]
}

export function findEnvironmentalProgramByCode(
  codeParam: string
): EnvironmentalTrainingProgram | undefined {
  const decoded = decodeURIComponent(codeParam)
  return allEnvironmentalProgramsFlat().find((p) => p.code === decoded)
}
