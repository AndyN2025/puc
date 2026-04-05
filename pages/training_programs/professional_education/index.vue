<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock
      :navItems="navCourseItems"
      :activeIndex="7"
      :tabs="tabs"
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"
    />
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Профессиональная подготовка" />
    <ProgramTable
      :items="professionalPrograms"
      link="training_programs/professional_education"
      code-column-title="Код профессии"
      hours-column-title="Кол-во часов"
    />

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
import { professionalPrograms } from './utils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  {
    text: 'Профессиональная подготовка',
    link: '/training_programs/professional_education/'
  }
]

const tabs = [
  { text: 'Все', value: 'all' },
  { text: 'Дистанционно', value: 'online' },
  { text: 'Очно', value: 'offline' }
]

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.prof-lead {
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  font-size: clamp(0.9375rem, 2.2vw, 1.0625rem);
  line-height: $line-height-relaxed;
  color: $color-text-body;
  max-width: 65rem;
}
</style>
