<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="1" 
      :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>

    <DotTitle :text="titleCommon" />

    <ProgramTable 
      :tabs="tabs"
      :items="selectProgrammList" 
      @tab-change="changeProgrammList"/>
      
    <!-- <DotTitle text="Программы" />
    
    

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
        :diplomaImage="udostoverEx"
      /> -->

    <DotTitle text="начать обучение" v-if="stepOnline"/>
    <TitleCommon text="Как мы работаем" v-if="stepOnline"/>
    <StepsList v-if="stepOnline"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import ProgramTable from '@/components/UI/ProgramTable.vue';
import StepsList from '@/components/UI/StepsList.vue'
import EducationInfo from '@/components/UI/EducationInfo.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import udostoverEx from '@/assets/img/UdostovExmpl.png'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Охрана труда`, link: '/security_work/' },
] 

const tabs = [
  { text: 'Очно', value: 'offline' },
  { text: 'Дистанционно', value: 'online' }
]

const programsOffline = [
  {
    code: '04-15/1ОТ',
    title: 'Общие вопросы охраны труда и функционирование системы управления охраной труда.',
    hours: 24
  },
  {
    code: '04-15/2ОТ',
    title: 'Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов, источников опасности, идентифицированных в рамках специальной оценки условий труда и оценки профессиональных рисков.',
    hours: 18
  },
  {
    code: '04-15/3ОТ',
    title: 'Обучение по использованию (применению) средств индивидуальной защиты.',
    hours: 16
  },
  {
    code: '04-15/4ОТ',
    title: 'Оказание первой помощи пострадавшим.',
    hours: 24
  },
  {
    code: '04-15/5ОТ',
    title: 'Обучение работников, выполняющих работы на высоте с применением средств подмащивания.',
    hours: 24
  },
  {
    code: '04-15/6ОТ',
    title: 'Обучение работников 1 группы по безопасности работ на высоте.',
    hours: 28
  },
  {
    code: '04-15/7ОТ',
    title: 'Обучение работников 2 группы по безопасности работ на высоте.',
    hours: 30
  },
  {
    code: '04-03/1ОТ',
    title: 'Обучение работников 3 группы по безопасности работ на высоте.',
    hours: 32
  },
  {
    code: '04-15/8ОТ',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 1 группы.',
    hours: 24
  },
  {
    code: '04-15/9ОТ',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 2 группы.',
    hours: 26
  },
  {
    code: '04-15/10ОТ',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 3 группы.',
    hours: 32
  },
  {
    code: '04-15/11ОТ',
    title: 'Охрана труда при выполнении погрузочно-разгрузочных работ.',
    hours: 24
  }
]


const programsOnline = [
  { code: '04-15/1ОТ', title: 'Общие вопросы охраны труда и функционирование системы управления охраной труда.', hours: 24 },
  { code: '04-17/1ОТ', title: 'Программа профессиональной переподготовки "Специалист по охране труда"', hours: 256 }
]

const selectProgrammList = ref(programsOffline)
const stepOnline = ref(false)

const changeProgrammList = (item) => {
  if(item.value === 'online'){
    selectProgrammList.value = programsOnline
    stepOnline.value = true
  } else {
    selectProgrammList.value = programsOffline
    stepOnline.value = false
  }

}

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}

</script>

<style scoped lang="scss">
.online-block{
    display: flex;
    flex-direction: row;
    margin-bottom: 60px;
    gap: 20px;

    &__text{
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 12px
    }

    &__left,
    &__right{
      flex: 1
    }


    &__list{
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    &__item{
      flex: 1;
      border: 1px solid #CAD6E0;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      min-height: 420px;

      &-title{
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        line-height: 30px;
        color: #123970;
        margin-bottom: 12px;
      }

      &-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }

      &-btn{
        font-family: 'IBM', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        max-width: 240px;
        padding: 12px 24px;
        border-radius: 8px;
        background-color: #123970;
        color: white;
        border: none;
      }
    }

    &__right{
      background-color: #E9F4FF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
        max-width: 420px;
      }
    }

}
</style>
