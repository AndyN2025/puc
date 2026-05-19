<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="3"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.fireSafetyFull"/>
    <ProgramTable
      :items="firePrograms"
      link="training_programs/fire_safety"
      :centralTitle="SITE_TEXT.trainingPages.sections.fireSafety"
    />

    <DotTitle :text="SITE_TEXT.trainingPages.indexPages.startLearning" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.howWeWork"/>
    <StepsList preset="remote_standard" />
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
import { firePrograms } from './utils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: SITE_TEXT.trainingPages.sections.fireSafety, link: '/training_programs/fire_safety/' }
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
