<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="6"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <ul class="material">
      <li class="material__item" v-for="item in materialList" :key="item.id">
        <div class="material__txt">
          <p class="material__item-title">{{ item.title }}</p>
          <p class="material__item-text">{{ item.text }}</p>
        </div>

        <div class="material__item-img">
          <img :src="item.img" :alt="item.title"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import material1 from '@/assets/img/common/material01.png'
import material2 from '@/assets/img/common/material02.png'
import material3 from '@/assets/img/common/material03.png'
import material4 from '@/assets/img/common/material04.png'

const titleCommon = ref('Материально-техническое обеспечение и оснащенность образовательного процесса')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
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

</script>

<style scoped lang="scss">
.material{
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 80px;

  &__item{
    max-width: 330px;
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
  }
}

</style>
