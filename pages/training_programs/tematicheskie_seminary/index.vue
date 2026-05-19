<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock
      :navItems="navCourseItems"
      :activeIndex="6"
      :tabs="tabs"
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"
    />
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.sections.opoWorkers" />
    <ProgramTable
      :items="opoWorkerPrograms"
      link="training_programs/tematicheskie_seminary"
    />

    <DotTitle :text="SITE_TEXT.trainingPages.indexPages.startLearning" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.howWeWork" />
    <StepsList preset="opo_worker" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import TitleCommon from '@/components/UI/TitleCommon.vue'
import NavBlock from '@/components/UI/NavBlock.vue'
import ProgramTable from '@/components/UI/ProgramTable.vue'
import StepsList from '@/components/UI/StepsList.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import { opoWorkerPrograms } from './utils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: SITE_TEXT.trainingPages.sections.opoWorkers, link: '/training_programs/tematicheskie_seminary/' }
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

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.opo-lead {
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  font-size: clamp(0.9375rem, 2.2vw, 1.0625rem);
  line-height: $line-height-relaxed;
  color: $color-text-body;
  max-width: 65rem;
}
</style>
