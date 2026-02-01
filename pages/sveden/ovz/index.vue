<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="11" />
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon" />

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
import { ref } from 'vue'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import TitleCommon from '@/components/UI/TitleCommon.vue'
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'

const titleCommon = ref('Доступная среда')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/ovz/' }
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