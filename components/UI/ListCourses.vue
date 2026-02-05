<template>
    <ul class="gridList">
        <li
          v-for="(item) in courseList"
          :key="item.id"
          class="gridList__item"
          @click="navigateTo(item.link)"
        >
          <div class="gridList__item-header">
            <h3 class="gridList__item-title">{{ item.title }}</h3>
            <div class="gridList__item-circle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          
          <div class="gridList__item-image-wrapper">
            <div
              class="gridList__item-image"
              :style="{ backgroundImage: `url(${item.image})` }"
            ></div>
          </div>
          
          <!-- Оверлей теперь НА ВСЮ ВЫСОТУ карточки -->
          <div class="gridList__item-overlay">
            <h3 class="gridList__item-overlay-title">{{ item.title }}</h3>
            <p class="gridList__item-text">{{ item.text }}</p>
          </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { courseList } from '@/utils/svedenUtils'

const navigateTo = (link: string) => {
  window.location.href = link
}
</script>

<style lang="scss" scoped>
.gridList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  &__item {
    width: 330px;
    height: 380px;
    background-color: white;
    border: 1px solid #a0d4f5;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      .gridList__item-overlay {
        transform: translateY(0);
      }
      
      .gridList__item-circle {
        background-color: white;
      }
      
      .gridList__item-image {
        transform: scale(1.05);
      }
    }

    .gridList__item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 22px;
      padding-bottom: 10px;
      position: relative;
      z-index: 1; 

      .gridList__item-title {
        font-size: 18px;
        line-height: 22px;
        font-family: 'Inter M', sans-serif;
        margin: 0;
        color: #123970;
        flex-grow: 1;
        max-width: 250px;
        min-height: 68px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .gridList__item-circle {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #123970;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
        flex-shrink: 0;
      }
    }

    .gridList__item-image-wrapper {
      position: relative;
      height: calc(100% - 80px);
      overflow: hidden;
    }

    .gridList__item-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: transform 0.5s ease;
    }

    /* ОВЕРЛЕЙ НА ВСЮ ВЫСОТУ КАРТОЧКИ */
    .gridList__item-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(18, 57, 112, 0.9);
      padding: 22px;
      transform: translateY(100%);
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 2;
      pointer-events: none;

      .gridList__item-overlay-title {
        font-size: 18px;
        line-height: 22px;
        font-family: 'Inter M', sans-serif;
        margin: 0 0 12px 0;
        color: white;
        min-height: 78px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .gridList__item-text {
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
        color: white;
        font-family: 'Inter', sans-serif;
        height: 90%;
        overflow: hidden;
      }
    }
  }
}
</style>