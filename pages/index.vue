<template>
  <div>
    <section class="section-item">
      <MainScreen/>
    </section>
    <section class="section-item">
      <CardSlider />
    </section>
    <section class="section-item">
      <DotTitle text="Коротко о центре" />
      <NewsSection />
    </section>
    <section class="section-item">
      <DotTitle text="Партнеры" />
      <PartnerSlider />
    </section>
    <section class="section-item">
      <DotTitle text="Как нас найти" />
      <MapSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import MainScreen from '@/components/UI/MainScreen.vue'
import CardSlider from '@/components/UI/CardSlider.vue'
import NewsSection from '@/components/UI/NewsSection.vue'
import PartnerSlider from '@/components/UI/PartnerSlider.vue'
import MapSection from '@/components/UI/MapSection.vue'
import DotTitle from '@/components/UI/DotTitle.vue';
</script>

<style scoped>
h1 {
  color: #1a202c;
}

.section-item{
  margin-bottom: 90px;
}
</style>
