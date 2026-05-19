<template>
  <div class="header__mail">
    <div class="header__mail-contact">
      
      <img
        class="header__mail-logo"
        :src="mailIconUrl"
        alt=""
        aria-hidden="true"
      >
      <a :href="link" class="header__mail-text">{{ text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import mailIconUrl from '@/assets/img/mailIcon.svg'

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
    font-size: 15px;
    line-height: 18px;
  }

  &-logo {
    width: 15px;
    height: 15px;
    display: block;
    flex: 0 0 auto;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }
}

:global(.header--solid) .header__mail-logo {
  filter: brightness(0) saturate(100%) invert(17%) sepia(72%) saturate(1232%) hue-rotate(190deg) brightness(91%) contrast(96%);
}
</style>