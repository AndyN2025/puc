<template>
  <div class="partners-section">
    <h2 class="section-title">{{ SITE_TEXT.partnerSlider.title }}</h2>
    <div class="slider-container">
      <div class="slider-track">
        <div
          v-for="(item, index) in duplicatedPartners"
          :key="`${item.id}-${index}`"
          class="partner-logo"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { partnerItems } from '@/utils/partnersUtils'
import { SITE_TEXT } from '@/utils/siteText'

const duplicatedPartners = [...partnerItems, ...partnerItems]
</script>

<style lang="scss" scoped>
@keyframes partners-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}

.partners-section {
  padding: 24px 14px 40px 0;

  .section-title {
    text-align: start;
    font-size: 1.5rem;
    font-weight: 700;
    color: #123970;
    margin-bottom: 36px;
    position: relative;
  }

  .slider-container {
    overflow: hidden;
    white-space: nowrap;
    position: relative;

    &:hover,
    &:focus-within {
      .slider-track {
        animation-play-state: paused;
      }
    }

    .slider-track {
      display: flex;
      gap: 24px;
      width: max-content;
      animation: partners-marquee 45s linear infinite;
      will-change: transform;
    }

    .partner-logo {
      flex: 0 0 90px;
      max-width: 180px;
      max-height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: block;
        max-width: 100%;
        max-height: 80px;
        object-fit: contain;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .partners-section {
    .slider-container {
      overflow-x: auto;
      white-space: normal;
    }

    .slider-track {
      animation: none;
      will-change: auto;
    }
  }
}
</style>