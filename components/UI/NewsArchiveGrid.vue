<template>
  <ul class="news-archive" role="list">
    <li
      v-for="item in items"
      :key="item.slug"
      class="news-archive__cell"
    >
      <NuxtLink
        :to="`/news/${item.slug}`"
        class="news-archive__card"
      >
        <div
          class="news-archive__media"
          :class="`news-archive__media--accent-${item.accent ?? 0}`"
          aria-hidden="true"
        />
        <div class="news-archive__body">
          <div class="news-archive__meta">
            <span class="news-archive__category">{{ item.category }}</span>
            <time
              class="news-archive__date"
              :datetime="isoDate(item.date)"
            >{{ item.date }}</time>
          </div>
          <h2 class="news-archive__title">{{ item.title }}</h2>
          <p class="news-archive__excerpt">{{ item.excerpt }}</p>
          <span class="news-archive__cta">{{ SITE_TEXT.newsIndexPage.readFull }}</span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { NewsArticle } from '@/data/news'
import { SITE_TEXT } from '@/utils/siteText'

defineProps<{
  items: NewsArticle[]
}>()

function isoDate(display: string): string {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(display.trim())
  if (!m) return ''
  return `${m[3]}-${m[2]}-${m[1]}`
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.news-archive {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem);

  @include m.from($bp-sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include m.from($bp-xl) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &__cell {
    min-width: 0;
    display: flex;
  }

  &__card {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    text-decoration: none;
    color: inherit;
    background: $color-white;
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    box-shadow: $shadow-soft;
    overflow: hidden;
    transition:
      box-shadow $transition-base,
      border-color $transition-base,
      transform $transition-fast;

    &:hover {
      box-shadow: $shadow-card;
      border-color: color-mix(in srgb, $color-darkBlue 28%, $color-border);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid $color-darkBlue;
      outline-offset: 3px;
    }
  }

  &__media {
    flex-shrink: 0;
    min-height: clamp(7.5rem, 22vw, 10rem);
    width: 100%;
    background-size: cover;
    background-position: center;

    &--accent-0 {
      background-image: linear-gradient(
        135deg,
        $color-darkBlue 0%,
        color-mix(in srgb, $color-darkBlue 55%, #2a7ab8) 100%
      );
    }

    &--accent-1 {
      background-image: linear-gradient(
        135deg,
        #0d4a7a 0%,
        #3b82c4 100%
      );
    }

    &--accent-2 {
      background-image: linear-gradient(
        135deg,
        #123970 0%,
        #5a9fd4 100%
      );
    }

    &--accent-3 {
      background-image: linear-gradient(
        135deg,
        #0a3058 0%,
        #1a6b9e 100%
      );
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: clamp(1rem, 2.5vw, 1.35rem);
    gap: $spacing-sm;
    min-width: 0;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-sm $spacing-md;
  }

  &__category {
    font-family: $font-inter-m;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    line-height: 1.3;
    padding: 0.2rem 0.55rem;
    background: $color-lightBlue;
    border-radius: $radius-sm;
  }

  &__date {
    font-family: $font-ibm;
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__title {
    margin: 0;
    font-family: $font-ibm-m;
    font-size: clamp(1rem, 1.5vw + 0.75rem, 1.2rem);
    font-weight: $font-weight-semibold;
    color: $color-black;
    line-height: $line-height-tight;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__excerpt {
    margin: 0;
    flex: 1;
    font-family: $font-ibm;
    font-size: $font-size-sm;
    line-height: $line-height-body;
    color: $color-text-body;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__cta {
    margin-top: auto;
    padding-top: $spacing-sm;
    font-family: $font-ibm-m;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    transition: color $transition-fast;
  }

  &__card:hover &__cta {
    color: $color-cta-hover;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
