<template>
  <NuxtLink to="/" class="header__brand" aria-label="Перейти на главную">
    <span class="header__logo" v-html="logoRaw" />
    <span class="header__title">АНО ДПО<br/> "Приокский учебный центр"</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import logoRaw from '@/assets/img/logo-current.svg?raw'
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.header__brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  min-width: 0;
  flex: 0 1 auto;
  text-decoration: none;
  color: inherit;
}

.header__logo :deep(svg) {
  width: 40px;
  height: auto;
  display: block;
  fill: currentColor; 
}

.header__logo :deep(path) {
  fill: currentColor;
  transition: fill 0.3s ease;
}

.header__title {
  color: inherit;
  font-size: clamp(0.8125rem, 2vw, 1.125rem);
  line-height: 1.35;
  font-family: 'Inter SB', sans-serif;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 12rem;

  @media (min-width: 30rem) {
    max-width: min(100%, 22rem);
  }
}
</style>
