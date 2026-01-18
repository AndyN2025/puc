<template>
  <div class="hero-slider">
    <!-- Слайды -->
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

    <!-- Стрелки навигации -->
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

// Данные слайдов (можно вынести в отдельный файл или API)
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

// Функции управления слайдером
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

// Автоматическая смена слайдов
onMounted(() => {
  intervalId = setInterval(nextSlide, 3500) // каждые 6.5 секунд
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.hero-slider {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 620px;
  background-color: $color-border;
  overflow: hidden;
  border-radius: 10px;

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
            max-width: 1360px;
            width: 100%;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;

        .subtitle {
          font-size: 2.2rem;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 1px;
          color: white;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          color: white;
        }

        .cta-button {
          background-color: white;
          color: $color-darkBlue;
          border: none;
          padding: 1rem 1.75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin: 0 auto 36px;
          max-width: 216px;
          width: 100%;

          &:hover {
            background-color: #004494;
            color: white;
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
    border-radius: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    svg {
      width: 20px;
      height: 20px;
      stroke: white;
    }

    &.left {
      left: 20px;
    }

    &.right {
      right: 20px;
    }
  }
}
</style>