<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="1" 
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>

    <DotTitle :text="titleCommon" />
    <TitleCommon :text="titleEducation"/>
    
    <div class="online-block" v-if="selectedTab === 'offline' || 'online'">
      <div class="online-block__left">
          <p class="online-block__text">
            АНО ДПО «Приокский учебный центр» осуществляет подготовку руководителей, специалистов, работников 
            организаций и работодателей — индивидуальных предпринимателей в области охраны труда в соответствии 
            с требованиями трудового законодательства Российской Федерации.
          </p>
          <p class="online-block__text">
            Обучение по охране труда направлено на формирование у слушателей знаний, умений и навыков, необходимых 
            для обеспечения безопасных условий труда и профилактики производственного травматизма. Программа включает 
            изучение требований Трудового кодекса РФ, федеральных правил, нормативов Минтруда, а также современных методов 
            оценки и снижения профессиональных рисков.
          </p>
          <p class="online-block__text">
            В ходе обучения рассматриваются вопросы организации системы управления охраной труда, проведения инструктажей, 
            расследования несчастных случаев, применения средств индивидуальной защиты и соблюдения обязательных норм 
            безопасности на рабочих местах.
          </p>
          <p class="online-block__text">
            В соответствии со статьёй 219 ТК РФ работники,  и работодатели — индивидуальные предприниматели обязаны проходить 
            обучение и проверку знаний требований охраны труда. По итогам подготовки проводится проверка знаний, оформляется 
            протокол комиссии и выдаётся протокол.
          </p>
      </div>
      <div class="online-block__right">
        <img :src="udostoverExWhite" alt="Образец удостоверения"/>
      </div>
    </div>

    <ProgramTable 
      v-if="selectedTab === 'offline'"
      :items="programsOffline" 
      :centralTitle="`Охрана труда (Очно)`"/>

    <ProgramTable 
      v-if="selectedTab === 'all'"
      :items="programsOffline" 
      :centralTitle="`Охрана труда (Очно)`"/>

    <ProgramTable 
      v-if="selectedTab === 'online'"
      :items="programsOnline" 
      :centralTitle="`Охрана труда (Онлайн)`"/>
      

    <DotTitle text="Программы" />
    
    

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
import NavBlock from '@/components/UI/NavBlock.vue'
import ProgramTable from '@/components/UI/ProgramTable.vue';
import StepsList from '@/components/UI/StepsList.vue'
import EducationInfo from '@/components/UI/EducationInfo.vue'
import { navCourseItems } from '@/utils/svedenUtils'
import udostoverEx from '@/assets/img/UdostovExmpl.png'
import udostoverExWhite from '@/assets/img/udostoverExWhite.png'

const titleCommon = ref('Виды обучения')
const titleEducation = computed(() => {
  if (selectedTab.value === 'online') {
    return 'Охрана труда (Онлайн обучение)'
  } else if (selectedTab.value === 'offline') {
    return 'Охрана труда (очное обучение)'
  } else {
    return 'Охрана труда'
  }
})

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Охрана труда`, link: '/security_work/' },
] 

const tabs = [
  { text: 'Все', value: 'all' },
  { text: 'Онлайн', value: 'online' },
  { text: 'Офлайн', value: 'offline' }
]

const eduTabs = [
  {id: 1, text: 'Предаттестационная подготовка', value:'подготовка'}, 
  {id: 2, text: 'Дополнительное проф. образование', value: 'образование' }
]

const programsOffline = [
  {
    code: '-',
    title: 'Общие вопросы охраны труда и функционирование системы управления охраной труда.',
    hours: 24
  },
  {
    code: '-',
    title: 'Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов, источников опасности, идентифицированных в рамках специальной оценки условий труда и оценки профессиональных рисков.',
    hours: 18
  },
  {
    code: '-',
    title: 'Обучение по использованию (применению) средств индивидуальной защиты.',
    hours: 16
  },
  {
    code: '-',
    title: 'Оказание первой помощи пострадавшим.',
    hours: 24
  },
  {
    code: '-',
    title: 'Обучение работников, выполняющих работы на высоте с применением средств подмащивания.',
    hours: 24
  },
  {
    code: '-',
    title: 'Обучение работников 1 группы по безопасности работ на высоте.',
    hours: 28
  },
  {
    code: '-',
    title: 'Обучение работников 2 группы по безопасности работ на высоте.',
    hours: 30
  },
  {
    code: '-',
    title: 'Обучение работников 3 группы по безопасности работ на высоте.',
    hours: 32
  },
  {
    code: '-',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 1 группы.',
    hours: 24
  },
  {
    code: '-',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 2 группы.',
    hours: 26
  },
  {
    code: '-',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности в ограниченных и замкнутых пространствах (ОЗП) работников 3 группы.',
    hours: 32
  },
  {
    code: '-',
    title: 'Охрана труда при выполнении погрузочно-разгрузочных работ.',
    hours: 24
  }
]


const programsOnline = [
  { code: '-', title: 'Общие вопросы охраны труда и функционирование системы управления охраной труда.', hours: 24 }
]

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
