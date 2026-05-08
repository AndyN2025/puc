<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navCourseItems" :activeIndex="0" />
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Промышленная безопасность" />
    <ProgramTable
      v-model="programTab"
      :tabs="programTabs"
      :items="selectedProgramList"
      link="training_programs/industrial_safety"
    />

    <DotTitle text="начать обучение" />
    <TitleCommon text="Как мы работаем" />
    <StepsList :workflow="programTab" />
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
} from './utils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: 'Промышленная безопасность', link: '/training_programs/industrial_safety/' }
]

const programTabs = [
  { text: 'Предаттестационная подготовка', value: 'pre_attest' },
  { text: 'Повышение квалификации', value: 'qualification' }
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
