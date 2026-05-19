<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="2"
      :tabs="tabs"
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.energySafetyFull"/>
    <ProgramTable
      :items="energyPrograms"
      link="training_programs/energy_security"
      :centralTitle="SITE_TEXT.trainingPages.indexPages.energyCentralTitle"
    />

    <DotTitle :text="SITE_TEXT.trainingPages.indexPages.startLearning" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.howWeWork"/>
    <StepsList preset="energy" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import ProgramTable from '@/components/UI/ProgramTable.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import StepsList from '@/components/UI/StepsList.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import { energyPrograms } from './utils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: SITE_TEXT.trainingPages.sections.energySafety, link: '/training_programs/energy_security/' },
] 

const tabs = [
  { text: SITE_TEXT.trainingPages.indexPages.tabs.all, value: 'all' },
  { text: SITE_TEXT.trainingPages.indexPages.tabs.distance, value: 'online' },
  { text: SITE_TEXT.trainingPages.indexPages.tabs.fullTime, value: 'offline' }
]

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}

</script>

<style scoped>

</style>
