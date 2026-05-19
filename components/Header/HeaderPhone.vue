<template>
  <div class="header__phone">
    <div class="header__phone-contact">
      <img
        class="header__phone-logo"
        :src="phoneIconUrl"
        alt=""
        aria-hidden="true"
      >
      <!-- <span class="header__phone-text"><a :href="'tel:' + textFirst">{{ textFirst }}</a></span> -->
      <span class="header__phone-text"><a :href="'tel:' + textSecond">{{ textSecond }}</a></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import phoneIconUrl from '@/assets/img/phoneIcon.svg'

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
    font-size: 15px;
    line-height: 18px;
    color: inherit; 
}

.header__phone-text a {
  color: inherit; 
  text-decoration: none;
}

.header__phone-logo {
  width: 15px;
  height: 15px;
  display: block;
  flex: 0 0 auto;
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

:global(.header--solid) .header__phone-logo {
  filter: brightness(0) saturate(100%) invert(17%) sepia(72%) saturate(1232%) hue-rotate(190deg) brightness(91%) contrast(96%);
}
</style>