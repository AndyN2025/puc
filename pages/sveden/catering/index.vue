<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="12" />
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon" />

    <RepairBlock style="margin-bottom: 60px" />
    <section class="visually-hidden" aria-label="Организация питания и охрана здоровья обучающихся">
      <div itemprop="meals" itemscope>
        <div itemprop="objName">Условия питания обучающихся: не предусмотрены</div>
        <div itemprop="objAddress">нет</div>
        <div itemprop="objSq">0</div>
        <div itemprop="objCnt">0</div>
        <div itemprop="objOvz">не применимо</div>
      </div>
      <div itemprop="health" itemscope>
        <div itemprop="objName">Условия охраны здоровья обучающихся: обеспечиваются в соответствии с локальными требованиями организации</div>
        <div itemprop="objAddress">нет</div>
        <div itemprop="objSq">0</div>
        <div itemprop="objCnt">0</div>
        <div itemprop="objOvz">не применимо</div>
      </div>
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

const titleCommon = ref(SITE_TEXT.svedenPages.titles.catering)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/catering/' }
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
