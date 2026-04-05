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

      <ul class="technic__rooms" role="list">
        <li
          v-for="room in rooms"
          :key="room.id"
          class="technic__room"
          :class="{ 'technic__room--open': roomExpanded[room.id] }"
        >
          <button
            type="button"
            class="technic__room-trigger"
            :id="`technic-room-trigger-${room.id}`"
            :aria-expanded="roomExpanded[room.id]"
            :aria-controls="`technic-room-panel-${room.id}`"
            @click="toggleRoom(room.id)"
          >
            <span class="technic__room-title">{{ room.name }}</span>
            <span class="technic__room-trigger-hint" aria-hidden="true">
              {{ roomExpanded[room.id] ? 'Свернуть' : 'Подробнее' }}
            </span>
            <svg
              class="technic__room-chevron"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div
            :id="`technic-room-panel-${room.id}`"
            class="technic__room-panel"
            role="region"
            :aria-labelledby="`technic-room-trigger-${room.id}`"
            :hidden="!roomExpanded[room.id]"
          >
            <div class="technic__room-body">
              <template v-if="room.id !== 1">
                <ul class="technic__room-list">
                  <li
                    v-for="(item, idx) in room.content"
                    :key="idx"
                    class="technic__room-row"
                  >
                    <span class="technic__room-icon" aria-hidden="true">
                      <img :src="checkIcon" alt="" width="20" height="20" />
                    </span>
                    <span class="technic__room-text">{{ item }}</span>
                  </li>
                </ul>
              </template>
              <template v-else>
                <ul class="technic__room-list">
                  <li
                    v-for="(item, idx) in room.content[0]"
                    :key="'r1a-' + idx"
                    class="technic__room-row"
                  >
                    <span class="technic__room-icon" aria-hidden="true">
                      <img :src="checkIcon" alt="" width="20" height="20" />
                    </span>
                    <span class="technic__room-text">{{ item }}</span>
                  </li>
                </ul>
                <p class="technic__room-subtitle">
                  Учебно-демонстрационные приборы (устройства) для оборудования работающего под избыточным давлением:
                </p>
                <ul class="technic__room-list">
                  <li
                    v-for="(item, idx) in room.content[1]"
                    :key="'r1b-' + idx"
                    class="technic__room-row"
                  >
                    <span class="technic__room-icon" aria-hidden="true">
                      <img :src="checkIcon" alt="" width="20" height="20" />
                    </span>
                    <span class="technic__room-text">{{ item }}</span>
                  </li>
                </ul>
              </template>
            </div>
          </div>
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
import { reactive } from 'vue'
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

/** Какие аудитории развёрнуты (по клику на строку) */
const roomExpanded = reactive<Record<number, boolean>>({
  1: false,
  2: false,
  3: false
})

function toggleRoom(id: number) {
  roomExpanded[id] = !roomExpanded[id]
}

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
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

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

.technic__rooms {
  list-style: none;
  margin: 0 0 $spacing-xl;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.technic__room {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: $radius-xl;
  background: $color-white;
  border: 1px solid $color-border-strong;
  box-shadow: $shadow-soft;
  overflow: hidden;
}

.technic__room-trigger {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  width: 100%;
  margin: 0;
  padding: $spacing-md $spacing-lg;
  text-align: left;
  cursor: pointer;
  border: none;
  font: inherit;
  background: linear-gradient(
    135deg,
    $color-darkBlue 0%,
    color-mix(in srgb, $color-darkBlue 88%, #000) 100%
  );
  color: $color-white;
  border-radius: calc(#{$radius-xl} - 1px);
  transition:
    filter $transition-fast,
    box-shadow $transition-fast;

  &:hover {
    filter: brightness(1.06);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid $color-white;
    outline-offset: -4px;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, $color-lightBlue 40%, $color-darkBlue);
  }
}

.technic__room--open .technic__room-trigger {
  border-radius: calc(#{$radius-xl} - 1px) calc(#{$radius-xl} - 1px) 0 0;
  box-shadow: inset 0 -1px 0 color-mix(in srgb, $color-white 15%, transparent);
}

.technic__room-title {
  flex: 1;
  margin: 0;
  font-family: $font-ibm-m;
  font-size: clamp(1.0625rem, 2.2vw, 1.3125rem);
  font-weight: $font-weight-semibold;
  line-height: $line-height-tight;
  color: inherit;
  letter-spacing: 0.02em;
}

.technic__room-trigger-hint {
  flex-shrink: 0;
  font-family: $font-ibm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  opacity: 0.88;
  white-space: nowrap;

  @include m.until($bp-sm) {
    display: none;
  }
}

.technic__room-chevron {
  flex-shrink: 0;
  display: block;
  color: inherit;
  opacity: 0.95;
  transition: transform $transition-base;
}

.technic__room--open .technic__room-chevron {
  transform: rotate(180deg);
}

.technic__room-panel {
  border-top: 1px solid color-mix(in srgb, $color-darkBlue 18%, $color-border-strong);

  &[hidden] {
    display: none;
  }
}

.technic__room-body {
  padding: $spacing-lg;
  background: linear-gradient(
    180deg,
    $color-lightBlue 0%,
    color-mix(in srgb, $color-lightBlue 35%, $color-white) 48%,
    $color-white 100%
  );

  @include m.from($bp-md) {
    padding: $spacing-xl;
  }
}

.technic__room-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.technic__room-list + .technic__room-list {
  margin-top: $spacing-md;
}

.technic__room-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $spacing-md;
  align-items: flex-start;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-lg;
  transition: background-color $transition-fast;

  &:nth-child(even) {
    background: color-mix(in srgb, $color-lightBlue 45%, transparent);
  }

  &:hover {
    background: color-mix(in srgb, $color-lightBlue 70%, $color-white);
  }
}

.technic__room-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin-top: 0.125rem;
  border-radius: $radius-sm;
  background: color-mix(in srgb, $color-darkBlue 12%, $color-white);

  img {
    display: block;
    width: 1rem;
    height: 1rem;
    object-fit: contain;
  }
}

.technic__room-text {
  font-family: $font-ibm;
  font-size: $font-size-base;
  line-height: $line-height-body;
  color: $color-text-body;
}

.technic__room-subtitle {
  margin: $spacing-lg 0 $spacing-md;
  padding: $spacing-md $spacing-lg;
  font-family: $font-ibm-m;
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  line-height: $line-height-tight;
  color: $color-darkBlue;
  background: color-mix(in srgb, $color-lightBlue 55%, $color-white);
  border-left: 4px solid $color-darkBlue;
  border-radius: 0 $radius-md $radius-md 0;
  box-shadow: inset 0 1px 0 color-mix(in srgb, $color-white 80%, transparent);
}

@include m.until($bp-md) {
  .technic__room-row {
    padding: $spacing-sm;
  }

  .technic__room-subtitle {
    padding: $spacing-md;
    font-size: $font-size-base;
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
