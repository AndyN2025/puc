<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="6"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Обучение рабочего персонала ОПО"/>

    <div class="content-block">
      <ul class="content-list">
        <li class="content-item" v-for="item in educationlist" :key="item.id">
          <div class="content-item__icon">
            <img :src="item.img" />
          </div>

          <div class="content-item__content">
            <p class="content-item__title">{{ item.title }}</p>
            <p class="content-item__text">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>

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
      diplomaImage="none"
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
import EducationInfo from '@/components/UI/EducationInfo.vue'
import StepsList from '@/components/UI/StepsList.vue'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Обучение рабочего персонала ОПО`, link: '/tematicheskie_seminary/' },
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

import platformIcon from '@/assets/img/iconEducation/platform.svg'
import pultIcon from '@/assets/img/iconEducation/pult.svg'
import distanceIcon from '@/assets/img/iconEducation/distnace.svg'
import dangerHimIcon from '@/assets/img/iconEducation/dangerHim.svg'
import agresIcon from '@/assets/img/iconEducation/agresHim.svg'
import gasIcon from '@/assets/img/iconEducation/gas.svg'
import teploIcon from '@/assets/img/iconEducation/teplo.svg'
import tekIcon from '@/assets/img/iconEducation/tek.svg'
import pressIcon from '@/assets/img/iconEducation/pressure.svg'


const educationlist = [
  {
    id: 1, 
    title: `Работа на подъёмных платформах`,
    text: `Рабочий люльки`,
    img: platformIcon
  }, {
    id: 2, 
    title: `Пультовое управление техникой`,
    text: `Управление подъемными сооружениями с пола или со стационарного пульта`,
    img: pultIcon
  },{
    id: 3, 
    title: `Удалённый контроль подъёмников`,
    text: `Управление подъемными сооружениями с использованием системы дистанционного управления (по радиоканалу или иной линии связи)`,
    img: distanceIcon
  },{
    id: 4, 
    title: `Опасные химпроизводства`,
    text: `Персонал взрывопожароопасных химических, нефтехимических производств`,
    img: dangerHimIcon
  },{
    id: 5, 
    title: `Агрессивные химсреды`,
    text: `Персонал химически опасных производственных объектов, на которых хранятся и используются неорганические жидкие кислоты и щелочи`,
    img: agresIcon
  },{
    id: 6, 
    title: `Тепловые трубопроводные системы`,
    text: `Персонал, обслуживающий трубопроводы пара и горячей воды`,
    img: teploIcon
  },{
    id: 7, 
    title: `Теплоэнергетические комплексы`,
    text: `Персонал, обслуживающий тепловые энергоустановки`,
    img: tekIcon
  },{
    id: 8, 
    title: `Оборудование высокого давления`,
    text: `Персонал, обслуживающий сосуды, работающие под избыточным давлением пара, газов, жидкостей`,
    img: pressIcon
  },{
    id: 9, 
    title: `Газовые термотехнические системы`,
    text: `Персонал, обслуживающий газовое оборудование промышленных печей, сушильных установок и дымоотводящих устройств`,
    img: gasIcon
  }
]


</script>

<style scoped lang="scss">
  .content-list{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }

  .content-item{
    border: 1px solid #123970;
    border-radius: 16px;
    padding: 22px;

    &__icon{
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #E9F4FF;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    &__title{
      font-size: 24px;
      font-family: 'Inter' , sans-serif;
      line-height: 32px;
      color: #123970;
      margin-bottom: 8px;
    }

    &__text{
      font-size: 16px;
      line-height: 22px;
    }
  }

</style>
