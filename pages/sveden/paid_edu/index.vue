<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="3"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>
    <div class="paidContent">
      <p class="paidContent__lead">
        О стоимости обучения и наличии свободных мест в группах уточняйте у наших специалистов по телефонам:
      </p>
      <div class="paidContent__phones">
        <a
          v-for="p in SITE_PHONES"
          :key="p.tel"
          :href="`tel:${p.tel}`"
        >{{ p.display8 }}</a>
      </div>
    </div>
    <DocumentAccordion :documents="documents" style="margin-bottom: 130px;"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import DocumentAccordion from '@/components/UI/DocumentAccordion.vue'
import paidDoc from '@/assets/documents/paidEdu/Polozhenie_ob_okazanii_platnyh_obrazovatelnyh_uslug.pdf'
import { navSvedenItems } from '@/utils/svedenUtils'
import { SITE_PHONES } from '@/utils/site'

const titleCommon = ref(' Платные образовательные услуги')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

const documents =[{ title: 'Положение об оказании платных образовательных услуг', file: paidDoc },]

</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.paidContent {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: clamp(16px, 3vw, 24px);

  &__lead {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-family: $font-ibm, sans-serif;
    font-size: clamp(0.9375rem, 2.8vw, 1rem);
    line-height: $line-height-relaxed;
    color: $color-text-body;
  }

  &__phones {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: min(100%, 12rem);

    a {
      color: $color-darkBlue;
      font-size: clamp(0.875rem, 2.5vw, 0.9375rem);
      font-family: $font-ibm-m, sans-serif;
      text-decoration: none;
      word-break: break-word;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @include m.until($bp-md) {
    flex-direction: column;
    align-items: stretch;

    &__phones {
      min-width: 0;
    }
  }
}
</style>
