<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="1"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon" style="margin-bottom: 40px;"/>

    <div class="struct">
      <div class="struct__schema">
        <img :src="Schema" alt="Схема управления" />
      </div>

      <!-- <ul class="struct__list">
        <li class="struct__item" v-for="item in peoples" :key="item.name">
          <p class="struct__item-name">{{ item.name }}</p>
          <p class="struct__item-post">{{ item.post }}</p>
          <span class="struct__item-otdel">{{ item.otdel }}</span>
        </li>
      </ul> -->
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

const titleCommon = ref('Структура и органы управления образовательной организации')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
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
    // padding: 0 20px 0 0;
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
</style>
