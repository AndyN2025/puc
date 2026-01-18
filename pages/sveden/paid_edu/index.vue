<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="3"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>
    <DocumentAccordion :documents="documents" />
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

const titleCommon = ref(' Платные образовательные услуги')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

const documents =[{ title: 'Положение об оказании платных образовательных услуг', file: paidDoc },]

</script>

<style scoped>
</style>
