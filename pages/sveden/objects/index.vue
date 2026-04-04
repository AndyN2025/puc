<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="7"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <div class="technic">
      <div class="technic__content">
        <div class="technic__content-text">
          <p>Учебные кабинеты АНО ДПО «Приокский учебный центр» оснащены современным оборудованием и всем необходимым для реализации образовательных программ:</p>
          <p>Мебель (эргономичные столы и стулья), мультимедийные комплексы (проектор, телевизор, персональные компьютеры, принтеры, акустические системы), специализированные учебные пособия, стенды, плакаты и различное оборудование, в том числе:</p>
        </div>
        <ul class="technic__content-list">
          <li class="technic__content-item" v-for="item in matList">
            <img :src="checkIcon" alt="галочка"/>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>

      <ul class="technic__table table">
        <li class="table-item" v-for="room in rooms" :key="room.id">
          <div class="table-item__name">{{ room.name }}</div>
          <ul class="table-item__list" v-if="room.id != 1">
            <li class="table-item__item" v-for="item in room.content">
              <img :src="checkIcon" alt="галочка"/>
              {{ item }}
            </li>
          </ul>
          <ul class="table-item__list" v-else>
            <li class="table-item__item" v-for="item in room.content[0]">
              <img :src="checkIcon" alt="галочка"/>
              {{ item }}
            </li>
            <p class="table-item__list-title">Учебно-демонстрационные приборы (устройства) для оборудования работающего под избыточным давлением:</p>
            <li class="table-item__item" v-for="item in room.content[1]">
              <img :src="checkIcon" alt="галочка"/>
              {{ item }}
            </li>
          </ul>

        </li>
      </ul>

      <div class="technic__info">
        <p class="technic__info-title">Перечень электронных образовательных ресурсов, к которым обеспечивается доступ обучающихся:</p>
        <ul class="technic__info-list">
          <li class="technic__info-item" v-for="mat in infoMat" :key="mat.id">
            {{ mat.text}}
          </li>
        </ul>

      </div>
    </div>

    

    <TitleCommon text="Доступная среда" />

    <div class="ovz">
      <ul class="ovz__list">
        <li
          v-for="(item, idx) in rawItems"
          :key="idx"
          class="ovz__item"
          :class="[
            (idx === 1 || idx === 3) ? 'ovz__item--col2' : '',
            `ovz__item-${idx}`
          ]"
          :style="{ backgroundColor: item.color }"
        >
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import checkIcon from '@/assets/img/checkIcon.svg'
import material1 from '@/assets/img/common/material01.png'
import material2 from '@/assets/img/common/material02.png'
import material3 from '@/assets/img/common/material03.png'
import material4 from '@/assets/img/common/material04.png'

const titleCommon = ref('Материально-техническое обеспечение и оснащенность образовательного процесса')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value + '. Доступная среда', link: '/sveden/vacant/' }
] 

const infoMat = [
  { id: 1, text: 'Интернет-ресурс для проведения онлайн-тренинга «Школа главного инженера  – URL: https://new.sdo-vot.ru/'},
  { id: 2, text: 'Система дистанционного обучения – URL:  http://edu.pucenter.ru'},
  { id: 3, text: 'Обучающе-контролирующая система «ОЛИМПОКС» – URL: https://olimpoks.ru'},
  { id: 4, text: 'Справочно правовая система «КонсультантПлюс» – URL: https://www.consultant.ru'}
]

const matList = [
  {
    text: `Макеты различных видов промышленного оборудования`
  },
    {
    text: `Стенды конструктивных элементов оборудования`
  },
    {
    text: `Демонстрационные стенды`
  },
    {
    text: `Оборудование предназначенное для проведения безопасных работ на высоте, в ограниченных и замкнутых пространствах`
  },
    {
    text: `Средства индивидуальной защиты применение которых требует практических навыков, используемые при выполнении различных видов работ`
  },
    {
    text: `Оборудование, необходимое для комплексного обучения навыкам оказания первой помощи пострадавшим`
  },
    {
    text: `Демонстрационные манекены для изучения правильного использования средств индивидуальной защиты`
  },
]

