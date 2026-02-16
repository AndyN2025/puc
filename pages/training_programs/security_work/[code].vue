<template>
    <Breadcrumbs :items="breadCrumbs" />
    <div v-if="course" class="course-detail__info info">
        <h1 v-if="course" class="course-detail__title">{{ course.title }}</h1>
        <h1 v-else class="course-detail__title">Курс не найден</h1>

        <!-- Основное описание на всю ширину -->
        <div class="info__item info__item--full-width description">
            <p class="info__value">{{ course.mainDescription }}</p>
        </div>

        <!-- Категории слушателей -->
        <div class="info__item users">
            <p class="info__title">Категории слушателей:</p>
            <div class="info__value">
                <ul class="info__users-list">
                    <li v-for="(user, index) in course.users" :key="index" class="info__users-item">
                        <img :src="checkIkon"/>
                        <span>{{ user }}</span>
                    </li>
                </ul>
            </div>
        </div>


        <div class="info__item requiremets" v-if="course.requiremets">
            <p class="info__title">Требования к слушателям:</p>
            <div class="info__value">
                <ul class="info__users-list">
                    <li v-for="(user, index) in course.requiremets" :key="index" class="info__users-item">
                        <img :src="checkIkon"/>
                        <span>{{ user }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Продолжительность -->
        <div class="info__item time">
            <p class="info__title">Продолжительность обучения:</p>
            <p class="info__value">{{ course.hours }} часа</p>
        </div>

        <!-- Форма обучения -->
        <div class="info__item format" v-if="course.format">
            <p class="info__title">Форма обучения:</p>
            <p class="info__value">{{ course.format }}</p>
        </div>

        <!-- Получаемый документ -->
        <div class="info__item document">
            <p class="info__title">Получаемый документ:</p>
            <div class="info__value">
              <template v-if="Array.isArray(course.document) && course.document.length">
                <ul class="info__value-list" >
                  <li 
                    class="info__value-item" 
                    v-for="document in course.document"
                    :key="document">
                    {{ document }}
                  </li>
                </ul>
              </template>


              <p v-else>{{ course.document }}</p>

              <div v-if="Array.isArray(course.img)" class="images-row">
                <div 
                  v-for="(img, index) in course.img" 
                  :key="index"
                  class="image-wrapper"
                  @click="openModal(img)"
                >
                  <img
                    :src="img"
                    :alt="`Изображение ${index + 1}`"
                    class="info__image"
                  />
                  <div class="zoom-overlay">
                    <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Если одно изображение -->
              <div v-else class="image-wrapper" @click="openModal(course.img)">
                <img
                  :src="course.img"
                  :alt="`Образец документа: ${course.document}`"
                  class="info__image"
                />
                <div class="zoom-overlay">
                  <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                  </svg>
                </div>
              </div>
            </div>
        </div>

        <!-- Периодичность (если есть) -->
        <div v-if="course.period" class="info__item period">
            <p class="info__title">Периодичность обучения:</p>
            <p class="info__value">{{ course.period }}</p>
        </div>

        <div class="info__item info__item--full-width button-container" style="margin-bottom: 16px;">
          <div class="buttons-group">
            <button 
                class="info__action-btn info__action-btn--secondary"
                @click="downloadApplication"
                :disabled="!course?.application"
              >
                Заявка на обучение
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right:8px">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </button>
            <button 
                class="info__action-btn info__action-btn--primary"
                @click="openShortInfo"
                :disabled="!course?.programm"
              >
                Получить программу *

                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right:8px">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </button>
          </div>
            <p class="info__hint">
              * Полную программу обучения уточняйте у менеджера по 
              <span 
                class="info__phone-highlight"
                @mouseenter="showPhoneTooltip = true"
                @mouseleave="showPhoneTooltip = false"
              >
                телефону
                <div 
                  v-if="showPhoneTooltip" 
                  class="info__phone-tooltip"
                  @mouseenter="showPhoneTooltip = true"
                  @mouseleave="showPhoneTooltip = false"
                >
                  <a href="tel:+74842562183" class="info__phone-link">+7 (4842) 56-21-83</a>
                  <a href="tel:+74842597583" class="info__phone-link">+7 (4842) 59-75-83</a>
                  <a href="tel:+79105201564" class="info__phone-link">+7 (910) 520-15-64</a>
                </div>
              </span>
            </p>
        </div>

        <!-- Кнопка на всю ширину -->
        <div class="info__item info__item--full-width button-container">
            <button class="info__back-btn" @click="$router.back()">Назад к списку</button>
        </div>



        <div v-if="showModal" class="image-modal" @click.self="showModal = false">
          <div class="modal-content">
            <button class="modal-close" @click="showModal = false">×</button>
            <img
              :src="selectedImage"
              :alt="`Образец документа: ${course.document}`"
              class="modal-image"
            />
          </div>
        </div>

        <ConsultationWidget ref="widgetRef" :delay="5000" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { programsOnline, programsOffline } from './utils'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import ConsultationWidget from '@/components/UI/ConsultantWidget.vue'
import checkIkon from '@/assets/img/checkIcon.svg'

const securityWorkPrograms = [
    ...programsOffline,
    ...programsOnline
]

const route = useRoute()
const code = route.params.code
const showModal = ref(false)
const selectedImage = ref('')
const showPhoneTooltip = ref(false) 

const widgetRef = ref(null)

const showConsultation = () => {
  widgetRef.value?.showWidget()
}

const hideConsultation = () => {
  widgetRef.value?.hideWidget()
}

const openModal = (img) => {
  selectedImage.value = img
  showModal.value = true
}

const course = computed(() => {
    return securityWorkPrograms.find(p => p.code === code)
})

const breadCrumbs = computed(() => {
    const crumbs = [
        { text: 'Главная', link: '/' },
        { text: 'Виды обучения', link: '/training_programs/' },
        { text: 'Охрана труда', link: '/training_programs/security_work' }
    ]

    if (course.value) {
        crumbs.push({
            text: course.value.textCode || course.value.title,
            link: route.path // или конкретный путь к курсу
        })
    }

    return crumbs
})

const downloadApplication = () => {
  if (!course.value?.application) {
    alert('Файл заявки не найден для этого курса')
    return
  }

  const link = document.createElement('a')
  link.href = course.value.application
  link.download = `Заявка_${course.value.code || 'на_обучение'}.doc`  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert('Программа обучения не найдена для этого курса')
    return
  }

  const link = document.createElement('a')
  link.href = course.value.programm
  link.download = `Программа_${course.value.code || 'обучения'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

watch(showModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped lang="scss">
.course-detail {
  margin: 2rem auto;
  padding: 1rem;

  &__title {
    color: #123970;
    font-size: 18px;
    font-family: 'IBM M';
    margin-bottom: 12px;
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__item {
    background: #f8fcff;
    border-radius: 10px;
    padding: 1.6rem;
    display: grid;
    grid-template-columns: 1fr 4fr; // Заголовок занимает 1 часть, значение - 2 части
    gap: 16px;
    align-items: start;

    &--full-width {
      grid-template-columns: 1fr; // На всю ширину - одна колонка
    }

  }

  &__title {
    font-weight: 600;
    margin: 0;
    color: #123970;
    font-family: 'IBM M';
    font-size: 1rem;
  }

  &__value {
    margin: 0;
    line-height: 1.6;
    color: #333;

    > p {
      margin: 0 0 8px 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__users-list {
    margin: 0;
    list-style-type: disc;
    line-height: 1.8;
    }
    &__users-item{
        margin-bottom: 4px;
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: flex-start;

        &:last-child {
            margin-bottom: 0;
        }
    }

  &__document-img {
    margin-top: 12px;
    text-align: center;
  }

  &__image {
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    display: block;
  }

  &__back-btn,
  &__action-btn {
    padding: 12px 24px;
    background-color: #123970;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'IBM M';
    transition: background-color 0.2s;

    &:hover {
      background-color: #0d2a54;
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.buttons-group{
  display: flex;
  gap: 18px;
}

.info__hint {
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-secondary, #666);
}

.info__phone-highlight {
  position: relative;
  color: var(--primary-color, #0066cc);
  font-weight: 600;
  cursor: help;
  text-decoration: underline dotted;
  transition: color 0.2s ease;
}

.info__phone-highlight:hover {
  color: var(--primary-hover, #0052a3);
}

.info__phone-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 200px;
  z-index: 1000;
  margin-bottom: 8px;
  animation: fadeIn 0.2s ease;
}

.info__phone-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0;
  border-style: solid;
  border-color: white transparent transparent;
}

.info__phone-link {
  display: block;
  color: var(--primary-color, #0066cc);
  text-decoration: none;
  padding: 6px 0;
  font-size: 14px;
  transition: color 0.2s ease;
}

.info__phone-link:hover {
  color: var(--primary-hover, #0052a3);
  text-decoration: underline;
}

.info__phone-link:not(:last-child) {
  border-bottom: 1px solid var(--border-color, #eee);
  padding-bottom: 6px;
  margin-bottom: 6px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.images-row {
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-top: 12px;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  flex: 1;
  min-width: 150px;
  max-width: 300px;
}

.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  display: inline-block;
  max-width: 400px;
}

.info__image {
  transition: transform 0.25s ease, opacity 0.25s ease;
  display: block;
  width: 100%;
  height: auto;
}

.zoom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.image-wrapper:hover .zoom-overlay {
  opacity: 1;
}

.zoom-icon {
  width: 48px;
  height: 48px;
  opacity: 0.9;
}

/* Модалка */
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
}

.modal-content {
  position: relative;
  max-width: 80vw;
  max-height: 80vh;
}

.modal-image {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.modal-close {
  position: absolute;
  top: -50px;
  right: 60px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  line-height: 1;
  padding: 0 12px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .info {
    &__item {
      grid-template-columns: 1fr; // На мобильных - одна колонка
      
      &--full-width {
        grid-template-columns: 1fr;
      }

      &.users {
        grid-template-columns: 1fr;
      }
    }

    &__title {
      font-size: 0.95rem;
    }
  }
}
</style>