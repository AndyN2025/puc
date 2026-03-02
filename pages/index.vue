<template>
  <div> 
    <section class="section-item">
      <MainWindow/>
    </section>
    <section class="section-item container">
      <DotTitle text="Виды обучения"/>
      <ListCourses />
    </section>
    <section class="section-item container">
      <DotTitle text="Коротко о центре" />
      <NewsSection />
    </section>
    <section class="section-item container">
      <DotTitle text="Партнеры" />
      <PartnerSlider />
    </section>
    <section class="section-item container">
      <DotTitle text="Как нас найти" />
      <MapSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import MainWindow from '@/components/UI/MainWindow.vue'
import NewsSection from '@/components/UI/NewsSection.vue'
import PartnerSlider from '@/components/UI/PartnerSlider.vue'
import MapSection from '@/components/UI/MapSection.vue'
import DotTitle from '@/components/UI/DotTitle.vue';
import ListCourses from '@/components/UI/ListCourses.vue'

</script>

<style scoped lang="scss">

.section-item{
  margin-bottom: 90px;
}

</style>
