<template>
  <div class="inter">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="12"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>

    <RepairBlock style="margin-bottom: 60px;"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import RepairBlock from '@/components/UI/RepairBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'

const titleCommon = ref('Организация питания в образовательной орагнизации')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

</script>

<style scoped lang="scss">
.inter{
  margin-bottom: 60px;

  &__text{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
