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
    
    <div class="online-block">
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
    </div>

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

    <DotTitle text="о программах" />
    <TitleCommon text="Основные условия обучения"/>

    <EducationInfo
        :topBlocks="[
          {
            title: 'Форма обучения:',
            type: 'text',
            text: 'заочная с применением дистанционных технологий, без отрыва от работы (онлайн в любое время) и из любого региона'
          },
          {
            title: 'Для обучения необходимо:',
            type: 'text',
            text: 'среднее профессиональное и (или) высшее образование'
          }
        ]"
        diplomaText="Диплом о профессиональной переподготовке установленного образца с занесением в ФИС ФРДО — документ, признаваемый на всей территории РФ. АНО ДПО «Приокский учебный центр» имеет действующую лицензию № Л035-01224-40/00374085 (выдана 07.12.2015) и внесён в реестр аккредитованных организаций по охране труда (№4256 от 29.01.2016). Все программы соответствуют требованиям Постановления Правительства РФ №2334 от 16.12.2021 и федеральным стандартам, что гарантирует юридическую легитимность диплома для трудоустройства, аттестации и повышения квалификации."
        pdfTitle="Положение об оказании платных образовательных услуг"
        :diplomaImage="DiplomEx"
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
import EducationInfo from '@/components/UI/EducationInfo.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import DiplomEx from '@/assets/img/DiplomExmpl.png'
import udostover from '@/assets/img/udostoverEx.png'
import {
  industrialPreAttestForTable,
  industrialPkForTable,
  industrialDopForTable,
  podgotovkaList
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
