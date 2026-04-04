<template>
  <h2 class="section-title" :class="{ 'is-small': size === 'small' }">
    <span class="dot"></span>
    <span class="title-text">{{ text }}</span>
  </h2>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: 'ЧТО НОВОГО?'
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'small'].includes(value)
  }
})
</script>

<style lang="scss" scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  color: #123970;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;

  .dot {
    width: 10px;
    height: 10px;
    background-color: #123970;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .title-text {
    position: relative;
    font-size: 16px;
    font-family: 'Inter M', sans-serif;
    line-height: 24px;
    letter-spacing: -0.5px;
  }

  &.is-small {
    font-size: 0.9375rem;
    margin-bottom: 12px;

    .dot {
      width: 6px;
      height: 6px;
    }
  }
}
</style>