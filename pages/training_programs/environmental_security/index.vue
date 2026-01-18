<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="4"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Экологическая безопасность"/>
    <ProgramTable 
      :items="programDop" 
      :centralTitle="`Дополнительная профессиональная программа повышения квалификации
        “Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров”`"/>

    <ProgramTable 
      :items="programDop2" 
      :centralTitle="`Дополнительная профессиональная программа профессиональной переподготовки в области промышленной безопасности`"/>

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
      diplomaText="Диплом о профессиональной переподготовке установленного образца с занесением в ФИС ФРДО — документ, признаваемый на всей территории РФ. АНО ДПО «Приокский учебный центр» имеет действующую лицензию № Л035-01224-40/00374085 (выдана 07.12.2015) и внесён в реестр аккредитованных организаций по охране труда (№4256 от 29.01.2016). Все программы соответствуют требованиям Постановления Правительства РФ №2334 от 16.12.2021 и федеральным стандартам, что гарантирует юридическую легитимность диплома для трудоустройства, аттестации и повышения квалификации."
      pdfTitle="Положение об оказании платных образовательных услуг"
      :diplomaImage="[UdostovEx, DiplomEx]"
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
import DiplomEx from '@/assets/img/DiplomExmpl.png'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Экологическая безопасность`, link: `/energy_security/`}
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
  {
    code: '-',
    title: 'Дополнительная профессиональная программа повышения квалификации. Обеспечение экологической безопасности в области сбора, транспортирования, обработки, утилизации, обезвреживания, размещения отходов I-IV классовопасности',
    hours: 38
  },
  {
    code: '-',
    title: 'Дополнительная профессиональная программа повышения квалификации. Обеспечение экологической безопасности руководителями и специалистами общехозяйственных систем управления',
    hours: 72
  }
];

const programDop2 = [
  {
    code: '-',
    title: 'Дополнительная профессиональная программа профессиональной переподготовки для получения квалификации "Специалист по экологической безопасности"',
    hours: 256
  },
];

</script>

<style scoped>
/* Можно писать CSS, если нужно */
</style>
