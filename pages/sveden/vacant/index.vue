<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="9"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <ul class="vacant">
      <li class="vacant__item" v-for="item in vacantList" :key="item.id">
        <p class="vacant__item-title">{{ item.title }}</p>
        <p class="vacant__item-text">{{ item.text }}</p>
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

const titleCommon = ref('Вакантные места для приема (перевода) обучающихся')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
] 

const vacantList = [
  { 
    id: 1, 
    title: 'Планирование и организация обучения',
    text: `В АНО ДПО «ПУЦ» ежеквартально по заявкам заказчиков формируется план-график 
      образовательных мероприятий по программам дополнительного профессионального образования 
      и профессионального обучения.`
  },  { 
    id: 2, 
    title: 'Условия приёма и наличие вакантных мест',
    text: `Условия приёма на обучение по образовательным программам среднего профессионального 
      и высшего образования, предусматривающим наличие вакантных мест за счёт бюджетных ассигнований 
      различных уровней, а также обучение по договорам за счёт средств физических и юридических лиц, 
      не распространяются на АНО ДПО «ПУЦ», реализующую программы дополнительного профессионального образования.`
  },
]

</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.vacant {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: clamp(16px, 3vw, 20px);
  margin-bottom: 70px;
  padding: 0;
  list-style: none;

  &__item {
    flex: 1 1 280px;
    min-width: 0;
    padding: clamp(16px, 4vw, 22px);
    border-radius: $radius-lg;
    background-color: $color-lightBlue;
    border: 1px solid $color-border;

    &-title {
      font-size: clamp(1.125rem, 3.5vw, 1.5rem);
      line-height: 1.3;
      color: $color-darkBlue;
      margin: 0 0 12px;
      font-family: $font-inter-m, sans-serif;
    }

    &-text {
      margin: 0;
      font-size: clamp(0.9375rem, 2.8vw, 1rem);
      line-height: $line-height-relaxed;
      font-family: $font-ibm, sans-serif;
      color: $color-text-body;
    }
  }

  @include m.until($bp-md) {
    flex-direction: column;

    &__item {
      flex: 1 1 auto;
      width: 100%;
    }
  }
}
</style>
