<template>
  <ul class="courses">
    <li v-for="item in courseList" :key="item.id" class="courses__cell">
      <NuxtLink :to="item.link" class="course-card">
        <div class="course-card__top">
          <h3 class="course-card__title">{{ item.title }}</h3>
          <span class="course-card__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 8H12M12 8L8 4M12 8L8 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div class="course-card__media">
          <div
            class="course-card__image"
            :style="{ backgroundImage: `url(${item.image})` }"
          />
          <div class="course-card__shine" aria-hidden="true" />
        </div>

        <div class="course-card__overlay">
          <h3 class="course-card__overlay-title">{{ item.title }}</h3>
          <p class="course-card__text">{{ item.text }}</p>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { courseList } from '@/utils/svedenUtils'
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
  gap: clamp(1rem, 3vw, 1.5rem);
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
  width: 100%;
  min-height: clamp(17.5rem, 52vw, 22rem);
  background: $color-white;
  border-radius: $radius-lg;
  border: 1px solid rgba($color-darkBlue, 0.12);
  box-shadow: $shadow-soft;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow $transition-base,
    transform $transition-base,
    border-color $transition-fast;

  &:focus-visible {
    outline: 2px solid rgba($color-darkBlue, 0.45);
    outline-offset: 3px;
  }

  &:hover,
  &:focus-visible {
    box-shadow: $shadow-card;
    transform: translateY(-3px);
    border-color: rgba($color-darkBlue, 0.2);

    .course-card__overlay {
      transform: translateY(0);
      opacity: 1;
    }

    .course-card__image {
      transform: scale(1.06);
    }

    .course-card__icon {
      background: $color-white;
      color: $color-darkBlue;
      transform: scale(1.05);

      svg {
        transform: translateX(2px);
      }
    }

    .course-card__shine {
      opacity: 0.35;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: clamp(1rem, 2.5vw, 1.375rem);
    padding-bottom: $spacing-sm;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  &__title {
    margin: 0;
    font-size: clamp(0.9375rem, 2.2vw, 1.125rem);
    line-height: 1.3;
    font-family: $font-inter-m, sans-serif;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    flex: 1;
    min-width: 0;
    min-height: 2.6em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__icon {
    flex-shrink: 0;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: $color-darkBlue;
    color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color $transition-base,
      color $transition-base,
      transform $transition-base;

    svg {
      display: block;
      transition: transform $transition-base;
    }
  }

  &__media {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    margin: 0 clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.5rem, 1.5vw, 0.75rem);
    border-radius: $radius-md;
  }

  &__image {
    width: 100%;
    height: 100%;
    min-height: clamp(9rem, 28vw, 12rem);
    background-size: cover;
    background-position: center;
    transition: transform 0.55s cubic-bezier(0.33, 1, 0.68, 1);
  }

  &__shine {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba($color-white, 0) 40%,
      rgba($color-white, 0.15) 50%,
      rgba($color-white, 0) 60%
    );
    opacity: 0;
    transition: opacity $transition-slow;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba($color-darkBlue, 0.88) 0%,
      rgba($color-darkBlue, 0.96) 100%
    );
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    padding: clamp(1rem, 2.5vw, 1.375rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 2;
    transform: translateY(100%);
    opacity: 0.98;
    transition:
      transform 0.45s cubic-bezier(0.33, 1, 0.68, 1),
      opacity $transition-base;
    pointer-events: none;
  }

  &__overlay-title {
    margin: 0 0 $spacing-sm;
    font-size: clamp(0.9375rem, 2.2vw, 1.125rem);
    line-height: 1.3;
    font-family: $font-inter-m, sans-serif;
    font-weight: $font-weight-semibold;
    color: $color-white;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__text {
    margin: 0;
    font-size: $font-size-sm;
    line-height: $line-height-body;
    font-family: $font-inter, sans-serif;
    color: rgba($color-white, 0.95);
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (prefers-reduced-motion: reduce) {
  .course-card {
    transition: none;

    &:hover,
    &:focus-visible {
      transform: none;
    }

    .course-card__image,
    .course-card__overlay,
    .course-card__icon svg {
      transition: none;
    }
  }
}
</style>
