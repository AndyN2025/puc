<template>
  <div class="header__phone">
    <div class="header__phone-contact">
      <img :src="icon" alt="Номер телефона" />
      <span class="header__phone-text"><a :href="'tel:' + textFirst">{{ textFirst }}</a></span>
      <span class="header__phone-text"><a :href="'tel:' + textSecond">{{ textSecond }}</a></span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
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
}

.header__phone-text{
  a{
    color: black;
  }
}
</style>