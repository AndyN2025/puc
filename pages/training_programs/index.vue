<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="0" 
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="titleEducation"/>

    <DotTitle text="предаттестационная подготовка" />
    <ProgramTable :items="industrialPreAttestForTable" link="training_programs/industrial_safety" />

    <DotTitle text="повышение квалификации (ст. 14.1 116-фз)" />
    <ProgramTable :items="industrialPkForTable" link="training_programs/industrial_safety" />

    <DotTitle text="профессиональная переподготовка" />
    <ProgramTable
      :items="industrialDopForTable"
      link="training_programs/industrial_safety"
      style="margin-bottom: 100px"
    />

    <DotTitle text="начать обучение" />
    <TitleCommon text="Как мы работаем"/>
    <StepsList file="/blanks/zayvka_01.doc"/>
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
import {
  industrialPreAttestForTable,
  industrialPkForTable,
  industrialDopForTable,
} from './industrial_safety/utils'

const titleCommon = ref('Виды обучения')
const titleEducation = computed(() => {
  if (selectedTab.value === 'online') {
    return 'Промышленная безопасность (Онлайн обучение)'
  } else if (selectedTab.value === 'offline') {
    return 'Промышленная безопасность (Очное обучение)'
  } else {
    return 'Промышленная безопасность'
  }
})

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' }
]

const tabs = [
  { text: 'Все', value: 'all' },
  { text: 'Онлайн', value: 'online' },
  { text: 'Офлайн', value: 'offline' }
]

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/online-block' as ob;

@include ob.training-online-block;
</style>
