<template>
  <div class="p news-page">
    <Breadcrumbs :items="breadCrumbs" />
    <DotTitle :text="SITE_TEXT.newsIndexPage.title" />

    <p class="news-page__lead">
      {{ SITE_TEXT.newsIndexPage.lead }}
    </p>

    <NewsArchiveGrid :items="newsArticles" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import NewsArchiveGrid from '@/components/UI/NewsArchiveGrid.vue'
import { newsArticles } from '@/data/news'
import { SITE_TEXT } from '@/utils/siteText'

const breadCrumbs = [
  { text: SITE_TEXT.newsIndexPage.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.newsIndexPage.breadcrumbs.news, link: '/news' }
]
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.news-page {
  &__lead {
    margin: 0 0 $spacing-xl;
    font-family: $font-ibm;
    font-size: clamp(1rem, 2vw, 1.0625rem);
    line-height: $line-height-relaxed;
    color: $color-text-body;
  }
}
</style>
