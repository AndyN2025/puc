<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="11" />
    <DotTitle :text="SITE_TEXT.svedenPages.commonTitle" />
    <TitleCommon :text="titleCommon" />

    <div class="inter__text">
      <p class="inter__text-item" itemprop="internationalDog" itemscope>
        Договоров с иностранными или международными организациями по вопросам образования и науки — нет.
        <span class="visually-hidden" itemprop="stateName">нет</span>
        <span class="visually-hidden" itemprop="orgName">нет</span>
        <span class="visually-hidden" itemprop="dogReg">нет</span>
      </p>
      <p class="inter__text-item">Образовательных программ, прошедших международную аккредитацию — нет.</p>
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

const titleCommon = ref(SITE_TEXT.svedenPages.titles.inter)

const breadCrumbs = [
  { text: SITE_TEXT.svedenPages.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.svedenPages.breadcrumbs.organization, link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.inter__text {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: clamp(3rem, 10vw, 8rem);
  max-width: 48rem;
  line-height: $line-height-body;
  color: $color-text-body;
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
