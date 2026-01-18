<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="8"/>
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

const titleCommon = ref('Вакантные места для приема обучающихся')

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
.vacant{
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 70px;

  &__item{
    flex: 1;
    padding: 22px;
    border-radius: 12px;
    background-color: #E9F4FF;

    &-title{
      font-size: 24px;
      line-height: 30px;
      color: #123970;
      margin-bottom: 16px;
      font-family: 'Inter M', sans-serif;
    }

    &-text{
      font-size: 16px;
      line-height: 20px;
      font-family: 'IBM', sans-serif;
    }
  }
}
</style>
