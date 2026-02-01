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

      <div class="technic__table">
        
      </div>
    </div>

    <!-- <ul class="material">
      <li class="material__item" v-for="item in materialList" :key="item.id">
        <div class="material__txt">
          <p class="material__item-title">{{ item.title }}</p>
          <-- <p class="material__item-text">{{ item.text }}</p> --
        </div>
        
        <div class="material__item-img">
          <p class="material__item-text">{{ item.text }}</p> 
          <img :src="item.img" :alt="item.title"/>
        </div>
      </li>
    </ul> -->

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
    margin-bottom: 60px;

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
