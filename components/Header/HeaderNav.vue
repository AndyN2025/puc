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

.header__nav{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  text-transform: uppercase;

  font-size: 16px;
  line-height: 24px;
}

.header__link{
  //color: $color-black;
  color: inherit;
}
</style>
