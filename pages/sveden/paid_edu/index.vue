<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="7"/>
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
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
    <section class="visually-hidden" aria-label="Дополнительные сведения о платных образовательных услугах">
      <div itemprop="paidDog">Образец договора об оказании платных образовательных услуг: отсутствует</div>
      <div itemprop="paidSt">Документ об утверждении стоимости обучения по каждой образовательной программе: уточняется у специалистов по телефонам, указанным на странице</div>
      <div itemprop="paidParents">Платные образовательные услуги за счет средств родителей: не применимо</div>
    </section>
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
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.svedenPages.titles.paidEdu)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/paid_edu/' }
] 

const documents = [
  { title: 'Положение об оказании платных образовательных услуг', file: paidDoc, micro: 'paidEdu' }
]

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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
