<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="10"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <div class="inter__text">
      <p class="inter__text-item">Стипендия и социальная поддержка не предоставляются.</p>
      <p class="inter__text-item">Общежитие и интернат не предоставляются</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'

import { navSvedenItems } from '@/utils/svedenUtils'

const titleCommon = ref('Стипендии и меры поддержки обучающихся')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
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
</style>
