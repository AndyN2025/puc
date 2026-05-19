<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="1"/>
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon" style="margin-bottom: 40px;"/>

    <div class="struct" itemprop="structOrgUprav">
      <div class="struct__schema">
        <img :src="Schema" alt="Схема структуры и органов управления образовательной организации" />
      </div>

      <div class="visually-hidden" aria-label="Структура и органы управления образовательной организацией">
        <div v-for="person in peoples" :key="person.id">
          <div itemprop="name">{{ person.otdel }}</div>
          <div itemprop="fio">{{ person.name }}</div>
          <div itemprop="post">{{ person.post }}</div>
          <div itemprop="addressStr">{{ SITE_ADDRESS.legal }}</div>
          <div itemprop="site">нет</div>
          <div itemprop="email">{{ SITE_EMAIL }}</div>
          <div itemprop="divisionClauseDocLink">нет</div>
        </div>
        <div itemprop="filInfo">
          <div itemprop="nameFil">Филиалы отсутствуют</div>
          <div itemprop="fioFil">нет</div>
          <div itemprop="postFil">нет</div>
          <div itemprop="addressFil">нет</div>
          <div itemprop="emailFil">нет</div>
          <div itemprop="websiteFil">нет</div>
          <div itemprop="divisionClauseDocLink">нет</div>
        </div>
        <div itemprop="repInfo">
          <div itemprop="nameRep">Представительства отсутствуют</div>
          <div itemprop="fioRep">нет</div>
          <div itemprop="postRep">нет</div>
          <div itemprop="addressRep">нет</div>
          <div itemprop="emailRep">нет</div>
          <div itemprop="websiteRep">нет</div>
          <div itemprop="divisionClauseDocLink">нет</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import Schema from '@/assets/img/common/structura.png'
import { navSvedenItems } from '@/utils/svedenUtils'
import { SITE_ADDRESS, SITE_EMAIL } from '@/utils/site'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.svedenPages.titles.struct)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/struct/' }
] 

const peoples = [
  { id: 1, name: 'Шмарева Елена Геннадьевна', post: 'Генеральный директор', otdel: 'Администрация' },
  { id: 2, name: 'Стрекалова Наталия Валентиновна', post: 'Главный бухгалтер', otdel: 'Финансовый отдел' }
]

</script>

<style scoped lang="scss">
.struct{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 80px;

  &__schema{
    flex: 5;
    display: flex;
    justify-content: center;
  }

  &__list{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 14px;
    color:black;
  }

  &__item{
    background-color: #E9F4FF;
    padding: 22px;
    border-radius: 12px;
    
    &-name{
      color: #123970;
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 36px;
      font-family: 'Inter', sans-serif;
    }
    &-post{
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
      font-family: 'IBM M', sans-serif;
    }
    &-otdel{
      font-size: 16px;
      line-height: 20px;
      font-family: 'IBM', sans-serif;
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
