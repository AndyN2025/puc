import { PrismaClient } from '@prisma/client'
import { SITE_PHONES, SITE_ORG, SITE_COPY } from '../utils/site'
import { newsArticles } from '../data/news'
import { firePrograms } from '../pages/training_programs/fire_safety/utils'
import { energyPrograms } from '../pages/training_programs/energy_security/utils'
import { environmentalProgramsPq, environmentalProgramsPpo } from '../pages/training_programs/environmental_security/utils'
import { industrialTrainingPrograms } from '../pages/training_programs/industrial_safety/utils'
import { professionalPrograms } from '../pages/training_programs/professional_education/utils'
import { opoWorkerPrograms } from '../pages/training_programs/tematicheskie_seminary/utils'
import { drugsPrograms } from '../pages/training_programs/trafficking_in_drugs/utils'

// security_work/utils.ts imports images via @/assets which won't resolve
// in plain tsx. We seed it inline from the raw data instead.
const securityWorkCourses: Array<{
  code: string; textCode: string; title: string; hours: number;
  mainDescription: string; document: string | string[];
  users: string[]; period?: string; requiremets?: string[];
  format?: string; programm?: string; application?: string;
}> = [
  { textCode:'04-15/1ОТ', code:'04-15_1-OT', title:'Общие вопросы охраны труда и функционирование системы управления охраной труда.', hours:24, mainDescription:'Программа обучения по общим вопросам охраны труда.', document:'Протокол проверки знания установленного образца', users:['Руководители организации','Специалисты по охране труда'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/2ОТ', code:'04-15_2-OT', title:'Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов.', hours:18, mainDescription:'Программа обучения безопасным методам.', document:'Протокол проверки знания установленного образца', users:['Руководители структурных подразделений','Работники рабочих профессий','Специалисты по охране труда'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/3ОТ', code:'04-15_3-OT', title:'Обучение по использованию (применению) средств индивидуальной защиты.', hours:16, mainDescription:'Программа обучения по использованию СИЗ.', document:'Протокол проверки знания установленного образца', users:['Работники, применяющие СИЗ','Специалисты по охране труда'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/4ОТ', code:'04-15_4-OT', title:'Оказание первой помощи пострадавшим.', hours:16, mainDescription:'Обучение по оказанию первой помощи.', document:'Протокол проверки знания установленного образца', users:['Работники рабочих профессий','Лица, обязанные оказывать первую помощь'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/5ОТ', code:'04-15_5-OT', title:'Обучение работников, выполняющих работы на высоте с применением средств подмащивания.', hours:24, mainDescription:'Безопасное проведение работ на высоте с применением средств подмащивания.', document:'Протокол и удостоверение установленного образца', users:['Работники, допускаемые к работам на высоте'], period:'не реже 1 раза в год' },
  { textCode:'04-15/6ОТ', code:'04-15_6-OT', title:'Обучение работников 1 группы по безопасности работ на высоте.', hours:28, mainDescription:'Программа для работников 1 группы по безопасности работ на высоте.', document:'Протокол и удостоверение установленного образца', users:['Работники, допускаемые к непосредственному выполнению работ на высоте'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/7ОТ', code:'04-15_7-OT', title:'Обучение работников 2 группы по безопасности работ на высоте.', hours:30, mainDescription:'Программа для работников 2 группы по безопасности работ на высоте.', document:'Протокол и удостоверение установленного образца', users:['Бригадиры, мастера, руководители стажировки'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-03/1ОТ', code:'04-03_1-OT', title:'Обучение работников 3 группы по безопасности работ на высоте.', hours:32, mainDescription:'Программа для работников 3 группы по безопасности работ на высоте.', document:'Удостоверение о повышении квалификации / Удостоверение установленного образца', users:['Работники, ответственные за организацию и безопасное проведение работ на высоте'], period:'не реже 1 раза в 5 лет' },
  { textCode:'04-15/8ОТ', code:'04-15_8-OT', title:'Безопасные методы и приемы выполнения работ в ОЗП работников 1 группы.', hours:24, mainDescription:'Безопасное проведение работ в ограниченных и замкнутых пространствах.', document:'Протокол и удостоверение установленного образца', users:['Работники, допускаемые к работам в ОЗП'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/9ОТ', code:'04-15_9-OT', title:'Безопасные методы и приемы выполнения работ в ОЗП работников 2 группы.', hours:26, mainDescription:'Безопасное проведение работ в ОЗП (2 группа).', document:'Протокол и удостоверение установленного образца', users:['Ответственные исполнители работ ОЗП','Наблюдающие'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-15/10ОТ', code:'04-15_10-OT', title:'Безопасные методы и приемы выполнения работ в ОЗП работников 3 группы.', hours:32, mainDescription:'Безопасное проведение работ в ОЗП (3 группа).', document:'Протокол и удостоверение установленного образца', users:['Работники, ответственные за организацию работ в ОЗП'], period:'не реже 1 раза в 5 лет' },
  { textCode:'04-15/11ОТ', code:'04-15_11-OT', title:'Охрана труда при выполнении погрузочно-разгрузочных работ.', hours:24, mainDescription:'Безопасное выполнение погрузочно-разгрузочных работ.', document:'Протокол проверки знания установленного образца', users:['Работники, выполняющие погрузочно-разгрузочные работы'], period:'не реже 1 раза в год' },
  { textCode:'04-15/1ОТ', code:'04-15_1-OT_dist', title:'Общие вопросы охраны труда (дистанционно).', hours:24, mainDescription:'Дистанционная программа обучения по охране труда.', format:'Дистанционное (онлайн)', document:'Протокол проверки знания установленного образца', users:['Руководители организации','Специалисты по охране труда'], period:'не реже 1 раза в 3 года' },
  { textCode:'04-17/1ОТ', code:'04-17_1-OT_dist', title:'Профессиональная переподготовка «Специалист по охране труда» (дистанционно).', hours:256, mainDescription:'Программа профессиональной переподготовки.', format:'Дистанционное (онлайн)', document:'Диплом о профессиональной переподготовке установленного образца', users:['Лица, имеющие среднее профессиональное и (или) высшее образование'] },
]

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding settings...')
  await prisma.settings.create({
    data: {
      mainTitle: SITE_ORG.shortName + ' — ДПО и обучение в Калуге',
      mainDescription: SITE_COPY.contactsLead,
      email: 'ekc_06@mail.ru',
      phones: {
        create: SITE_PHONES.map(p => ({
          tel: p.tel,
          display8: p.display8,
          displayPlus7: p.displayPlus7
        }))
      }
    }
  })

  console.log('🌱 Seeding news...')
  for (const article of newsArticles) {
    await prisma.news.create({
      data: {
        slug: article.slug,
        title: article.title,
        date: article.date || '',
        category: article.category || '',
        excerpt: article.excerpt || '',
        accent: article.accent || 0,
        body: JSON.stringify(article.body || [])
      }
    })
  }

  console.log('🌱 Seeding course categories and courses...')
  const categories = [
    { slug: 'fire_safety', title: 'Пожарная безопасность', courses: firePrograms },
    { slug: 'energy_security', title: 'Энергетическая безопасность', courses: energyPrograms },
    { slug: 'environmental_security', title: 'Экологическая безопасность', courses: [...environmentalProgramsPq, ...environmentalProgramsPpo] },
    { slug: 'industrial_safety', title: 'Промышленная безопасность', courses: industrialTrainingPrograms },
    { slug: 'professional_education', title: 'Профессиональное обучение', courses: professionalPrograms },
    { slug: 'tematicheskie_seminary', title: 'Тематические семинары (ОПО)', courses: opoWorkerPrograms },
    { slug: 'trafficking_in_drugs', title: 'Оборот наркотических средств', courses: drugsPrograms },
    { slug: 'security_work', title: 'Охрана труда', courses: securityWorkCourses },
  ]

  for (const cat of categories) {
    await prisma.category.create({
      data: { slug: cat.slug, title: cat.title }
    })

    if (!cat.courses) continue

    for (const c of cat.courses as any[]) {
      await prisma.course.create({
        data: {
          category: { connect: { slug: cat.slug } },
          code: c.code,
          textCode: c.textCode || c.code,
          title: c.title,
          hours: String(c.hours ?? ''),
          mainDescription: c.mainDescription || '',
          users: JSON.stringify(c.users || []),
          requirements: JSON.stringify(c.requiremets || c.requirements || []),
          format: c.format || '',
          period: c.period || '',
          programFile: typeof c.programm === 'string' ? c.programm : '',
          applicationFile: typeof c.application === 'string' ? c.application : ''
        }
      })
    }

    console.log(`  ✔ ${cat.title}: ${cat.courses.length} курсов`)
  }

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
