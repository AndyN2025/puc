const requestProfessional12 = '/request-study/req-12.doc'
import { getProgramDocByRelativePath } from '../../../utils/programDocs'

export const professionalTrainingIntro =
  'Профессиональное обучение направлено на приобретение лицами различного возраста профессиональной компетенции, в том числе для работы с конкретным оборудованием, технологиями, аппаратно-программными и иными профессиональными средствами, получение указанными лицами квалификации по профессии рабочего.'

const profFormat =
  'Очная с применением дистанционных образовательных технологий:\n' +
  '— в технически оснащённых аудиториях учебного центра;\n' +
  '— с выездом преподавателя в вашу организацию.'

const profDocument =
  'Свидетельство о профессии рабочего (установленного образца) с внесением в реестр ФИС ФРДО.'

const profRequirements = [
  'К освоению программ профессионального обучения допускаются лица не младше восемнадцати лет.',
  'В том числе ранее не имевшие профессии рабочего или должности служащего.',
  'Не имеющие медицинских противопоказаний к данной профессии.'
]

export interface ProfessionalTrainingProgram {
  textCode?: string
  code: string
  title: string
  hours: number | string
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

const profRows: {
  professionCode: string
  title: string
  hours: number
  /** Файл в assets/documents/programs/profPodgotovka/ */
  programm?: string
}[] = [
  { professionCode: '18897', title: 'Стропальщик', hours: 152, programm: 'Стропальщик.pdf' },
  {
    professionCode: '11463',
    title: 'Водитель электро- и автотележки 3 разряда',
    hours: 146,
    programm: 'Водитель электро и автотележки 3 разряда.pdf'
  },
  {
    professionCode: '11453',
    title: 'Водитель погрузчика 3 разряда',
    hours: 194,
    programm: 'Водитель погрузчика 3 разряда.pdf'
  },
  // Скрыто: нет программы обучения
  // { professionCode: '11364', title: 'Варщик', hours: 210 },
  // {
  //   professionCode: '10314',
  //   title: 'Аппаратчик комбикормового производства',
  //   hours: 140
  // },
  // {
  //   professionCode: '10360',
  //   title: 'Аппаратчик мукомольного производства',
  //   hours: 272
  // },
  // {
  //   professionCode: '18598',
  //   title: 'Сливщик-разливщик 2 разряда',
  //   hours: 116
  // },
  {
    professionCode: '18598',
    title: 'Сливщик-разливщик 3 разряда',
    hours: 132,
    programm: 'Сливщик-разливщик (3-й разряд).pdf'
  },
  {
    professionCode: '15643',
    title: 'Оператор котельной',
    hours: 306,
    programm: 'Оператор котельной.pdf'
  },
  {
    professionCode: '11078',
    title: 'Аппаратчик ХВО',
    hours: 132,
    programm: 'Аппаратчик ХВО.pdf'
  },
  // { professionCode: '10949', title: 'Аппаратчик синтеза', hours: 218 },
  {
    professionCode: '11108',
    title: 'Аппаратчик электролиза',
    hours: 232,
    programm: 'Аппаратчик электролиза.pdf'
  },
  {
    professionCode: '13321',
    title: 'Лаборант химического анализа',
    hours: 40,
    programm: 'Лаборант химического анализа.pdf'
  },
  // { professionCode: '16085', title: 'Оператор товарный', hours: 110 },
  {
    professionCode: '13585',
    title:
      'Машинист бумагоделательной (картоноделательной) машины (сеточник) 5 разряда',
    hours: 162,
    programm:
      'Машинист бумагоделательной (картоноделательной) машины (сеточник) 5 разряда.pdf'
  },
  {
    professionCode: '14868',
    title:
      'Накатчик бумагоделательной (картоноделательной) машины 3 разряда',
    hours: 82,
    programm:
      'Накатчик бумагоделательной (картоноделательной) машины 3 разряда.pdf'
  },
  {
    professionCode: '16979',
    title:
      'Прессовщик бумагоделательной (картоноделательной) машины 3 разряда',
    hours: 82,
    programm:
      'Прессовщик бумагоделательной (картоноделательной) машины 3 разряда.pdf'
  },
  {
    professionCode: '17656',
    title: 'Размольщик 2 разряда',
    hours: 82,
    programm: 'Размольщик 2 разряда.pdf'
  },
  {
    professionCode: '17656',
    title: 'Размольщик 4 разряда',
    hours: 122,
    programm: 'Размольщик 4 разряда.pdf'
  },
  {
    professionCode: '17883',
    title: 'Резчик бумаги, картона и целлюлозы 2 разряда',
    hours: 82,
    programm: 'Резчик бумаги, картона и целлюлозы 2 разряда.pdf'
  },
  {
    professionCode: '17883',
    title: 'Резчик бумаги, картона и целлюлозы 4 разряда',
    hours: 158,
    programm: 'Резчик бумаги, картона и целлюлозы 4 разряда.pdf'
  },
  {
    professionCode: '18924',
    title:
      'Сушильщик бумагоделательной (картоноделательной) машины 3 разряда',
    hours: 165,
    programm:
      'Сушильщик бумагоделательной (картоноделательной) машины 3 разряда.pdf'
  },
  {
    professionCode: '18924',
    title:
      'Сушильщик бумагоделательной (картоноделательной) машины 4 разряда',
    hours: 162,
    programm:
      'Сушильщик бумагоделательной (картоноделательной) машины 4 разряда.pdf'
  },
  {
    professionCode: '13525',
    title:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 3 разряда',
    hours: 126,
    programm:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 3 разряда.pdf'
  },
  {
    professionCode: '13525',
    title:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 4 разряда',
    hours: 160,
    programm:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 4 разряда.pdf'
  },
  {
    professionCode: '13525',
    title:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 5 разряда',
    hours: 198,
    programm:
      'Машинист автоматической линии по изготовлению тетрадей для нот и альбомов для рисования 5 разряда.pdf'
  },
  {
    professionCode: '14290',
    title: 'Машинист упаковочной машины 3 разряда',
    hours: 160,
    programm: 'Машинист упаковочной машины 3 разряда.pdf'
  },
  {
    professionCode: '14133',
    title: 'Машинист резальных машин 4 разряда',
    hours: 160,
    programm: 'Машинист резальных машин 4 разряда.pdf'
  },
  {
    professionCode: '14012',
    title: 'Машинист подъемника с рабочей платформой',
    hours: 254,
    programm: 'Машинист подъемника с рабочей платформой.pdf'
  }
]

function buildProfProgram(
  index: number,
  row: { professionCode: string; title: string; hours: number; programm?: string }
): ProfessionalTrainingProgram {
  const n = String(index).padStart(2, '0')
  const codeLabel = row.professionCode === '-' ? '—' : row.professionCode
  const codePart =
    row.professionCode === '-'
      ? ''
      : ` Код профессии по справочнику: ${row.professionCode}.`
  const programm = row.programm
    ? getProgramDocByRelativePath(`profPodgotovka/${row.programm}`)
    : undefined
  return {
    code: `prof_${n}`,
    textCode: codeLabel,
    title: row.title,
    hours: row.hours,
    mainDescription: `${professionalTrainingIntro}\n\nПрограмма профессионального обучения по профессии «${row.title}».${codePart}`,
    users: [
      `Лица, осваивающие программу профессионального обучения по профессии «${row.title}»${row.professionCode === '-' ? '' : ` (код ${row.professionCode})`}.`
    ],
    requiremets: profRequirements,
    format: profFormat,
    document: profDocument,
    img: '/diploms/doc-15.jpg',
    programm,
    application: requestProfessional12
  }
}

export const professionalPrograms: ProfessionalTrainingProgram[] = profRows.map((row, i) =>
  buildProfProgram(i + 1, row)
)

export function findProfessionalProgramByCode(
  codeParam: string
): ProfessionalTrainingProgram | undefined {
  const decoded = decodeURIComponent(codeParam)
  return professionalPrograms.find((p) => p.code === decoded)
}
