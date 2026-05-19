<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="10"/>
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon"/>

    <div class="inter__text">
      <p class="inter__text-item">
        <span itemprop="grant">Стипендия не предоставляется.</span>
        <span itemprop="support">Социальная поддержка не предоставляется.</span>
      </p>
      <p class="inter__text-item">
        <span itemprop="hostelInfo">Общежитие не предоставляется.</span>
        <span itemprop="interInfo">Интернат не предоставляется.</span>
      </p>
      <div class="visually-hidden" aria-label="Дополнительные сведения о стипендиях и общежитиях">
        <div itemprop="localAct">Локальный нормативный акт о стипендиях: не применимо</div>
        <div itemprop="hostelNum">Количество мест в общежитиях: 0</div>
        <div itemprop="hostelNumOvz">Количество мест в общежитиях для инвалидов и лиц с ОВЗ: 0</div>
        <div itemprop="interNum">Количество мест в интернатах: 0</div>
        <div itemprop="interNumOvz">Количество мест в интернатах для инвалидов и лиц с ОВЗ: 0</div>
        <div itemprop="localActObSt">Информация о формировании платы за проживание в общежитии: не применимо</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'

import { navSvedenItems } from '@/utils/svedenUtils'
import { SITE_TEXT } from '@/utils/siteText'

const titleCommon = ref(SITE_TEXT.svedenPages.titles.grants)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/grants/' }
] 

</script>

<style scoped lang="scss">

.inter{
  &__text{
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 130px;
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
