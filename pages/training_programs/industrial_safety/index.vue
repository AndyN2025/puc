<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock
      :navItems="navCourseItems"
      :activeIndex="0"
      :tabs="tabs"
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"
    />
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="titleEducation" />
    
    <DotTitle text="предаттестационная подготовка" />
    <ProgramTable :items="industrialPreAttestForTable" link="training_programs/industrial_safety" />

    <DotTitle text="повышение квалификации (ст. 14.1 116-фз)" />
    <ProgramTable :items="industrialPkForTable" link="training_programs/industrial_safety" />

    <DotTitle text="профессиональная переподготовка" />
    <ProgramTable :items="industrialDopForTable" link="training_programs/industrial_safety" />

    <DotTitle text="начать обучение" />
    <TitleCommon text="Как мы работаем" />
    <StepsList />
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
  industrialDopForTable
} from './utils'

const titleCommon = ref('Виды обучения')

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}

const titleEducation = computed(() => {
  if (selectedTab.value === 'online') return 'Промышленная безопасность (Дистанционное обучение)'
  if (selectedTab.value === 'offline') return 'Промышленная безопасность (Очное обучение)'
  return 'Промышленная безопасность'
})

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: 'Промышленная безопасность', link: '/training_programs/industrial_safety/' }
]

const tabs = [
  { text: 'Все', value: 'all' },
  { text: 'Дистанционно', value: 'online' },
  { text: 'Очно', value: 'offline' }
]
</script>

<style scoped lang="scss">
@use '@/assets/styles/online-block' as ob;

@include ob.training-online-block;
</style>
