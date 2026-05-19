<template>
  <ul class="courses" role="list">
    <li v-for="item in courseList" :key="item.id" class="courses__cell">
      <NuxtLink
        :to="item.link"
        class="course-card"
        :aria-label="SITE_TEXT.listCourses.courseAria(item.title)"
      >
        <span class="course-card__accent" aria-hidden="true" />

        <div class="course-card__media">
          <img
            class="course-card__image"
            :src="item.image"
            alt=""
            width="500"
            height="300"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div class="course-card__media-fade" aria-hidden="true" />
        </div>

        <div class="course-card__body">
          <h3 class="course-card__title">{{ item.title }}</h3>
          <p class="course-card__excerpt">{{ item.text }}</p>
          <span class="course-card__cta">
            <span class="course-card__cta-text">{{ SITE_TEXT.listCourses.cta }}</span>
            <span class="course-card__cta-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { courseList } from '@/utils/svedenUtils'
import { SITE_TEXT } from '@/utils/siteText'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.courses {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.125rem, 3vw, 1.75rem);
  width: 100%;
  min-width: 0;

  @include m.from($bp-sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include m.from($bp-lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include m.from($bp-xl) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__cell {
    min-width: 0;
  }
}

.course-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: $color-white;
  border-radius: $radius-xl;
  border: 1px solid $color-border-strong;
  box-shadow: $shadow-soft;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow $transition-base,
    transform $transition-base,
    border-color $transition-fast;

  &__accent {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      $color-darkBlue 0%,
      color-mix(in srgb, $color-darkBlue 65%, $color-cta-hover) 50%,
      $color-darkBlue 100%
    );
    z-index: 2;
    opacity: 0.95;
  }

  &:focus-visible {
    outline: 2px solid color-mix(in srgb, $color-darkBlue 55%, transparent);
    outline-offset: 3px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: $shadow-card;
      transform: translateY(-4px);
      border-color: color-mix(in srgb, $color-darkBlue 22%, $color-border-strong);

      .course-card__image {
        transform: scale(1.05);
      }

      .course-card__cta {
        color: $color-cta-hover;
      }

      .course-card__cta-icon {
        transform: translateX(4px);
      }

      .course-card__media-fade {
        opacity: 1;
      }
    }
  }
}

.course-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 3;
  flex-shrink: 0;
  overflow: hidden;
  background: color-mix(in srgb, $color-lightBlue 45%, $color-border);
}

.course-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.55s cubic-bezier(0.33, 1, 0.68, 1);
}

.course-card__media-fade {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 35%,
    color-mix(in srgb, $color-darkBlue 18%, transparent) 100%
  );
  opacity: 0.65;
  transition: opacity $transition-base;
}

.course-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: $spacing-sm;
  padding: clamp(1rem, 2.5vw, 1.35rem);
  padding-top: clamp(0.875rem, 2vw, 1.125rem);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, $color-lightBlue 22%, $color-white) 0%,
    $color-white 40%
  );
  min-width: 0;
}

.course-card__title {
  margin: 0;
  font-size: clamp(0.9375rem, 1.8vw, 1.125rem);
  line-height: 1.3;
  font-family: $font-ibm-m, sans-serif;
  font-weight: $font-weight-semibold;
  color: $color-darkBlue;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-card__excerpt {
  margin: 0;
  flex: 1;
  font-size: clamp(0.8125rem, 1.6vw, $font-size-sm);
  line-height: $line-height-body;
  font-family: $font-ibm, sans-serif;
  color: $color-text-body;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-card__cta {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  margin-top: auto;
  padding-top: $spacing-xs;
  font-family: $font-ibm-m, sans-serif;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-darkBlue;
  transition: color $transition-fast;
}

.course-card__cta-text {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in srgb, $color-darkBlue 35%, transparent);
}

.course-card__cta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform $transition-base;
}

@media (prefers-reduced-motion: reduce) {
  .course-card {
    transition: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: none;
      }
    }
  }

  .course-card__image,
  .course-card__cta-icon {
    transition: none;
  }
}
</style>
