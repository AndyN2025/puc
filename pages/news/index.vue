<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <DotTitle text="Что нового?" />

    <NewsGrid  :news="news"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import NewsGrid from '@/components/UI/NewsGrid.vue';

const breadCrumbs = [
    { text: 'Главная', link: '/' },
    { text: 'Новости', link: '/news' }
  ] 

const news = ref([
  {
    title: 'Промышленная безопасность',
    date: '10.09.2025',
    image: 'https://via.placeholder.com/600x280?text=Обучение+по+промышленной+безопасности',
    link: '/news/industrial-safety'
  },
  {
    title: 'Профессиональная переподготовка "Специалист в сфере промышленной безопасности"',
    date: '14.10.2025',
    image: 'https://via.placeholder.com/300x200?text=Переподготовка',
    link: '/news/professional-retraining-1'
  },
  {
    title: 'Промышленная безопасность',
    date: '12.11.2025',
    image: 'https://via.placeholder.com/300x200?text=Безопасность',
    link: '/news/industrial-safety-2'
  }
])
</script>

<style scoped>
</style>
