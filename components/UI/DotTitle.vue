<template>
  <h2 class="section-title" :class="{ 'is-small': size === 'small' }">
    <span class="dot"></span>
    <span class="title-text">{{ text }}</span>
  </h2>
</template>

<script setup>
import { SITE_TEXT } from '@/utils/siteText'

defineProps({
  text: {
    type: String,
    required: true,
    default: SITE_TEXT.dotTitle.defaultText
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'small'].includes(value)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  color: #123970;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;

  .dot {
    width: 10px;
    height: 10px;
    background-color: #123970;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .title-text {
    position: relative;
    font-size: 16px;
    font-family: $font-ibm-m, sans-serif;
    line-height: 24px;
    letter-spacing: -0.5px;
  }

  &.is-small {
    font-size: 0.9375rem;
    margin-bottom: 12px;

    .dot {
      width: 6px;
      height: 6px;
    }
  }

  @include m.until(800px) {
    margin-bottom: 1rem;

    .title-text {
      font-size: 0.875rem;
      line-height: 1.35;
    }

    .dot {
      width: 8px;
      height: 8px;
    }
  }
}
</style>