<template>
  <div class="prehead"></div>
  <div class="container">
    <Breadcrumbs :items="breadCrumbs" />
    <template v-if="course">
      <div class="course-detail__info info">
        <div class="info__item-top top">
          <h1 class="top__title">{{ course.title }}</h1>

          <div v-if="course.mainDescription" class="top__description">
            <p class="top__description-value">{{ course.mainDescription }}</p>
          </div>
        </div>

        <div class="info__item-block block">
          <div class="block__users">
            <p class="block__title">Категории слушателей:</p>
            <ul class="block__users-list">
              <li v-for="(user, index) in course.users" :key="index" class="block__users-item">
                <img :src="checkIkon" class="block__img" alt="" />
                <span>{{ user }}</span>
              </li>
            </ul>
          </div>

          <div v-if="course.requiremets" class="block__require">
            <p class="block__title">Требования к слушателям:</p>
            <ul class="info__users-list">
              <li v-for="(user, index) in course.requiremets" :key="index" class="info__users-item">
                <img :src="checkIkon" class="block__img" alt="" />
                <span>{{ user }}</span>
              </li>
            </ul>
          </div>

          <div class="block__row row">
            <div class="row-item">
              <p class="block__title">Продолжительность обучения:</p>
              <p class="info__value">{{ hoursDisplay }}</p>
            </div>

            <div v-if="course.format" class="row-item">
              <p class="block__title">Форма обучения:</p>
              <p class="info__value">{{ course.format }}</p>
            </div>

            <div v-if="course.period" class="row-item">
              <p class="block__title">Периодичность обучения:</p>
              <p class="info__value">{{ course.period }}</p>
            </div>
          </div>

          <div class="block__document">
            <p class="block__title">Получаемый документ:</p>
            <div class="info__value">
              <template v-if="Array.isArray(course.document) && course.document.length">
                <ul class="info__value-list">
                  <li
                    v-for="doc in course.document"
                    :key="doc"
                    class="info__value-item"
                  >
                    {{ doc }}
                  </li>
                </ul>
              </template>

              <p v-else>{{ course.document }}</p>

              <template v-if="course.img">
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
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div v-else class="image-wrapper" @click="openModal(course.img)">
                  <img
                    :src="course.img"
                    :alt="`Образец документа: ${documentAlt}`"
                    class="info__image"
                  />
                  <div class="zoom-overlay">
                    <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                    </svg>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="block__buttons">
            <button type="button" class="info__back-btn" @click="$router.back()">Назад к списку</button>
            <button
              type="button"
              class="info__action-btn info__action-btn--secondary"
              :disabled="!course?.application"
              @click="downloadApplication"
            >
              Заявка на обучение
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 8px">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button
              type="button"
              class="info__action-btn info__action-btn--primary"
              :disabled="!course?.programm"
              @click="openShortInfo"
            >
              Получить программу *
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 8px">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
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
        </div>

        <div v-if="showModal" class="image-modal" @click.self="showModal = false">
          <div class="modal-content">
            <button type="button" class="modal-close" @click="showModal = false">×</button>
            <img
              :src="selectedImage ?? undefined"
              :alt="`Образец документа: ${documentAlt}`"
              class="modal-image"
            />
          </div>
        </div>

        <ConsultationWidget ref="widgetRef" :delay="5000" />
      </div>
    </template>

    <div v-else class="not-found">
      <h1 class="top__title">Курс не найден</h1>
      <button type="button" class="info__back-btn" @click="$router.push('/training_programs/tematicheskie_seminary/')">
        К списку программ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findOpoProgramByCode, type OpoTrainingProgram } from './utils'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import ConsultationWidget from '@/components/UI/ConsultantWidget.vue'
import checkIkon from '@/assets/img/checkIcon.svg'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const showModal = ref(false)
const selectedImage = ref<string | null>(null)
const showPhoneTooltip = ref(false)
const widgetRef = ref(null)

const course = computed<OpoTrainingProgram | undefined>(() => {
  if (!code.value) return undefined
  return findOpoProgramByCode(code.value)
})

const hoursDisplay = computed(() => {
  const c = course.value
  if (!c) return ''
  const h = c.hours
  return typeof h === 'string' ? h : `${h} часов`
})

const documentAlt = computed(() => {
  const d = course.value?.document
  if (!d) return ''
  return Array.isArray(d) ? d[0] ?? '' : d
})

const openModal = (img: string) => {
  if (!img) return
  selectedImage.value = img
  showModal.value = true
}

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: 'Главная', link: '/' },
    { text: 'Виды обучения', link: '/training_programs/' },
    {
      text: 'Обучение рабочего персонала ОПО',
      link: '/training_programs/tematicheskie_seminary/'
    }
  ]
  if (course.value) {
    crumbs.push({
      text: course.value.title,
      link: route.path
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
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
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
    font-family: 'IBM M', sans-serif;
    margin-bottom: 12px;
  }
}

.top {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 75%;
  margin: 0 auto 20px;

  &__title {
    font-weight: 600;
    margin: 0;
    color: #123970;
    font-family: 'IBM M', sans-serif;
    font-size: 42px;
    text-align: center;
  }

  &__description {
    flex: 1;
    border-radius: 8px;
    background-color: #e9f4ff;
    padding: 24px;
  }
}

.block {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 75%;
  width: 100%;
  margin: 0 auto 20px;

  &__title {
    margin-bottom: 8px;
    color: rgba(18, 57, 112);
    font-weight: 600;
  }

  &__img {
    height: 24px;
    width: 24px;
  }
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;

  &-item {
    flex: 1;
    border-radius: 8px;
    background-color: #e9f4ff;
    padding: 24px;
  }
}

.block__buttons {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
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
    grid-template-columns: 1fr 4fr;
    gap: 16px;
    align-items: start;

    &--full-width {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    font-weight: 600;
    margin: 0;
    color: #123970;
    font-family: 'IBM M', sans-serif;
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

  &__users-item {
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
    font-family: 'IBM M', sans-serif;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0d2a54;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.buttons-group {
  display: flex;
  gap: 18px;
}

.info__hint {
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-secondary, #666);
  flex: 1 1 100%;
  width: 100%;
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
  display: inline-block;
}

.not-found {
  text-align: center;
  padding: 4rem 1rem;

  .top__title {
    margin: 0 0 1.5rem;
    font-weight: 600;
    color: #123970;
    font-family: 'IBM M', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
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
  background: rgba(18, 57, 112, 0.7);
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

.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(18, 57, 140, 0.5);
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
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

@media (max-width: 768px) {
  .info {
    &__item {
      grid-template-columns: 1fr;

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

  .top {
    max-width: 100%;
  }

  .block {
    max-width: 100%;
  }

  .top__title {
    font-size: clamp(1.25rem, 5vw, 1.75rem);
  }

  .row {
    flex-direction: column;

    .row-item {
      width: 100%;
    }
  }

  .block__buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .info__back-btn,
  .info__action-btn {
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }
}
</style>
