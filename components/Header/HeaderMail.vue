<template>
  <div class="header__mail">
    <div class="header__mail-contact">
      <img :src="icon" alt="Электронная почта" />
      <a :href="link" class="header__mail-text">{{ text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  text: string;
  link: string;
}>()
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.header__mail {
  display: flex;
  align-items: center;

  &-contact{
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &-text{
    color: $color-black;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>