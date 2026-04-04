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
  flex-wrap: wrap;
  gap: $spacing-md;
  text-transform: uppercase;
  font-size: $font-size-base;
  line-height: $spacing-lg;

  @include m.until($bp-lg) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    text-transform: none;
    font-size: $font-size-lg;
    gap: $spacing-sm;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $color-border;
  }
}

.header__link {
  color: inherit;
  padding: $spacing-xs 0;

  @include m.from($bp-lg) {
    padding: 0;
  }
}
</style>
