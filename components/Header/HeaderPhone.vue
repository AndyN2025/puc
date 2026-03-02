<template>
  <div class="header__phone">
    <div class="header__phone-contact">
      <span class="header__phone-logo" v-html="logoRaw" />
      <span class="header__phone-text"><a :href="'tel:' + textFirst">{{ textFirst }}</a></span>
      <span class="header__phone-text"><a :href="'tel:' + textSecond">{{ textSecond }}</a></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoRaw from '@/assets/img/phoneIcon.svg?raw'

const props = defineProps<{
  textFirst: string;
  textSecond: string;
}>()
</script>

<style scoped>
.header__phone-contact{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    line-height: 18px;
    color: inherit; 
}

.header__phone-text a {
  color: inherit; 
  text-decoration: none;
}

.header__phone-logo :deep(svg) {
  width: 18px;
  height: auto;
  display: block;
  fill: currentColor;
}

.header__phone-logo :deep(path) {
  fill: currentColor;
  transition: fill 0.3s ease;
}
</style>