<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="5"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Оборот наркотических веществ и их прекурсоров"/>
    <ProgramTable 
      :items="programDop" 
      :centralTitle="`Дополнительная профессиональная программа повышения квалификации
        “Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров”`"/>

    <DotTitle text="о программах" />
    <TitleCommon text="Основные условия обучения"/>
    <EducationInfo
      :topBlocks="[
        {
          title: 'Организация обучения',
          type: 'checklist',
          items: [
            'Начало обучения сразу после оплаты.',
            'Поддержка наших специалистов в решении всех возникающих вопросов',
            'Получение документов с доставкой по РФ от 3-х дней'
          ]
        },
        {
          title: 'Для обучения необходимо:',
          type: 'text',
          text: 'высшее и среднее медицинское профессиональное образование'
        },
        {
          title: 'Форма обучения:',
          type: 'text',
          text: 'заочная с применением дистанционных технологий (онлайн в любое время)'
        }
      ]"
      :diplomaImage="UdostovEx"
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
import UdostovEx from '@/assets/img/UdostovExmpl.png'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Оборот наркотических веществ и их прекурсоров`, link: '/trafficking_in_drugs/' },
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

const programDop = [
{ code: '-', title: `«Государственное регулирование в сфере оборота наркотических средств, психотропных веществ и их прекурсоров при осуществлении медицинской и фармацевтической деятельности»`, hours: 72 }
]

</script>

<style scoped>
/* Можно писать CSS, если нужно */
</style>
