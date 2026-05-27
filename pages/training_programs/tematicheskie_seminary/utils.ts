const requestOpo13 = '/request-study/req-13.doc'
import { getProgramDocByRelativePath } from '../../../utils/programDocs'

export const opoTrainingGoal =
  'Целью обучения рабочего персонала ОПО является совершенствование и (или) получение новых знаний и (или) повышение профессионального уровня, необходимых для профессиональной деятельности, в целях обеспечения безопасной эксплуатации оборудования, безопасных методов выполнения работ, к которым допускается работник.'

const opoFormat =
  'Очная:\n' +
  '— в технически оснащённых аудиториях учебного центра;\n' +
  '— с выездом преподавателя в вашу организацию.\n\n' +
  'Заочная:\n' +
  '— подключение к современной системе дистанционного обучения, в которой представлены необходимые учебные материалы курса.\n\n' +
  'Дистанционная:\n' +
  '— обучение в режиме online из любого региона.'

const opoDocument =
  'Результаты обучения и прохождения проверки знаний обслуживающего персонала (рабочих) оформляются протоколом с отметкой в удостоверении о допуске к самостоятельной работе.'

const opoPeriod = 'Не реже 1 раза в год.'

const opoProgramByCode: Record<string, string | undefined> = {
  opo_01: getProgramDocByRelativePath('opo/opo_01.doc'),
  opo_02: getProgramDocByRelativePath('opo/opo_02.doc'),
  opo_05: getProgramDocByRelativePath('opo/opo_05.doc'),
  opo_06: getProgramDocByRelativePath('opo/opo_06.doc'),
  opo_07: getProgramDocByRelativePath('opo/opo_07.doc'),
  opo_08: getProgramDocByRelativePath('opo/opo_08.doc'),
  opo_09: getProgramDocByRelativePath('opo/opo_09.doc'),
  opo_10: getProgramDocByRelativePath('opo/opo_10.doc'),
  opo_11: getProgramDocByRelativePath('opo/opo_11.doc'),
  opo_12: getProgramDocByRelativePath('opo/opo_12.doc'),
  opo_13: getProgramDocByRelativePath('opo/opo_13.doc'),
  opo_14: getProgramDocByRelativePath('opo/opo_14.doc'),
  opo_15: getProgramDocByRelativePath('opo/opo_15.doc'),
  opo_16: getProgramDocByRelativePath('opo/opo_16.doc'),
  opo_17: getProgramDocByRelativePath('opo/opo_17.doc'),
  opo_19: getProgramDocByRelativePath('opo/opo_19.doc'),
  opo_20: getProgramDocByRelativePath('opo/opo_20.doc'),
  opo_21: getProgramDocByRelativePath('opo/opo_21.doc'),
  opo_22: getProgramDocByRelativePath('opo/opo_22.doc')
}

export interface OpoTrainingProgram {
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

const opoRows: { title: string; hours: number | string }[] = [
  { title: 'Рабочий люльки, находящийся на подъемнике (вышке)', hours: 16 },
  { title: 'Подготовка персонала, имеющего профессию «Стропальщик»', hours: 14 },
  {
    title: 'Подготовка персонала, имеющего профессию «Машинист подъемника строительного»',
    hours: 20
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Наладчик строительных машин»',
    hours: 20
  },
  {
    title: 'Управление подъемными сооружениями с пола или со стационарного пульта',
    hours: '24ч./16ч.'
  },
  {
    title:
      'Управление подъемными сооружениями с использованием системы дистанционного управления (по радиоканалу или иной линии связи)',
    hours: '24ч./16ч.'
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Машинист крана автомобильного»',
    hours: 24
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Машинист крана (крановщик)»',
    hours: 24
  },
  {
    title: 'Персонал взрывопожароопасных химических, нефтехимических производств',
    hours: '24ч./16ч.'
  },
  {
    title:
      'Персонал химически опасных производственных объектов, на которых хранятся и используются неорганические жидкие кислоты и щелочи',
    hours: '24ч./16ч.'
  },
  {
    title:
      'Персонал химически опасных производственных объектов, на которых используются и хранятся токсичные и высокотоксичные вещества',
    hours: '24ч./16ч.'
  },
  {
    title:
      'Персонал химически опасных производственных объектов, на которых получаются, используются и хранятся окисляющие вещества (кислород, озон)',
    hours: '18ч./12ч.'
  },
  {
    title:
      'Персонал, эксплуатирующий взрывопожароопасные производственные объекты хранения и переработки растительного сырья',
    hours: '24ч./18ч.'
  },
  {
    title:
      'Персонал, эксплуатирующий баллоны со сжатыми, сжиженными и растворенными под давлением газами',
    hours: '24ч./16ч.'
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Сливщик-разливщик 2 разряда»',
    hours: 20
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Сливщик-разливщик 3 разряда»',
    hours: 20
  },
  {
    title: 'Персонал, обслуживающий трубопроводы пара и горячей воды',
    hours: '20ч./16ч.'
  },
  {
    title: 'Персонал, обслуживающий тепловые энергоустановки',
    hours: '20ч./16ч.'
  },
  {
    title:
      'Персонал, обслуживающий сосуды, работающие под избыточным давлением пара, газов, жидкостей',
    hours: '20ч./16ч.'
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Оператор котельной»',
    hours: 24
  },
  {
    title:
      'Персонал, обслуживающий сосуды (газификаторы, баллоны), работающие под избыточным давлением, для хранения медицинского кислорода',
    hours: '20ч./16ч.'
  },
  {
    title:
      'Персонал, обслуживающий газовое оборудование промышленных печей, сушильных установок и дымоотводящих устройств',
    hours: '24ч./16ч.'
  },
  {
    title: 'Подготовка персонала, имеющего профессию «Аппаратчик ХВО»',
    hours: 16
  }
]

function buildOpoProgram(index: number, row: { title: string; hours: number | string }): OpoTrainingProgram {
  const n = String(index).padStart(2, '0')
  return {
    code: `opo_${n}`,
    textCode: `ОПО-${n}`,
    title: row.title,
    hours: row.hours,
    mainDescription: `${opoTrainingGoal}\n\nПрограмма подготовки рабочего персонала ОПО: «${row.title}».`,
    users: [
      `Рабочий персонал опасных производственных объектов, выполняющий работы, связанные с темой программы: «${row.title}».`
    ],
    format: opoFormat,
    period: opoPeriod,
    document: opoDocument,
    img: '/diploms/doc-14.bmp',
    programm: opoProgramByCode[`opo_${n}`],
    application: requestOpo13
  }
}

export const opoWorkerPrograms: OpoTrainingProgram[] = opoRows.map((row, i) =>
  buildOpoProgram(i + 1, row)
)

export function findOpoProgramByCode(codeParam: string): OpoTrainingProgram | undefined {
  const decoded = decodeURIComponent(codeParam)
  return opoWorkerPrograms.find((p) => p.code === decoded)
}
