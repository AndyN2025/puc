<template>
  <div class="header__brand">
     <!--<img :src="logoWhite" alt="Приокский учебный центр"/>-->
    <span class="header__logo" v-html="logoRaw" />
    <span class="header__title">АНО ДПО<br/> "Приокский учебный центр"</span>
  </div>
</template>

<script setup lang="ts">
import logoWhite from '@/assets/img/logo-current.svg'
import logoRaw from '@/assets/img/logo-current.svg?raw'
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.header__brand{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  // img{
  //    width: 40px;
  // }
}

.header__logo :deep(svg) {
  width: 40px;
  height: auto;
  display: block;
  fill: currentColor; /* <-- Магия работает здесь */
}

.header__logo :deep(path) {
  fill: currentColor;
  transition: fill 0.3s ease;
}

.header__title{
  color: inherit;
  font-size: 18px;
  line-height: 24px;
  font-family: 'Inter SB', sans-serif;
}
</style>
