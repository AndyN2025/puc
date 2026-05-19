<template>
  <div class="page-home">
    <section class="section-item">
      <MainWindow/>
    </section>
    <section class="section-item container">
      <DotTitle :text="SITE_TEXT.homePage.sections.courses"/>
      <ListCourses />
    </section>
    <section class="section-item container">
      <DotTitle :text="SITE_TEXT.homePage.sections.about" />
      <NewsSection />
    </section>
    <section class="section-item container">
      <DotTitle :text="SITE_TEXT.homePage.sections.partners" />
      <PartnerSlider />
    </section>
    <section class="section-item container">
      <DotTitle :text="SITE_TEXT.homePage.sections.map" />
      <MapSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import MainWindow from '@/components/UI/MainWindow.vue'
import DotTitle from '@/components/UI/DotTitle.vue';
import ListCourses from '@/components/UI/ListCourses.vue'
import { SITE_TEXT } from '@/utils/siteText'

const NewsSection = defineAsyncComponent(() => import('@/components/UI/NewsSection.vue'))
const PartnerSlider = defineAsyncComponent(() => import('@/components/UI/PartnerSlider.vue'))
const MapSection = defineAsyncComponent(() => import('@/components/UI/MapSection.vue'))
</script>

<style scoped lang="scss">
.page-home {
  min-width: 0;
}
</style>
