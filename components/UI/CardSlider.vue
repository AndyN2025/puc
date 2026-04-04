<template>
  <div class="slider-container">
    
    <div class="slider-header">
      <DotTitle text="Виды обучения" v-if="props.dotShow"/>
      <div v-else></div>
      <div class="nav-controls">
        <button class="nav-btn left" @click="scrollLeft">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#123970" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-btn right" @click="scrollRight">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L10 8L6 12" stroke="#123970" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    
    <div
      ref="sliderContainer"
      class="cards-slider"
      @wheel.prevent="handleWheel"
    >
      <div
        v-for="(item, index) in courseList"
        :key="item.id"
        class="card"
        @click="navigateTo(item.link)"
      >
        <div class="card-header">
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="icon-circle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <p class="card-text">{{ item.text }}</p>
        <div
          class="card-image"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DotTitle from '@/components/UI/DotTitle.vue';
import { courseList } from '@/utils/svedenUtils'

const props = defineProps({
  dotShow: {
    type: Boolean,
    default: true
  },
})


const sliderContainer = ref(null)

const scrollLeft = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({
      left: -350,
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({
      left: 350,
      behavior: 'smooth'
    })
  }
}

const handleWheel = (e) => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({
      left: e.deltaY > 0 ? 100 : -100,
      behavior: 'smooth'
    })
  }
}
</script>

<style lang="scss" scoped>
.slider-container {
  padding: 6px;
  max-width: 100%;
  overflow-x: hidden;

  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #123970;
      position: relative;
    }

    .nav-controls {
      display: flex;
      gap: 8px;

      .nav-btn {
        width: 32px;
        height: 32px;
        border: 1px solid #a0d4f5;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #123970;
          svg path {
            stroke: white;
          }
        }
      }
    }
  }

  .cards-slider {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 8px 0; 
    scrollbar-width: none; 

    &::-webkit-scrollbar {
      display: none; 
    }

    .card {
      width: 330px;
      height: 480px;
      padding: 22px;
      background-color: white;
      border: 1px solid #a0d4f5;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .card-title{
        color: #123970;
        height: 72px;
      }


      &:hover {
        background-color: #123970;
        color: white;

        .card-title,
        .card-text {
          color: white;
        }
        .card-header .icon-circle{
          background-color: grey;
        }
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .card-title {
          font-size: 24px;
          font-family: 'Inter M', sans-serif;
          margin: 0;
          flex-grow: 1;
          max-width: 250px;
        }

        .icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #123970;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .card-text {
        font-size: 1rem;
        line-height: 1.2;
        margin: 0;
        color: inherit;
        max-height: 120px;
        overflow: hidden;
      }

      .card-image {
        width: 286px;
        height: 210px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        margin-top: auto;
      }
    }
  }
}
</style>