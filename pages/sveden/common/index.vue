<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="0"/>
    <DotTitle text="Сведения об образовательной организации"/>
    <!-- <div class="common">
      <div class="common__item">
        <div class="common__item-img child">
          <img :src="buildImg" alt="Здание"/>
        </div>
        <div class="common__item-content child">
          <TitleCommon :text="titleCommon"/>
          <div class="common__item-text">
            <p>В 1998 году во исполнение Федерального закона № 116 от 21 июля 1997 года было создано 
                Некоммерческое партнёрство «Приокский экспертно-консультационный центр». Организация 
                была основана для обеспечения квалифицированной экспертной и консультационной поддержки 
                в профильных областях.</p>
            <p>В 2014 году, в связи с расширением направления деятельности и введением новых видов 
                профессионального обучения, была открыта Автономная некоммерческая организация дополнительного 
                профессионального образования «Приокский учебный центр». Создание АНО ДПО позволило значительно 
                расширить спектр образовательных услуг.</p>
            <p>Сегодня АНО ДПО «Приокский учебный центр» предоставляет обучение по дополнительным профессиональным 
              программам повышения квалификации и профессиональной переподготовки, а также проводит предаттестационную 
              подготовку в сфере экологической и пожарной безопасности, а также в области оборота наркотических 
              средств, психотропных веществ и их прекурсоров.</p>
          </div>
        </div>
      </div>

      <ul class="common__item grid">
        <li 
            :class="['grid__item', `grid__item-${item.id}`]"  
            v-for="item in gridItems"
            :key="item.id">
          <p class="title">{{ item.title }}</p>
          <span v-if="item.text" class="text">{{ item.text }}</span>
        </li>
      </ul>

      <div class="common__item">
        <div class="common__item-content child">
          <TitleCommon text="Юридическое основание"/>
          <div class="common__item-text">
            <p>АНО ДПО «Приокский учебный центр» внесена в реестр аккредитованных организаций, оказывающих услуги 
                в области охраны труда, под регистрационным номером 4256 от 29 января 2016 года. Организация 
                соответствует требованиям постановления Правительства Российской Федерации от 16 декабря 2021 г. No 2334 по обучению.</p>
            <p>Организация также внесена в реестр аккредитованных организаций, оказывающих услуги в области охраны труда. 
                Аккредитация под регистрационным номером № 4256 от 29 января 2016 года подтверждает компетентность учебного 
                центра и право проводить обучение в сфере охраны труда в соответствии с действующим законодательством.</p>
            <p>На сегодняшний день АНО ДПО «Приокский учебный центр» предлагает широкий спектр программ профессионального 
                обучения, ориентированных на развитие практических навыков и повышение квалификации специалистов. Центр 
                обеспечивает современный уровень подготовки, сочетая методическую базу, опытный преподавательский состав и 
                актуальные образовательные стандарты.</p>
          </div>
        </div>

        <div class="common__item-img child">
          <img :src="buildImg" alt="Здание"/>
        </div>
      </div>
    </div> -->
    <OrganizationInfo />
    <DotTitle text="Документы" />
    <DocumentAccordion  :documents="documents" style="margin-bottom: 60px;"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
// import TitleCommon from '@/components/UI/TitleCommon.vue';
import OrganizationInfo from '@/components/UI/OrganizationInfo.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'

// import buildImg from '@/assets/img/common/building.webp'
import DocumentAccordion from '~/components/UI/DocumentAccordion.vue';

import Akkredit from '@/assets/documents/common/АккредитацияОТ2022.pdf'
import License from '@/assets/documents/common/Лицензия на осуществление образовательной деятельности.pdf'
import ReestrLicense from '@/assets/documents/common/Выписка из реестра лицензий № Л035-01224-40-00374085.pdf'
import ReestrOrgan from '@/assets/documents/common/Выписка из реестра организаций, оказывающих услуги в области охраны труда.pdf'

const titleCommon = ref('Основные сведения ')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
] 

const gridItems = [
  { id: 1, title: '«ПУЦ»главное'},
  { id: 2, title: 'АНО ДПО «ПУЦ»', text: 'Сокращенное наименование'},
  { id: 3, title: `АНО ДПО «ПУЦ» Приокский учебный центр`, text: 'Полное наименование'},
  { id: 4, title: 'ул. Никитина, 41', text: 'Фактический адрес'},
  { id: 5, title: 'ekc_06@mail.ru', text: 'Адрес электронной почты'},  
  { id: 6, title: `05.05.2014`, text: 'Дата образования'},
]

const documents =[
  { title: 'Выписка из реестра лицензий по состоянию на 07.11.2025', file: ReestrLicense },
  { title: 'Выписка из реестра организаций по охране труда', file: ReestrOrgan },
  { title: 'Лицензия на осуществление образовательной деятельности', file: License },
  { title: 'Аккредитация от 2022 г.', file: Akkredit },
]

</script>

<style scoped lang="scss">
  .common{
    display: flex;
    flex-direction: column;
    gap: 64px;
    margin-bottom: 70px;

    &__item{
      display: flex;
      flex-direction: row;
      gap: 20px;

      .child{
        flex: 1;
      }

      &-img{
        border-radius: 12px;
        max-height: 400px;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: block;
        
        img {
          display: block; 
          width: 100%;
          height: auto;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(18, 57, 112, 0.7); 
          pointer-events: none; 
        }
      }

      &-text{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 336px;
        height: 100%;
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 колонки */
    grid-template-rows: 1fr 1fr;           /* 2 строки */
    gap: 20px; /* отступы между блоками */
    list-style: none;
    padding: 0;
    margin: 0;
    height: 380px;

    &__item {
      background: #f8f9fa;
      padding: 32px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .title{
        font-size: 24px;
        line-height: 36px;
      }

      .text{
        font-size: 16px;
        line-height: 24px;
      }


      
      &-1 {
        grid-row: 1 / 3;   
        grid-column: 1 / 2;
        background-color: #2C2B31;
        color: white;
      }
      &-2 {
        grid-row: 1 / 2;
        grid-column: 2 / 3;
        background-color: #E9F4FF;
        .title{
          color: #123970;
        }
      }
      &-3 {
        grid-row: 1 / 2;
        grid-column: 3 / 5; 
        background-color: white;
        border: 1px solid #CAD6E0;
      }
      &-4 {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        background-color: #E9F4FF;
        .title{
          color: #123970;
        }
      }
      &-5 {
        grid-row: 2 / 3;
        grid-column: 3 / 4;
        background-color: #2C2B31;
        color: white;
      }
      &-6 {
        grid-row: 2 / 3;
        grid-column: 4 / 5;
        background-color: #123970;
        color: white;
      }
    }
  }
</style>
