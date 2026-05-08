<template>
  <div class="p">
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
      link="training_programs/security_work"
      @tab-change="changeProgrammList"/>
      
    <DotTitle text="начать обучение" v-if="stepOnline"/>
    <TitleCommon text="Как мы работаем" v-if="stepOnline"/>
    <StepsList v-if="stepOnline" preset="remote_standard" />
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
  { text: 'Охрана труда', link: '/training_programs/security_work/' },
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
@use '@/assets/styles/online-block' as ob;

@include ob.training-online-block;
</style>
