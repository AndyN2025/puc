<template>
  <div class="education-info">
    
    <div class="info-row" v-if="!hasChecklist">
      <div
        v-for="(block, index) in topBlocks"
        :key="index"
        class="info-card"
        :class="{
          'info-card--text': block.type === 'text'
        }"
      >
        <h3 class="info-title">{{ block.title }}</h3>


        
        <p class="info-text">
          {{ block.text }}
        </p>
      </div>
    </div>

    <div class="info-row" v-if="hasChecklist">
      <div
        class="info-card"
        :class="{'info-card--checklist': topBlocks[0].type === 'checklist'}"
      >
        <h3 class="info-title">{{ topBlocks[0].title }}</h3>

        
        <ul class="info-checklist">
          <li v-for="(item, idx) in topBlocks[0].items" :key="idx" class="info-checklist-item">
            <img class="checkmark" :src="checKIcon" aalt="галочка"/>
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="info-card__wrapper">
        <div
          v-for="(block, index) in topBlocks.slice(1, 3)"
          :key="index"
          class="info-card"
          :class="{'info-card--text': block.type === 'text'}"
          >
          <h3 class="info-title">{{ block.title }}</h3>

          
          <p class="info-text">
            {{ block.text }}
          </p>
        </div>
      </div>
    </div>

    
    <div class="diploma-block" v-if="diplomaImage !== 'none'">
      <div class="diploma-content">
        <h3 class="diploma-title" v-if="diplomaText">По окончании обучения Вы получаете:</h3>
        <div class="diploma-text" v-if="diplomaText">
          <p v-if="diplomaText" v-html="diplomaText"></p>
          <a
            :href="Polozhenie"
            target="_blank"
            rel="noopener noreferrer"
            class="pdf-link"
          >
            {{ pdfTitle || 'Положение об оказании платных образовательных услуг' }}
            <span class="pdf-size">(PDF, 4.6 МБ)</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12L12 8M12 8L8 4M12 8H4" stroke="#123970" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="diploma-image">
        <img
          v-if="typeof diplomaImage === 'string'"
          :src="diplomaImage"
          alt="Образец диплома"
        />

        <img
          v-else-if="Array.isArray(diplomaImage)"
          v-for="(img, index) in diplomaImage"
          :key="index"
          :src="img"
          :alt="`Образец диплома ${index + 1}`"
          class="diploma-image__item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import checKIcon from '@/assets/img/checkIcon.svg'
import Polozhenie from '@/assets/documents/paidEdu/Polozhenie_ob_okazanii_platnyh_obrazovatelnyh_uslug.pdf'

const props = withDefaults(defineProps<{
  topBlocks: {
    title: string
    type: 'checklist' | 'text'
    items?: string[]
    text?: string
  }[]
  diplomaText?: string
  pdfLink?: string
  pdfTitle?: string
  diplomaImage?: string | Array
}>(), {
  pdfLink: '#',
  pdfTitle: 'Положение об оказании платных образовательных услуг',
  diplomaImage: '@/assets/img/DiplomExmpl.png'
})

const hasChecklist = computed(() => {
  return props.topBlocks.some(block => block.type === 'checklist')
})

</script>

<style scoped lang="scss">
.education-info {
  margin-bottom: 80px;

  .info-row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .info-card {
      flex: 1;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #CAD6E0;

      &--checklist {
        background: #f0f7ff;

      }

      &--text {
        background: white;
      }

      &__wrapper{
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex: 1;
      }

      .info-title {
        font-size: 24px;
        color: #123970;
        margin: 0 0 24px 0;
        font-family: 'Inter M', sans-serif;
      }

      .info-text {
        font-size: 16px;
        font-family: 'IBM', sans-serif;
        color: #000000;
        line-height: 1.5;
        margin: 0;
        white-space: pre-line;
      }

      .info-checklist {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-family: 'IBM', sans-serif;
        color: #000000;
        line-height: 36px;
        display: flex;
        flex-direction: column;
        gap: 12px;


        .info-checklist-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 12px;

          .checkmark {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }

  .diploma-block {
    background: #123970;
    color: white;
    padding: 24px 40px 24px 24px;
    border-radius: 16px;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .diploma-content {
      flex: 1;
      max-width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      min-height: 360px;

      .diploma-title {
        font-size: 24px;
        font-family: 'Inter M', sans-serif;
        margin: 0 0 28px 0;
      }

      .diploma-text {
        p {
          font-family: 'IBM', sans-serif;
          font-size: 16px;
          line-height: 1.5;
          margin: 0 0 36px 0;
        }

        .pdf-link {
          display: inline-flex;
          align-items: center;
          color: #d0e6fa;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: color 0.2s;

          &:hover {
            color: white;
            text-decoration: underline;
          }

          .pdf-size {
            margin-left: 8px;
            font-size: 0.875rem;
            opacity: 0.8;
          }

          svg {
            margin-left: 4px;
            vertical-align: middle;
          }
        }
      }
    }

    .diploma-image {
      width: 360px;
      height: auto;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 16px;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }
}
</style>