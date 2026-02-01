<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="2"
      :tabs="tabs"
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Энергетическая безопасность (Очное, очно-заочное обучение)"/>
    <ProgramTable 
      :items="programDop" 
      :centralTitle="`Подготовка в области «Энергетической безопасности»`"/>

    <DotTitle text="о программах" />
    <TitleCommon text="Основные условия обучения"/>
    <EducationInfo
      :topBlocks="[
        {
          title: 'Законодательство и регламенты:',
          type: 'checklist',
          items: [
            'ФЗ № 190-ФЗ «О теплоснабжении»',
            'Положение о Минэнерго РФ (п. 4.2.14)',
            'Приказ Минэнерго № 511 от 14.05.2025',
            'Приказ Минэнерго № 2234 от 13.11.2024'
          ]
        },
        {
          title: 'Для обучения необходимо:',
          type: 'text',
          text: 'Подготовка и подтверждение готовности обязательны для работников, выполняющих трудовые функции по эксплуатации тепловых энергоустановок (ТЭУ): дежурного, оперативного, оперативно-ремонтного персонала, ответственных лиц и специалистов, назначенных за безопасную эксплуатацию объектов теплоснабжения и теплопотребляющих установок. Работники муниципальных и коммерческих теплоснабжающих организаций, теплосетевых организаций и организаций-потребителей тепловой энергии подпадают под эти требования.'
        }
      ]"
      diplomaText="По итогам обучения слушателю выдаётся удостоверение установленного образца, подтверждающее его допуск к работам на тепловых энергоустановках в качестве лица, ответственного за организацию и безопасную эксплуатацию тепловых энергоустановок."
      pdfTitle="Положение об оказании платных образовательных услуг"
      :diplomaImage="UdostovExRed"
    />
    <DotTitle text="начать обучение" />
    <TitleCommon text="Как мы работаем"/>
    <StepsList />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import ProgramTable from '@/components/UI/ProgramTable.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import EducationInfo from '@/components/UI/EducationInfo.vue'
import StepsList from '@/components/UI/StepsList.vue'
import UdostovExRed from '@/assets/img/redUdostoverenia.png'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Энергетическая безопасность`, link: '/training_programs/' },
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

const programDop = [
  {
    code: '-',
    title: '«Энергетическая безопасность» для предэкзаменационной подготовки работников теплоснабжающих и теплосетевых организаций',
    hours: 18
  },
];


</script>

<style scoped>
/* Можно писать CSS, если нужно */
</style>
