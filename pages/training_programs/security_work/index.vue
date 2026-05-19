<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="1" 
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>

    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.sections.laborProtection" />

    <ProgramTable 
      :tabs="tabs"
      :items="selectProgrammList" 
      link="training_programs/security_work"
      @tab-change="changeProgrammList"/>
      
    <DotTitle :text="SITE_TEXT.trainingPages.indexPages.startLearning" v-if="stepOnline"/>
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.howWeWork" v-if="stepOnline"/>
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
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: SITE_TEXT.trainingPages.sections.laborProtection, link: '/training_programs/security_work/' },
] 

const tabs = [
  { text: SITE_TEXT.trainingPages.indexPages.tabs.fullTime, value: 'offline' },
  { text: SITE_TEXT.trainingPages.indexPages.tabs.distance, value: 'online' }
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
