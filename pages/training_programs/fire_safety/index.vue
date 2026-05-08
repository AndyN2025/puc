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
    <TitleCommon text="Пожарная безопасность (Дистанционное обучение)"/>
    <ProgramTable
      :items="firePrograms"
      link="training_programs/fire_safety"
      :centralTitle="`Пожарная безопасность`"
    />

    <DotTitle text="начать обучение" />
    <TitleCommon text="Как мы работаем"/>
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

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: 'Пожарная безопасность', link: '/training_programs/fire_safety/' }
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

<style scoped>

</style>
