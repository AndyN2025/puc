<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="9"/>
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon"/>

    <ul class="vacant" itemprop="vacant">
      <li class="vacant__item" v-for="item in vacantList" :key="item.id">
        <p class="vacant__item-title">{{ item.title }}</p>
        <p class="vacant__item-text">{{ item.text }}</p>
      </li>
      <li
        v-for="program in vacantPrograms"
        :key="program.id"
        class="visually-hidden"
        itemscope
      >
        <div itemprop="eduCode">{{ program.code }}</div>
        <div itemprop="eduName">{{ program.name }}</div>
        <div itemprop="eduLevel">{{ program.level }}</div>
        <div itemprop="eduProf">{{ program.profile }}</div>
        <div itemprop="eduCourse">{{ program.course }}</div>
        <div itemprop="eduForm">{{ program.form }}</div>
        <div itemprop="numberBFVacant">0</div>
        <div itemprop="numberBRVacant">0</div>
        <div itemprop="numberBMVacant">0</div>
        <div itemprop="numberPVacant">По заявкам заказчиков</div>
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
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.svedenPages.titles.vacant)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
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

const vacantPrograms = [
  {
    id: 1,
    code: 'не применимо',
    name: 'Дополнительное профессиональное образование',
    level: 'Дополнительное профессиональное образование',
    profile: 'Программы повышения квалификации и профессиональной переподготовки',
    course: 'не применимо',
    form: 'Очная, очно-заочная, заочная'
  },
  {
    id: 2,
    code: 'не применимо',
    name: 'Профессиональное обучение',
    level: 'Профессиональное обучение',
    profile: 'Программы профессионального обучения по профессиям рабочих',
    course: 'не применимо',
    form: 'Очная, очно-заочная, заочная'
  }
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