const materialList = [
  { 
    id: 1, 
    title: 'Учебные и служебные помещения', 
    text: `Для обеспечения образовательного процесса имеются учебные классы и вспомогательные помещения, 
      оснащённые кондиционерами и соответствующие требованиям СанПиН 2.4.3.1186-03 «Санитарно-эпидемиологические 
      требования к организации учебного процесса в образовательных учреждениях».`,
    img: material1,
  },   { 
    id: 2, 
    title: 'Оснащение учебных кабинетов', 
    text: `Учебный процесс организован в специально оборудованных классах и дополнительных помещениях, обеспеченных 
      кондиционированием и полностью соответствующих нормам СанПиН 2.4.3.1186-03. Общая площадь учебного центра, 
      расположенного в г. Калуга, составляет 200 кв. м, что обеспечивает требуемые параметры для проведения обучения и 
      создания благоприятной рабочей среды.`,
    img: material2,
  },  { 
    id: 3, 
    title: 'Наглядные пособия и оборудование', 
    text: `Подготовка сотрудников направлена на освоение профессиональных обязанностей с соблюдением требований к качеству 
      работы, норм техники безопасности и правил оформления документации. Обучение обеспечивает формирование необходимых 
      навыков, развитие ответственности и способность выполнять должностные задачи в соответствии с установленными стандартами, 
      что повышает эффективность и безопасность труда.`,
    img: material3,
  },  { 
    id: 4, 
    title: 'Компьютерные классы и цифровые ресурсы', 
    text: `Обучение охватывает меры предотвращения пожаров, действия при чрезвычайных ситуациях и ведение документации по 
      пожарной безопасности. Программа направлена на развитие практических навыков, понимание нормативных требований и готовность 
      сотрудников к корректным действиям в рисковых условиях, что способствует обеспечению безопасности на предприятии и снижению 
      вероятности аварийных ситуаций.`,
    img: material4,
  }
]

const contentRoom1 = [
  'персональные компьютеры;',
  'ноутбук;',
  'мультимедийный проектор;',
  'экран;',
  'доска маркерная',
  'демонстрационные стенды',
  'двухместные столы;',
  'стулья;',
]

const content2Room1 = [
  'сосуд воздухосборник;',
  'счетчик газовый;',
  'водомер;',
  'редуктор газовый;',
  'клапаны предохранительный, обратный;',
  'манометр;',
  'мембрана приборов;',
  'корпус вентиля;',
  'труба теплообменника;',
  'вентили;',
  'лопасти вентилятора;',
  'вентиль со штуцером;',
  'кран шаровый;',
]

const contentRoom2 = [
  'персональный компьютер;',
  'телевизор;',
  'двухместные столы;',
  'стулья;',
  'действующий макет подъемного крана;',
  'конструктивные элементы механического и электрооборудования подъемных сооружений;',
  'демонстрационные стенды по технике безопасности подъемных работ, работ на высоте.',
  'съемные грузозахватные приспособления и их конструктивные элементы',
]

const contentRoom3 = [
  'персональный компьютер;',
  'двухместные столы;',
  'стулья;',
  'тренажер-симулятор автоматического наружного дефиблирятора;',
  'манекен-тренажер сердечно-легочной и мозговой реанимации пружинно-механический с индикацией правильности выполнения действий «Максим-П-01»;',
  'манекен-тренажер для отработки навыков сердечно-лёгочной реанимации ПРАКТИ-МЭН;',
  'манекен мужской, демонстрационный;',
  'набор имитаторов ранений и поражений;',
  'учебный тренажер-манекен «Спасатель»;',
  'учебный тренажер «Индикатор эффективности СЛР «Темп»;',
  'плакаты демонстрационные для оказания первой помощи.',
  'РВ001В ПРАКТИ-БЭБИ Манекен полноростовой для отработки навыков сердечно-легочной реанимации',
  'газоанализатор газоопасных паров «Сигнал-4К (02);',
  'тренировочный жилет для отработки приема Геймлиха «Act+Fast»;',
  'костюм специальный летний для защиты от термических рисков электрической дуги;',
  'комбинезон химической защиты;',
  'костюм Л-1;',
  'фартук полимерный с нагрудником КЩС;',
  'жилет сигнальный желтый;',
  'привязь страховочная СПР-04-Ас(BG) искробезопасная;',
  'привязь страховочная З-71 комфорт серии ВЕРШИНА;',
  'карабин безопасности AZ 011;',
  'устройство для подъема и спуска АТ300 серии ВЕРШИНА;',
  'строп для страховочной привязи BODI GUARD;',
  'двуплечевой строп BW800;',
  'противогазы ГП-7КБ Бриз-КАМАФ;',
  'огнетушитель углекислый;',
  'огнетушитель порошковый;',
  'настенная демосистема;',
  'стенды;',
]

