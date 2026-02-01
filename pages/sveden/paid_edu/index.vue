<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="3"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>
    <div class="paidContent">
      <span>О стоимости обучения и наличии свободных мест в группах уточняйте у наших специалистов по телефонам:</span> 
      <div class="paidContent__phones">
        <a href="tel:+74842562183">8 (4842) 56-21-83</a>
        <a href="tel:+74842597583">8 (4842) 59-75-83</a>
        <a href="tel:+79105201564">8 (910) 520-15-64</a>
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

const titleCommon = ref(' Платные образовательные услуги')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

const documents =[{ title: 'Положение об оказании платных образовательных услуг', file: paidDoc },]

</script>

<style scoped lang="scss">
.paidContent{
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  gap: 20px;

  &__phones{
    display: flex;
    flex-direction: column;
    gap: 12px;

    a{
      color: #123970;
      font-size: 14px;
    }
  }
}
</style>
