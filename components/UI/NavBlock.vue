<template>
  <div class="site-navigation">
    <div class="nav-grid">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.link"
        class="nav-item"
        :class="{ 'is-active': index === activeIndex }"
      >
        {{ item.text }}
      </NuxtLink>
    </div>
    <p class="nav-scroll-hint">
      <span class="nav-scroll-hint__icon" aria-hidden="true">↔</span>
      Свайпните, чтобы посмотреть все разделы
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      return items.every(item =>
        typeof item.text === 'string' &&
        typeof item.link === 'string'
      )
    }
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => null
  },
  modelValue: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const currentTab = ref(props.modelValue ?? (props.tabs?.[0]?.value ?? null))

function setTab(value) {
  currentTab.value = value
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.tabs-container {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
  flex-wrap: wrap;
}

.tab-button {
  padding: $spacing-sm $spacing-xl;
  max-width: 11.25rem;
  width: 100%;
  background: $color-lightBlue;
  border-radius: $radius-xl $radius-xl 0 0;
  cursor: pointer;
  font-size: $font-size-base;
  color: $color-text-body;
  transition: background-color $transition-fast, color $transition-fast;
  border: none;

  &:hover {
    background-color: $color-darkBlue;
    color: $color-white;
  }

  &.tab-active {
    background-color: $color-darkBlue;
    color: $color-white;
  }
}

.site-navigation {
  margin-bottom: clamp(2rem, 5vw, 3.75rem);

  .nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    background-color: $color-bg-nav;
    padding: clamp(1rem, 3vw, 1.5rem);
    border-radius: $radius-md;
    margin-bottom: $spacing-xl;

    .nav-item {
      display: inline-block;
      padding: $spacing-sm $spacing-md;
      margin: 2px $spacing-sm;
      border-radius: $radius-sm;
      text-align: center;
      font-size: 0.9375rem;
      color: $color-text-body;
      text-decoration: none;
      transition: background-color $transition-fast, color $transition-fast;
      cursor: pointer;

      &:hover {
        background-color: $color-darkBlue;
        color: $color-white;
      }

      &.is-active {
        background-color: $color-darkBlue;
        color: $color-white;
        box-shadow: $shadow-soft;

        &:hover {
          background-color: $color-cta-hover;
        }
      }
    }
  }
}

@include m.until($bp-md) {
  .site-navigation {
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
    padding-inline: 10px;

    .nav-grid {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      scroll-snap-type: x mandatory;
      background: linear-gradient(180deg, $color-bg-nav 0%, color-mix(in srgb, $color-bg-nav 86%, $color-white) 100%);
      border: 1px solid color-mix(in srgb, $color-darkBlue 12%, $color-white);
      border-radius: $radius-xl;
      box-shadow: $shadow-soft;
      padding: 0.5625rem;
      margin-bottom: $spacing-sm;
      gap: $spacing-xs;

      &::-webkit-scrollbar {
        display: none;
      }

      .nav-item {
        flex: 0 0 auto;
        scroll-snap-align: start;
        white-space: nowrap;
        margin: 0;
        padding: 0.625rem 0.9rem;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, $color-darkBlue 14%, $color-white);
        background: $color-white;
        font-size: 0.875rem;
        line-height: 1.2;
        transition:
          background-color $transition-fast,
          color $transition-fast,
          border-color $transition-fast,
          transform $transition-fast;

        &:active {
          transform: translateY(1px);
        }
      }
    }
  }

  .nav-scroll-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
    padding: 0.3rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, $color-lightBlue 60%, $color-white);
    color: $color-darkBlue;
    font-size: 0.75rem;
    line-height: 1.2;
    border: 1px solid color-mix(in srgb, $color-darkBlue 10%, $color-white);
  }

  .nav-scroll-hint__icon {
    font-size: 0.85rem;
    line-height: 1;
    opacity: 0.8;
  }
}

@include m.from($bp-md) {
  .nav-scroll-hint {
    display: none;
  }
}
</style>
