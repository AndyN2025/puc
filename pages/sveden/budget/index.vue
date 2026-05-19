<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="8"/>
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon"/>

    <RepairBlock style="margin-bottom: 60px;"/>
    <section class="visually-hidden" aria-label="Финансово-хозяйственная деятельность">
      <div itemprop="finBFVolume">Объем образовательной деятельности за счет бюджетных ассигнований федерального бюджета: 0</div>
      <div itemprop="finBRVolume">Объем образовательной деятельности за счет бюджетов субъектов Российской Федерации: 0</div>
      <div itemprop="finBMVolume">Объем образовательной деятельности за счет местных бюджетов: 0</div>
      <div itemprop="finPVolume">Объем образовательной деятельности по договорам об оказании платных образовательных услуг: по договорам с заказчиками</div>
      <div itemprop="volume" itemscope>
        <div itemprop="finYear">2025</div>
        <div itemprop="finPost">Информация о поступлении финансовых и материальных средств: в разработке</div>
        <div itemprop="finRas">Информация о расходовании финансовых и материальных средств: в разработке</div>
      </div>
      <div itemprop="finPlanDocLink">План финансово-хозяйственной деятельности: не применимо</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import RepairBlock from '@/components/UI/RepairBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.svedenPages.titles.budget)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/budget/' }
] 

</script>

<style scoped>
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
