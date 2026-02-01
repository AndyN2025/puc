<template>
  <div class="inter">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="5"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <ul class="struct__list">
      <li class="struct__item" v-for="item in peoples" :key="item.name">
        <p class="struct__item-name">{{ item.name }}</p>
        <p class="struct__item-post">{{ item.post }}</p>
        <span class="struct__item-otdel">{{ item.otdel }}</span>
        <div class="struct__item-contacts">
          <a href="tel:{{ item.phone }}" class="struct__item-contacts__item">{{ item.phone }}</a>
          <a href="tel:{{ item.phoneDop }}" class="struct__item-contacts__item">{{ item.phoneDop }}</a>
          <a href="mailto:{{ item.email }}" class="struct__item-contacts__item">{{ item.email }}</a>
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

const titleCommon = ref('Руководство')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/managers/' }
] 

const peoples = [
  { id: 1, name: 'Шмарева Елена Геннадьевна', post: 'Генеральный директор', otdel: 'Администрация', phone: '8-(910)-520-15-64', phoneDop: '8-(4842)-56-21-83', email: 'ekc_06@mail.ru'},
  { id: 2, name: 'Стрекалова Наталия Валентиновна', post: 'Главный бухгалтер', otdel: 'Финансовый отдел', phone: '8-(910)-520-15-64', phoneDop: '8-(4842)-56-21-83', email: 'ekc_06@mail.ru' }
]


</script>

<style scoped lang="scss">
.struct{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 80px;


  &__list{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 14px;
    color:black;
  }

  &__item{
    flex: 1;
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
    &-contacts{
      display: flex;
      font-size: 16px;
      font-family: 'Inter', sans-serif;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0 0;
      align-items: flex-end;

      &__item{
        font-size: 18px;
      }
    }
  }

}
</style>