<template>
  <div class="hero-slider">
    
    <div class="slides-container" ref="slidesContainer">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
        :class="{ active: currentIndex === index }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="slide-content">
          <h2 class="subtitle">{{ slide.subtitle }}</h2>
          <h1 class="title">{{ slide.title }}</h1>
          <a class="cta-button" :href="slide.link">
            {{ slide.buttonText }}
          </a>
        </div>
      </div>
    </div>

    
    <button class="nav-arrow left" @click="prevSlide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <button class="nav-arrow right" @click="nextSlide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import slideProm from '@/assets/img/mainSlider/slide-prom.webp'
import slideMore from '@/assets/img/mainSlider/slide-more.webp'
import slideProf from '@/assets/img/mainSlider/slide-prof.webp'
import slideFire from '@/assets/img/mainSlider/slide-fire.webp'

const slides = ref([
  {
    image: slideProm,
    subtitle: 'ПРОГРАММЫ ДПО',
    title: 'ПРОМЫШЛЕННАЯ БЕЗОПАСНОСТЬ',
    buttonText: 'СМОТРЕТЬ КУРС',
    courseId: 'industrial-safety',
    link: `/training_programs/industrial_safety/`
  },
  {
    image: slideFire,
    subtitle: 'Профессиональная переподготовка',
    title: 'Специалист по пожарной безопасности',
    buttonText: 'СМОТРЕТЬ КУРС',
    courseId: 'industrial-safety',
    link: `/training_programs/fire_safety/`
  },
  {
    image: slideMore,
    subtitle: 'предаттестационная подготовка',
    title: 'более 20 направлений',
    buttonText: 'СМОТРЕТЬ КУРС',
    courseId: 'industrial-safety',
    link: `/training_programs/tematicheskie_seminary/`
  },
    {
    image: slideProf,
    subtitle: 'ПРОГРАММЫ ДПО',
    title: 'ПРОМЫШЛЕННАЯ БЕЗОПАСНОСТЬ',
    buttonText: 'СМОТРЕТЬ КУРС',
    courseId: 'industrial-safety',
    link: `/training_programs/professional_education/`
  },
])

const currentIndex = ref(0)
let intervalId = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 4500)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as m;

.hero-slider {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: clamp(22rem, 65vw, 38.75rem);
  min-height: 20rem;
  background-color: $color-border;
  overflow: hidden;
  border-radius: $radius-lg;

  .slides-container {
    width: 100%;
    height: 100%;
    position: relative;

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      color: white;
      text-align: center;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: auto; 
      }

      .slide-content {
            max-width: 85rem;
            width: 100%;
            padding-top: 0;
            padding-bottom: 0;
            @include m.container-padding;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;

        .subtitle {
          font-size: clamp(0.95rem, 2.5vw, 1.375rem);
          font-weight: $font-weight-regular;
          line-height: $line-height-tight;
          letter-spacing: 0.06em;
          color: $color-white;
          margin-bottom: $spacing-sm;
          text-transform: uppercase;
        }

        .title {
          font-size: clamp(1.35rem, 4vw, 3.5rem);
          font-weight: $font-weight-semibold;
          margin-bottom: $spacing-lg;
          text-transform: uppercase;
          color: $color-white;
          line-height: $line-height-tight;
          padding: 0 $spacing-sm;
        }

        .cta-button {
          background-color: $color-white;
          color: $color-darkBlue;
          border: none;
          padding: $spacing-md 1.75rem;
          font-size: $font-size-base;
          line-height: $line-height-body;
          border-radius: $radius-xl;
          cursor: pointer;
          transition: background-color $transition-slow;
          margin: 0 auto clamp(1.25rem, 4vw, 2.25rem);
          max-width: 13.5rem;
          width: 100%;

          &:hover {
            background-color: $color-cta-hover;
            color: $color-white;
          }
        }
      }
    }
  }

  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: 2px dashed rgba(255, 255, 255, 0.5);
    border-radius: $radius-md;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background $transition-slow;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      stroke: $color-white;
    }

    &.left {
      left: clamp(0.5rem, 2vw, 1.25rem);
    }

    &.right {
      right: clamp(0.5rem, 2vw, 1.25rem);
    }

    @include m.until($bp-sm) {
      width: 2rem;
      height: 2rem;
      padding: 0;

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>