<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="0" />
    <DotTitle :text="pageTexts.dotTitleSveden" />

    <OrganizationInfo />
    <DotTitle :text="pageTexts.dotTitleDocuments" />
    <DocumentAccordion :documents="documents" style="margin-bottom: 60px" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import OrganizationInfo from '@/components/UI/OrganizationInfo.vue'
import NavBlock from '@/components/UI/NavBlock.vue'
import DocumentAccordion from '@/components/UI/DocumentAccordion.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import {
  SVEDEN_COMMON_DOC_MICRO,
  SVEDEN_COMMON_DOC_TITLES,
  SVEDEN_COMMON_PAGE
} from '@/utils/svedenCommonContent'

import License from '@/assets/documents/common/(01)Лицензия на осуществление образовательной деятельности.pdf'
import LicenseChange from '@/assets/documents/common/(02)Выписка из реестра лицензий по состоянию на 01.08.2024г (изменение лицензии).pdf'
import ReestrDoc from '@/assets/documents/common/(03)Выписка из реестра организаций, оказывающих услуги в области охраны труда.pdf'
import AkkreditDoc from '@/assets/documents/common/(04)Уведомление об аккредитации.pdf'

const pageTexts = SVEDEN_COMMON_PAGE

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: pageTexts.breadcrumbOrg, link: '/sveden/common/' },
  { text: pageTexts.pageTitle, link: '/sveden/common/' }
]

const documents = [
  {
    title: SVEDEN_COMMON_DOC_TITLES.license,
    file: License,
    micro: SVEDEN_COMMON_DOC_MICRO.license
  },
  {
    title: SVEDEN_COMMON_DOC_TITLES.licenseExtract,
    file: LicenseChange,
    micro: SVEDEN_COMMON_DOC_MICRO.licenseExtract
  },
  {
    title: SVEDEN_COMMON_DOC_TITLES.otRegistry,
    file: ReestrDoc,
    micro: SVEDEN_COMMON_DOC_MICRO.otRegistry
  },
  {
    title: SVEDEN_COMMON_DOC_TITLES.accreditation,
    file: AkkreditDoc,
    micro: SVEDEN_COMMON_DOC_MICRO.accreditation
  }
]
</script>

<style scoped lang="scss">
.common {
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-bottom: 70px;

  &__item {
    display: flex;
    flex-direction: row;
    gap: 20px;

    .child {
      flex: 1;
    }

    &-img {
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

    &-text {
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 20px;
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

    .title {
      font-size: 24px;
      line-height: 36px;
    }

    .text {
      font-size: 16px;
      line-height: 24px;
    }

    &-1 {
      grid-row: 1 / 3;
      grid-column: 1 / 2;
      background-color: #2c2b31;
      color: white;
    }
    &-2 {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      background-color: #e9f4ff;
      .title {
        color: #123970;
      }
    }
    &-3 {
      grid-row: 1 / 2;
      grid-column: 3 / 5;
      background-color: white;
      border: 1px solid #cad6e0;
    }
    &-4 {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      background-color: #e9f4ff;
      .title {
        color: #123970;
      }
    }
    &-5 {
      grid-row: 2 / 3;
      grid-column: 3 / 4;
      background-color: #2c2b31;
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
