export const navSvedenItems = [
  { text: 'Основные сведения', link: '/sveden/common/', active: false },
  { text: 'Структура и органы управления образовательной организации', link: '/sveden/struct/', active: false },
  { text: 'Документы', link: '/sveden/document/', active: false },
  { text: 'Платные образовательные услуги', link: '/sveden/paid_edu/', active: false },
  { text: 'Образование', link: '/sveden/education/', active: false },
  { text: 'Руководство', link: '/sveden/managers/', active: false },
  { text: 'Педагогический состав', link: '/sveden/employees/', active: false },
  { text: 'Материально техническое обеспечение и оснащенность образовательного процесса. Доступная среда', link: '/sveden/objects/', active: false },
  { text: 'Финансовая-хозяйственная деятельность', link: '/sveden/budget/', active: false },
  { text: 'Вакантные места для приема (перевода) обучающихся', link: '/sveden/vacant/', active: false },
  { text: 'Стипендии и меры поддержки обучающихся', link: '/sveden/grants/', active: false },
  // { text: 'Доступная среда', link: '/sveden/ovz/', active: false },
  { text: 'Международное сотрудничество', link: '/sveden/inter/', active: false },
  { text: 'Организация питания в образовательной орагнизации', link: '/sveden/catering/', active: false },
]


export const navCourseItems = [
  { text: 'Промышленная безопасность', link: '/training_programs/industrial_safety/', active: false },
  { text: 'Охрана труда', link: '/training_programs/security_work/', active: false },
  { text: 'Энергетическая безопасность', link: '/training_programs/energy_security/', active: false },
  { text: 'Пожарная безопасность', link: '/training_programs/fire_safety/', active: false },
  { text: 'Экологическая безопасность', link: '/training_programs/environmental_security/', active: false },
  { text: 'Оборот наркотических веществ и их прекурсоров', link: '/training_programs/trafficking_in_drugs/', active: false },
  { text: 'Обучение рабочего персонала ОПО', link: '/training_programs/tematicheskie_seminary/', active: false },
  { text: 'Профессиональная подготовка', link: '/training_programs/professional_education/', active: false },
]


import mainProf from '@/assets/img/mainCard/prof-main.png'
import mainProm from '@/assets/img/mainCard/prom-main.png'
import mainOT from '@/assets/img/mainCard/ot-main.png'
import mainOPO from '@/assets/img/mainCard/opo-main.png'
import mainFire from '@/assets/img/mainCard/fire-main.png'
import mainEco from '@/assets/img/mainCard/eco-main.png'
import mainDrug from '@/assets/img/mainCard/drug-main.png'
import mainEnergy from '@/assets/img/mainCard/energy-safety.webp'

export const courseList =[
  {
    id: 1,
    title: 'Промышленная безопасность',
    text: 'Обучение специалистов мерам предотвращения аварий и аварийных ситуаций на производстве, контролю оборудования и ведению соответствующей технической документации.',
    image: mainProm,
    link: '/training_programs/industrial_safety/'
  },
  {
    id: 2,
    title: 'Экологическая безопасность',
    text: 'Обучение персонала мерам минимизации воздействия на окружающую среду, соблюдению природоохранных норм и правильному ведению экологической документации.',
    image: mainEco,
    link: '/training_programs/environmental_security/'
  },
  {
    id: 3,
    title: 'Пожарная безопасность',
    text: 'Обучение мерам предотвращения пожаров, действиям в чрезвычайных ситуациях и ведению документации по пожарной безопасности на предприятии.',
    image: mainFire,
    link: '/training_programs/fire_safety/'
  },
  {
    id: 4,
    title: 'Энергетическая безопасность',
    text: 'Обучение для работников, выполняющих трудовые функции по эксплуатации тепловых энергоустановок (ТЭУ)',
    image: mainEnergy,
    link: '/training_programs/energy_security/'
  },
  {
    id: 5,
    title: 'Охрана труда',
    text: 'Обучение по охране труда относится к профилактическим мероприятиям, направленным на предотвращение случаев производственного травматизма и профессиональных заболеваний, снижение их последствий и является специализированным процессом получения знаний, умений и навыков.',
    image: mainOT,
    link: `/puc/training_programs/security_work/`
  },
  {
    id: 6,
    title: 'Профессиональная подготовка',
    text: 'Подготовка сотрудников к выполнению профессиональных обязанностей с соблюдением нормативов качества, техники безопасности и оформлением необходимой документации.',
    image: mainProf,
    link: '/training_programs/professional_education/'
  },
  {
    id: 7,
    title: 'Обучение рабочего персонала ОПО',
    text: 'Подготовка работников опасных производственных объектов к безопасной эксплуатации оборудования, минимизации рисков и ведению необходимой технической и отчетной документации.',
    image: mainOPO,
    link: `/training_programs/tematicheskie_seminary/`
  },
  {
    id: 8,
    title: 'Оборот наркотических средств, психотропных веществ и их прекурсоров',
    text: 'Подготовка сотрудников к законному и безопасному обращению с наркотическими средствами, психотропными веществами и их прекурсорами с соблюдением требований законодательства.',
    image: mainDrug,
    link: '/training_programs/trafficking_in_drugs/',
  },
]