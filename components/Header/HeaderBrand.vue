<template>
  <NuxtLink to="/" class="header__brand" :aria-label="SITE_TEXT.header.brandAria">
    <span
      class="header__logo"
      :style="{ '--icon-url': `url(${logoUrl})` }"
      aria-hidden="true"
    />
    <span class="header__title">
      {{ SITE_TEXT.header.brandTitle.line1 }}<br />{{ SITE_TEXT.header.brandTitle.line2 }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/img/logo-current.svg'
import { SITE_TEXT } from '@/utils/siteText'
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

.header__logo {
  width: 30px;
  aspect-ratio: 529 / 800;
  display: block;
  flex: 0 0 auto;
  background-color: currentColor;
  mask-image: var(--icon-url);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  -webkit-mask-image: var(--icon-url);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
  transition: background-color 0.3s ease;
}

.header__title {
  color: inherit;
  font-size: clamp(0.75rem, 1.86vw, 1.05rem);
  line-height: 1.35;
  font-family: $font-ibm-m, sans-serif;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 12rem;

  @media (min-width: 30rem) {
    max-width: min(100%, 22rem);
  }
}
</style>
