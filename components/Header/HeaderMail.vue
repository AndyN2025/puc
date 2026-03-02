<template>
  <div class="header__mail">
    <div class="header__mail-contact">
      <!-- <img :src="icon" alt="Электронная почта" /> -->
      <span class="header__mail-logo" v-html="mailIcon" />
      <a :href="link" class="header__mail-text">{{ text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import mailIcon from '@/assets/img/mailIcon.svg?raw'

defineProps<{
  text: string;
  link: string;
}>()
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.header__mail {
  display: flex;
  align-items: center;
  color: inherit;

  &-contact{
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &-text{
    color: inherit;
    font-size: 14px;
    line-height: 18px;
  }

  &-logo :deep(svg) {
    width: 18px;
    height: auto;
    display: block;
    fill: currentColor;
  }

  &-logo :deep(path) {
    fill: currentColor;
    transition: fill 0.3s ease;
  }
}
</style>