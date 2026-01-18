<template>
  <h2 class="documents-title">
    {{ text }}
  </h2>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.documents-title {
  font-family: 'Inter-SB', sans-serif;
  font-size: 1.7rem;
  color: #123970;
  letter-spacing: -0.5px;
  margin: 0 0 24px 0;
  line-height: 1.2;
}
</style>