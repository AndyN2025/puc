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

    <!-- <div class="online-block">
      <div class="online-block__left">
        <p class="online-block__text">
          АНО ДПО «Приокский учебный центр» проводит подготовку специалистов организаций, поднадзорных Федеральной службе по
          экологическому, технологическому и атомному надзору, по направлениям промышленной безопасности:
        </p>

        <ul class="online-block__list">
          <li v-for="item in podgotovkaList" :key="item.id" class="online-block__item">
            <h4 class="online-block__item-title">{{ item.title }}</h4>
            <div class="online-block__item-content">
              <p class="online-block__item-text">{{ item.text }}</p>
              <button type="button" class="online-block__item-btn">ОТКРЫТЬ ЗАЯВКУ</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="online-block__right">
        <img :src="udostover" alt="Образец удостоверения" />
      </div>
    </div> -->

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
