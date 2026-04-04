<template>
  <div class="partners-section">
    <h2 class="section-title">Нам доверяют</h2>
    <div
      class="slider-container"
      @mouseenter="pauseSlider"
      @mouseleave="resumeSlider"
    >
      <div class="slider-track" ref="trackRef">
        
        <div 
          v-for="(item, index) in duplicatedPartners" 
          :key="index" 
          class="partner-logo"
        >
          <img :src="item.image" :alt="item.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { partnerItems } from '@/utils/partnersUtils'

const trackRef = ref(null)
const animationId = ref(null)
const isPlaying = ref(false)
const speed = 0.8

const duplicatedPartners = computed(() => [...partnerItems, ...partnerItems])
let position = 0

const animate = () => {
  if (!isPlaying.value || !trackRef.value) return

  position -= speed
  const itemWidth = 90 + 24
  const totalWidth = partnerItems.length * itemWidth

  if (position <= -totalWidth) {
    position = 0
  }

  trackRef.value.style.transform = `translateX(${position}px)`
  animationId.value = requestAnimationFrame(animate)
}

const pauseSlider = () => {
  isPlaying.value = false
}

const resumeSlider = () => {
  isPlaying.value = true
  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  isPlaying.value = true
  animationId.value = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<style lang="scss" scoped>
.partners-section {
  padding: 24px 14px 40px 0;

  .section-title {
    text-align: start;
    font-size: 1.5rem;
    font-weight: 700;
    color: #123970;
    margin-bottom: 36px;
    position: relative;
  }

  .slider-container {
    overflow: hidden;
    white-space: nowrap;
    position: relative;

    .slider-track {
      display: flex;
      gap: 24px;
      width: max-content;
      will-change: transform;
    }

    .partner-logo {
      max-width: 180px;
      max-height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>