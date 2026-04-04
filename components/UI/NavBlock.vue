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
</style>
