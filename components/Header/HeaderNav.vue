<template>
  <nav class="header__nav">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="header__link"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ items: { label: string; to: string }[] }>()
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as m;

.header__nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  gap: clamp(0.4rem, 1.2vw, 1rem);
  min-width: 0;
  text-transform: uppercase;
  font-size: clamp(0.75rem, 0.65rem + 0.35vw, 0.875rem);
  line-height: 1.25;
  letter-spacing: 0.02em;

  @include m.until($bp-xl) {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    text-transform: none;
    font-size: $font-size-lg;
    letter-spacing: normal;
    line-height: $spacing-lg;
    gap: $spacing-sm;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $color-border;
  }
}

.header__link {
  color: inherit;
  padding: $spacing-xs 0;
  flex-shrink: 0;
  white-space: nowrap;

  @include m.until($bp-xl) {
    white-space: normal;
  }

  @include m.from($bp-xl) {
    padding: 0;
  }
}
</style>
