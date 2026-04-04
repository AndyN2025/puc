<template>
  <div class="prehead"></div>
  <div class="container">
    <Breadcrumbs :items="breadCrumbs" />
    <template v-if="course">
      <div class="course-detail__info info">
        <div class="info__item-top top">
          <h1 class="top__title">{{ pageTitle }}</h1>
          <p v-if="course.textCode && course.textCode !== '—'" class="top__code">
            Код программы: {{ course.textCode }}
          </p>

          <div v-if="course.mainDescription" class="top__description">
            <p class="top__description-value">{{ course.mainDescription }}</p>
          </div>
        </div>

        <div class="info__item-block block">
          <div class="block__users">
            <p class="block__title">{{ listenersBlockTitle }}</p>
            <ul class="block__users-list">
              <li v-for="(user, index) in course.users" :key="index" class="block__users-item">
                <img :src="checkIkon" class="block__img" alt="" />
                <span>{{ user }}</span>
              </li>
            </ul>
          </div>

          <div v-if="course.requiremets?.length" class="block__require">
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
              <p class="info__value">{{ course.hours }} часов</p>
            </div>

            <div v-if="course.format" class="row-item">
              <p class="block__title">Форма обучения:</p>
              <p class="info__value">{{ course.format }}</p>
            </div>

            <div v-if="course.period" class="row-item">
              <p class="block__title">Периодичность:</p>
              <p class="info__value">{{ course.period }}</p>
            </div>
          </div>

          <div class="block__document">
            <p class="block__title">Получаемый документ:</p>
            <div class="info__value">
              <template v-if="Array.isArray(course.document) && course.document.length">
                <ul class="info__value-list">
                  <li v-for="doc in course.document" :key="doc" class="info__value-item">
                    {{ doc }}
                  </li>
                </ul>
              </template>
              <p v-else>{{ course.document }}</p>
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

        <ConsultantWidget :delay="5000" />
      </div>
    </template>

    <div v-else class="not-found">
      <h1 class="top__title">Программа не найдена</h1>
      <button type="button" class="info__back-btn" @click="$router.push('/training_programs/industrial_safety/')">
        К списку программ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  findIndustrialTrainingProgramByCode,
  type IndustrialTrainingProgram
} from './utils'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import checkIkon from '@/assets/img/checkIcon.svg'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const showPhoneTooltip = ref(false)

const course = computed<IndustrialTrainingProgram | undefined>(() => {
  if (!code.value) return undefined
  return findIndustrialTrainingProgramByCode(code.value)
})

const pageTitle = computed(() => {
  const c = course.value
  if (!c) return ''
  if (c.track === 'preAttest') {
    return `Дополнительная общеобразовательная программа предаттестационной подготовки. ${c.title}`
  }
  return c.title
})

const listenersBlockTitle = computed(() => {
  const t = course.value?.track
  if (t === 'preAttest') {
    return 'Кто должен проходить аттестацию по промышленной безопасности:'
  }
  return 'Категории слушателей:'
})

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: 'Главная', link: '/' },
    { text: 'Виды обучения', link: '/training_programs/' },
    {
      text: 'Промышленная безопасность',
      link: '/training_programs/industrial_safety/'
    }
  ]
  if (course.value) {
    const tc = course.value.textCode
    const lastText =
      tc === '—' || tc === ''
        ? course.value.title.slice(0, 80) + (course.value.title.length > 80 ? '…' : '')
        : tc
    crumbs.push({
      text: lastText,
      link: route.path
    })
  }
  return crumbs
})

const downloadApplication = () => {
  if (!course.value?.application) {
    alert('Файл заявки не найден для этой программы')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.application
  link.download = `Заявка_${course.value.textCode || 'на_обучение'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert('Программа обучения не найдена для этой программы')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.programm
  link.download = `Программа_${course.value.textCode || 'обучения'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
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

  &__code {
    margin: 0;
    text-align: center;
    color: #123970;
    font-weight: 600;
    font-size: 1.05rem;
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

@media (max-width: 768px) {
  .info {
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
