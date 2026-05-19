<template>
  <div v-if="article" class="p news-article-page" :key="slugKey">
    <Breadcrumbs :items="breadCrumbs" />
    <article class="news-article">
      <header class="news-article__header">
        <p class="news-article__meta">
          <span class="news-article__category">{{ article.category }}</span>
          <time
            class="news-article__date"
            :datetime="isoDate(article.date)"
          >{{ article.date }}</time>
        </p>
        <h1 class="news-article__title">{{ article.title }}</h1>
        <p class="news-article__lead">{{ article.excerpt }}</p>
      </header>
      <div
        class="news-article__media"
        :class="`news-article__media--accent-${article.accent ?? 0}`"
        aria-hidden="true"
      />
      <div class="news-article__content">
        <p
          v-for="(paragraph, i) in article.body"
          :key="i"
          class="news-article__paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
      <footer class="news-article__footer">
        <NuxtLink to="/news/" class="news-article__back">
          {{ SITE_TEXT.newsArticlePage.allNewsBack }}
        </NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import { getNewsBySlug } from '@/data/news'
import { SITE_TEXT } from '@/utils/siteText'

const route = useRoute()

const slugKey = computed(() => String(route.params.slug ?? ''))

const article = computed(() => {
  const s = slugKey.value
  return s ? getNewsBySlug(s) : undefined
})

watch(
  slugKey,
  (s) => {
    if (!s || !getNewsBySlug(s)) {
      throw createError({
        statusCode: 404,
        statusMessage: SITE_TEXT.newsArticlePage.notFound
      })
    }
  },
  { immediate: true }
)

const breadCrumbs = computed(() => [
  { text: SITE_TEXT.newsArticlePage.breadcrumbs.home, link: '/' },
  { text: SITE_TEXT.newsArticlePage.breadcrumbs.news, link: '/news' },
  {
    text: article.value
      ? truncate(article.value.title, 52)
      : SITE_TEXT.newsArticlePage.fallbackBreadcrumb,
    link: article.value ? `/news/${article.value.slug}` : '/news'
  }
])

function truncate(s: string, max: number) {
  if (s.length <= max) return s
  return `${s.slice(0, max - 1)}…`
}

function isoDate(display: string): string {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(display.trim())
  if (!m) return ''
  return `${m[3]}-${m[2]}-${m[1]}`
}

useHead(() => ({
  title: article.value
    ? `${article.value.title} — Новости`
    : SITE_TEXT.newsArticlePage.titleFallback
}))
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.news-article-page {
  padding-bottom: $spacing-3xl;
}

.news-article {
  max-width: 46rem;
  margin: 0 auto;

  &__header {
    margin-bottom: $spacing-lg;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-sm $spacing-md;
    margin: 0 0 $spacing-md;
    font-family: $font-ibm;
    font-size: $font-size-sm;
  }

  &__category {
    font-family: $font-inter-m;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    padding: 0.2rem 0.55rem;
    background: $color-lightBlue;
    border-radius: $radius-sm;
  }

  &__date {
    color: $color-text-muted;
  }

  &__title {
    margin: 0 0 $spacing-md;
    font-family: $font-ibm-m;
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: $font-weight-semibold;
    color: $color-black;
    line-height: $line-height-tight;
  }

  &__lead {
    margin: 0;
    font-family: $font-ibm;
    font-size: $font-size-lg;
    line-height: $line-height-relaxed;
    color: $color-text-body;
  }

  &__media {
    width: 100%;
    min-height: clamp(10rem, 28vw, 14rem);
    border-radius: $radius-xl;
    margin-bottom: $spacing-xl;
    box-shadow: $shadow-soft;

    &--accent-0 {
      background-image: linear-gradient(
        135deg,
        $color-darkBlue 0%,
        color-mix(in srgb, $color-darkBlue 55%, #2a7ab8) 100%
      );
    }

    &--accent-1 {
      background-image: linear-gradient(135deg, #0d4a7a 0%, #3b82c4 100%);
    }

    &--accent-2 {
      background-image: linear-gradient(135deg, #123970 0%, #5a9fd4 100%);
    }

    &--accent-3 {
      background-image: linear-gradient(135deg, #0a3058 0%, #1a6b9e 100%);
    }
  }

  &__content {
    margin-bottom: $spacing-2xl;
  }

  &__paragraph {
    margin: 0 0 $spacing-md;
    font-family: $font-ibm;
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $color-text-body;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__footer {
    padding-top: $spacing-lg;
    border-top: 1px solid $color-border;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    font-family: $font-ibm-m;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    text-decoration: none;
    transition: color $transition-fast;

    &:hover {
      color: $color-cta-hover;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    &:focus-visible {
      outline: 2px solid $color-darkBlue;
      outline-offset: 3px;
      border-radius: $radius-sm;
    }
  }
}
</style>
