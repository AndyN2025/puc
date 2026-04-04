<template>
  <div class="accordion-item" :class="{ 'accordion-item--open': isOpen }">
    
    <div class="accordion-item__header" @click="toggle">
      <div class="accordion-item__title">{{ title }}</div>
      <div class="accordion-item__text">
        <div v-if="tags && tags.length" class="accordion-item__tags">
            <span v-for="(tag, idx) in tags" :key="idx" class="accordion-item__tag">
            {{ tag }}
            </span>
        </div>
        <button class="accordion-item__toggle-btn" :aria-expanded="isOpen">
          <img
            :src="arrowD"
            class="accordion-item__toggle-btn__img"
            :class="{ 'accordion-item__toggle-btn__img--rotated': isOpen }"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    
    <div class="accordion-item__content" ref="contentRef">
      <slot v-if="isOpen"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import arrowD from '@/assets/img/common/arrowD.svg'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array as () => string[],
    default: () => []
  }
})

const isOpen = ref(false)
const contentRef = ref<HTMLElement | null>(null)

const toggle = async () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    await nextTick()
    const height = contentRef.value?.scrollHeight || 0
    contentRef.value!.style.height = `${height}px`
  } else {
    const height = contentRef.value?.scrollHeight || 0
    contentRef.value!.style.height = `${height}px`
    await nextTick()
    contentRef.value!.style.height = '0px'
  }
}

const onTransitionEnd = (e: TransitionEvent) => {
  if (e.propertyName === 'height' && !isOpen.value) {
    contentRef.value!.style.height = ''
  }
}

if (contentRef.value) {
  contentRef.value.addEventListener('transitionend', onTransitionEnd)
}
</script>

<style scoped lang="scss">
.accordion-item {
  border: 1px solid #123970;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  padding: 22px 22px 8px;
  margin-bottom: 24px;

  &--open {
    .accordion-item__header {
      border-bottom: 1px solid #d1d5db;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  &__title {
    font-size: 27px;
    line-height: 1.1;
    font-family: 'Inter SB', sans-serif;
    color: black;
    flex-grow: 1;
  }

  &__text{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
  }

  &__tags {
    display: flex;
    gap: 8px;
    max-width: 90%;
  }

  &__tag {
    background: #E9F4FF;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #000000;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM', sans-serif;
  }

  &__toggle-btn {
    background: #000F4E;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;

    &__img{
      width: 14px;
      height: 10px;
      transition: transform 0.3s ease;
      display: block;
    }
    &__img--rotated {
      transform: rotate(180deg);
    }
  }

  &__content {
    padding: 0;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    height: 0;

    &:not(:empty) {
      padding: 20px;
    }
  }
}
</style>