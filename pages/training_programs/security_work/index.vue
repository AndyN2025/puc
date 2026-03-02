<template>
  <div class="prehead"></div>
  <div class="container">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="1" 
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>

    <DotTitle :text="titleCommon" />

    <ProgramTable 
      :tabs="tabs"
      :items="selectProgrammList" 
      :link="'training_programs/security_work'"
      @tab-change="changeProgrammList"/>
      
    <DotTitle text="начать обучение" v-if="stepOnline"/>
    <TitleCommon text="Как мы работаем" v-if="stepOnline"/>
    <StepsList v-if="stepOnline"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import ProgramTable from '@/components/UI/ProgramTable.vue';
import StepsList from '@/components/UI/StepsList.vue'
import { programsOnline, programsOffline } from './utils'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Охрана труда`, link: '/security_work/' },
] 

const tabs = [
  { text: 'Очно', value: 'offline' },
  { text: 'Дистанционно', value: 'online' }
]

const selectProgrammList = ref(programsOffline)
const stepOnline = ref(false)

const changeProgrammList = (item) => {
  if(item.value === 'online'){
    selectProgrammList.value = programsOnline
    stepOnline.value = true
  } else {
    selectProgrammList.value = programsOffline
    stepOnline.value = false
  }

}

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}
</script>

<style scoped lang="scss">
.online-block{
    display: flex;
    flex-direction: row;
    margin-bottom: 60px;
    gap: 20px;

    &__text{
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 12px
    }

    &__left,
    &__right{
      flex: 1
    }


    &__list{
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    &__item{
      flex: 1;
      border: 1px solid #CAD6E0;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      min-height: 420px;

      &-title{
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        line-height: 30px;
        color: #123970;
        margin-bottom: 12px;
      }

      &-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }

      &-btn{
        font-family: 'IBM', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        max-width: 240px;
        padding: 12px 24px;
        border-radius: 8px;
        background-color: #123970;
        color: white;
        border: none;
      }
    }

    &__right{
      background-color: #E9F4FF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
        max-width: 420px;
      }
    }

}
</style>
