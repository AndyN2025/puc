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
      :items="programDop" 
      :centralTitle="`Пожарная безопасность`"/>

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
  { text: `Пожарная безопасность`, link: `/fire_safety/`}
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
    title: 'Дополнительная профессиональная программа повышения квалификации. «Повышение квалификации для руководителей организаций, лиц, назначенных руководителем организации ответственными за обеспечение пожарной безопасности, в том числе в обособленных структурных подразделениях организации».',
    hours: 16
  },
  {
    code: '-',
    title: 'Дополнительная профессиональная программа повышения квалификации. «Повышение квалификации для руководителей эксплуатирующих и управляющих организаций, осуществляющих хозяйственную деятельность, связанную с обеспечением пожарной безопасности на объектах защиты, лиц, назначенных ими ответственными за обеспечение пожарной безопасности».',
    hours: 16
  },
  {
    code: '-',
    title: 'Дополнительная профессиональная программа повышения квалификации. «Повышение квалификации для ответственных должностных лиц, занимающих должности главных специалистов технического и производственного профиля, должностных лиц, исполняющих их обязанности, на объектах защиты, предназначенных для проживания или временного пребывания 50 и более человек одновременно (за исключением многоэтажных жилых домов), объектов защиты, отнесенных к категориям повышенной взрывопожароопасности, взрывопожароопасности, пожароопасности».',
    hours: 16
  },
  {
    code: '-',
    title: 'Дополнительная профессиональная программа повышения квалификации. «Повышение квалификации для лиц, на которых возложена трудовая функция по проведению противопожарного инструктажа».',
    hours: 16
  },
  {
    code: '-',
    title: 'Профессиональная переподготовка для получения квалификации «Специалист по пожарной профилактике»',
    hours: 256
  }
];

</script>

<style scoped>
/* Можно писать CSS, если нужно */
</style>
