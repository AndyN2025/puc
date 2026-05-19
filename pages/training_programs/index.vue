<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navCourseItems" :activeIndex="0" />
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="SITE_TEXT.trainingPages.sections.industrialSafety" />
    <ProgramTable
      v-model="programTab"
      :tabs="programTabs"
      :items="selectedProgramList"
      link="training_programs/industrial_safety"
    />

    <DotTitle :text="SITE_TEXT.trainingPages.indexPages.startLearning" />
    <TitleCommon :text="SITE_TEXT.trainingPages.indexPages.howWeWork" />
    <StepsList :workflow="programTab" file="/blanks/zayvka_01.doc" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import TitleCommon from '@/components/UI/TitleCommon.vue'
import NavBlock from '@/components/UI/NavBlock.vue'
import ProgramTable from '@/components/UI/ProgramTable.vue'
import StepsList from '@/components/UI/StepsList.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import {
  industrialPreAttestForTable,
  industrialPkForTable,
  industrialDopForTable
} from './industrial_safety/utils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.trainingPages.indexPages.titleCommon)

const breadCrumbs = [
  { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
  { text: titleCommon.value, link: '/training_programs/' }
]

const programTabs = [
  { text: SITE_TEXT.trainingPages.indexPages.tabs.preAttest, value: 'pre_attest' },
  { text: SITE_TEXT.trainingPages.indexPages.tabs.qualification, value: 'qualification' }
]

const programTab = ref<'pre_attest' | 'qualification'>('pre_attest')
const selectedProgramList = ref(industrialPreAttestForTable)

watch(
  programTab,
  (v) => {
    if (v === 'qualification') {
      selectedProgramList.value = [...industrialPkForTable, ...industrialDopForTable]
    } else {
      selectedProgramList.value = industrialPreAttestForTable
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/online-block' as ob;

@include ob.training-online-block;
</style>