const rooms = [
  { id: 1, name: 'Аудитория №1', content: [ contentRoom1, content2Room1 ] },
  { id: 2, name: 'Аудитория №2', content: contentRoom2 },
  { id: 3, name: 'Аудитория №3', content: contentRoom3 },
]

const rawItems = [
  {
    text: 'АНО ДПО «ПУЦ» обеспечивает доступную и удобную образовательную среду для людей с ОВЗ, учитывая их особенности и потребности.',
    color: '#123970'
  }, {
    text: 'Для обеспечения доступа в здание обучающиеся могут воспользоваться помощью ассистента.',
    color: '#E9F4FF'
  }, {
    text: 'В процессе обучения преподаватели и сотрудники предоставляют консультации в электронном виде с использованием дистанционных образовательных технологий.',
    color: 'white'
  }, {
    text: 'Мы стремимся обеспечить равные возможности для всех обучающихся, создавая доступную и безопасную образовательную среду.',
    color: '#2C2B31'
  }, {
    text: 'Организация делает программы дополнительного профессионального обучения доступными, адаптируя среду и инструменты для беспрепятственного обучения.',
    color: '#E9F4FF'
  }, {
    text: 'Для удобства инвалидов и лиц с ОВЗ вход в здание оснащён кнопкой вызова персонала.',
    color: 'white'
  }
]
</script>

<style scoped lang="scss">
.material{
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 80px;

  &__item{
    padding: 22px;
    border: 1px solid #CAD6E0;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title{
      font-size: 24px;
      line-height: 30px;
      color: #123970;
      margin-bottom: 12px;
      font-family: 'Inter M', sans-serif;
    }

    &-text{
      font-family: 'IBM', sans-serif;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 20px;
    }

    &-img{
      display: flex;
      flex-direction: row;
      gap: 12px;
    }
  }
}

.technic{
  &__content{
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-bottom: 40px;

    &-text{
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid #123970;
      border-radius: 20px;
      padding: 22px;
    }

    &-list{
      flex: 5;
      border-radius: 20px;
      padding: 22px;
      background-color: #E9F4FF;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-item{
      display: flex;
      flex-direction: row;
      gap: 12px;
    }
  }

  &__info{
    margin-bottom: 80px;

    &-title{
      font-family: 'IBM M';
      font-size: 18px;
      margin-bottom: 18px;
    }

    &-list{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
}

.table{
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;

  &-item{
    display: flex;
    flex-direction: row;
    gap: 18px;
    border-radius: 12px;
    padding: 20px;
    background-color: #E9F4FF;

    &__name{
      width: 200px;
      text-align: center;
      font-size: 24px;
    }

    &__list{
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      &-title{
        margin: 10px 0 10px 20px;
        font-size: 18px;
      }
    }

    &__item{
      display: flex;
      flex-direction: row;
      gap: 12px;
    }
  }
}

.ovz {
  display: grid;

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
    margin-bottom: 70px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, auto);
    }
  }

  &__item {
    padding: 24px;
    border-radius: 12px;
    font-size: 16px;
    line-height: 1.2;

    &-0,
    &-3{
      color: white;
    }

    &-2,
    &-5{
      border: 1px solid #123970;
      border-radius: 12px;
    }

    &-1{
      background-image: url('@/assets/img/common/zizag.svg');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: contain;
    }

    &-3{
      background-image: url('@/assets/img/common/eLine.svg');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: contain;
    }

    p {
      margin: 0 0 10px 0;
    }

    &--col2 {
      grid-row: span 2;
    }

    &--dark-bg {
      background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
      color: white;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
