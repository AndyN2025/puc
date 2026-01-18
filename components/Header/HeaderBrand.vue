<template>
  <div class="header__brand">
    <img :src="logo" alt="Приокский учебный центр"/>
    <span class="header__title">Приокский учебный центр</span>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo.svg'
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.header__brand{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.header__title{
  color: $color-darkBlue;
  font-size: 18px;
  line-height: 24px;
  font-family: 'Inter SB', sans-serif;
}
</style>
