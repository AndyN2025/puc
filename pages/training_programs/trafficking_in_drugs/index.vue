<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="5"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.sections.drugs"/>
    <ProgramTable
      :items="drugsPrograms"
      link="training_programs/trafficking_in_drugs"
      :centralTitle="SITE_TEXT.trainingPages.indexPages.drugsCentralTitle"
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
import { drugsPrograms } from './utils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: SITE_TEXT.trainingPages.sections.drugs, link: '/training_programs/trafficking_in_drugs/' },
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
