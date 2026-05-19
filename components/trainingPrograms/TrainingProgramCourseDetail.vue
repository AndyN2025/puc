<template>
  <div class="tpc">
    <Breadcrumbs :items="breadCrumbs" />
    <template v-if="course">
      <div class="course-detail__info info">
        <div class="info__item-top top">
          <h1 class="top__title" :class="titleLengthClass">{{ displayTitle }}</h1>

          <p v-if="showProgramCodeLine" class="top__code">
            {{ SITE_TEXT.trainingDetail.programCode }} {{ course.textCode }}
          </p>

          <div v-if="course.mainDescription" class="top__description">
            <p class="top__description-value">{{ course.mainDescription }}</p>
          </div>
        </div>

        <div class="info__item-block block">
          <div class="block__users">
            <p class="block__title">{{ listenersTitle }}</p>
            <ul class="block__users-list">
              <li
                v-for="(user, index) in course.users"
                :key="index"
                class="block__users-item"
              >
                <img :src="checkIkon" class="block__img" alt="" />
                <span>{{ user }}</span>
              </li>
            </ul>
          </div>

          <div v-if="hasRequirements" class="block__require">
            <p class="block__title">{{ SITE_TEXT.trainingDetail.requirements }}</p>
            <ul class="info__users-list">
              <li
                v-for="(user, index) in course.requiremets!"
                :key="index"
                class="info__users-item"
              >
                <img :src="checkIkon" class="block__img" alt="" />
                <span>{{ user }}</span>
              </li>
            </ul>
          </div>

          <div class="block__row row">
            <div class="row-item">
              <p class="block__title">{{ SITE_TEXT.trainingDetail.duration }}</p>
              <p class="info__value">{{ hoursDisplay }}</p>
            </div>

            <div v-if="course.format" class="row-item">
              <p class="block__title">{{ SITE_TEXT.trainingDetail.format }}</p>
              <p class="info__value">{{ course.format }}</p>
            </div>

            <div v-if="course.period" class="row-item">
              <p class="block__title">{{ periodLabel }}</p>
              <p class="info__value">{{ course.period }}</p>
            </div>
          </div>

          <div class="block__document">
            <p class="block__title">{{ SITE_TEXT.trainingDetail.document }}</p>
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
                      :src="courseImageSrc(img)"
                      :alt="SITE_TEXT.trainingDetail.imageAlt(index)"
                      class="info__image"
                    />
                    <div class="zoom-overlay">
                      <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
                        <path
                          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                        />
                        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div v-else class="image-wrapper" @click="openModal(course.img)">
                  <img
                    :src="courseImageSrc(course.img)"
                    :alt="SITE_TEXT.trainingDetail.documentAlt(documentAlt)"
                    class="info__image"
                  />
                  <div class="zoom-overlay">
                    <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
                      <path
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                      />
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                    </svg>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="block__buttons">
            <button type="button" class="info__back-btn" @click="$router.back()">
              {{ SITE_TEXT.trainingDetail.backToList }}
            </button>
            <button
              type="button"
              class="info__action-btn info__action-btn--secondary"
              :disabled="!course.application"
              @click="emit('downloadApplication')"
            >
              <svg
                class="info__action-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ SITE_TEXT.trainingDetail.applicationButton }}
            </button>
            <button
              type="button"
              class="info__action-btn info__action-btn--primary"
              :disabled="!course.programm"
              @click="emit('downloadProgram')"
            >
              <svg
                class="info__action-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ SITE_TEXT.trainingDetail.programButton }}
            </button>
            <p class="info__hint">
              {{ SITE_TEXT.trainingDetail.programHintBefore }}
              <span
                class="info__phone-highlight"
                @mouseenter="showPhoneTooltip = true"
                @mouseleave="showPhoneTooltip = false"
              >
                {{ SITE_TEXT.trainingDetail.phoneWord }}
                <div
                  v-if="showPhoneTooltip"
                  class="info__phone-tooltip"
                  @mouseenter="showPhoneTooltip = true"
                  @mouseleave="showPhoneTooltip = false"
                >
                  <a
                    v-for="p in SITE_PHONES"
                    :key="p.tel"
                    :href="`tel:${p.tel}`"
                    class="info__phone-link"
                  >{{ p.displayPlus7 }}</a>
                </div>
              </span>
            </p>
          </div>
        </div>

        <div v-if="showModal" class="image-modal" @click.self="showModal = false">
          <div class="modal-content">
            <button type="button" class="modal-close" @click="showModal = false">×</button>
            <img
              :src="selectedImage ? courseImageSrc(selectedImage) : undefined"
              :alt="SITE_TEXT.trainingDetail.documentAlt(documentAlt)"
              class="modal-image"
            />
          </div>
        </div>

        <ConsultationWidget v-if="showConsultationWidget" :delay="5000" />
      </div>
    </template>

    <div v-else class="not-found">
      <h1 class="top__title">{{ notFoundTitle }}</h1>
      <button type="button" class="info__back-btn" @click="$router.push(listIndexPath)">
        {{ SITE_TEXT.trainingDetail.toProgramsList }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import ConsultationWidget from '@/components/UI/ConsultantWidget.vue'
import checkIkon from '@/assets/img/checkIcon.svg'
import { SITE_PHONES } from '@/utils/site'
import { SITE_TEXT } from '@/utils/siteText'
import { withAppBase } from '@/utils/withAppBase'

export interface TrainingProgramCourseDetailBreadcrumb {
  text: string
  link: string
}

/** Минимальный набор полей курса для карточки программы */
export interface TrainingProgramCourseDetailModel {
  title: string
  mainDescription?: string | null
  textCode?: string | null
  users: string[]
  requiremets?: string[] | null
  format?: string | null
  period?: string | null
  document: string | string[]
  img?: string | string[] | null
  application?: string | null
  programm?: string | null
}

const props = withDefaults(
  defineProps<{
    course: TrainingProgramCourseDetailModel | null
    breadCrumbs: TrainingProgramCourseDetailBreadcrumb[]
    listenersTitle: string
    /** Готовая строка для блока «Продолжительность» (например «40 часа» или «по договорённости») */
    hoursDisplay: string
    /** Заголовок колонки периодичности */
    periodLabel?: string
    /** Подмена заголовка H1 (напр. промышленная безопасность) */
    pageTitle?: string | null
    notFoundTitle?: string
    listIndexPath: string
    showConsultationWidget?: boolean
  }>(),
  {
    periodLabel: SITE_TEXT.trainingDetail.periodLabel,
    pageTitle: null,
    notFoundTitle: SITE_TEXT.trainingDetail.notFoundTitle,
    showConsultationWidget: true
  }
)

const emit = defineEmits<{
  downloadApplication: []
  downloadProgram: []
}>()

const showModal = ref(false)
const selectedImage = ref<string | null>(null)
const showPhoneTooltip = ref(false)

const displayTitle = computed(() => props.pageTitle ?? props.course?.title ?? '')

/** Уменьшение кегля при длинном названии — текст всегда виден полностью (переносы, без ellipsis) */
const titleLengthClass = computed(() => {
  const len = displayTitle.value.length
  if (len >= 220) return 'top__title--len-xl'
  if (len >= 140) return 'top__title--len-lg'
  if (len >= 72) return 'top__title--len-md'
  return 'top__title--len-sm'
})

const showProgramCodeLine = computed(() => {
  const tc = props.course?.textCode
  if (!tc || tc === '—' || tc === '-') return false
  return true
})

const hasRequirements = computed(() => {
  const r = props.course?.requiremets
  return Array.isArray(r) ? r.length > 0 : !!r
})

const documentAlt = computed(() => {
  const d = props.course?.document
  if (!d) return ''
  return Array.isArray(d) ? (d[0] ?? '') : d
})

function courseImageSrc(src: string) {
  return withAppBase(src)
}

const openModal = (img: string) => {
  if (!img) return
  selectedImage.value = img
  showModal.value = true
}

watch(showModal, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.tpc {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.course-detail__info {
  width: 100%;
  max-width: 100%;
}

.top {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  width: 100%;
  max-width: 100%;
  margin: 0 0 $spacing-xl;
  padding: $spacing-lg $spacing-xl;
  background: linear-gradient(
    165deg,
    $color-white 0%,
    color-mix(in srgb, $color-lightBlue 35%, $color-white) 45%,
    $color-lightBlue 160%
  );
  border: 1px solid $color-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-soft;

  @include m.from($bp-md) {
    padding: $spacing-xl $spacing-2xl;
    gap: $spacing-xl;
  }

  &__title {
    margin: 0;
    width: 100%;
    max-width: 100%;
    font-family: $font-ibm-m;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    text-align: center;
    letter-spacing: -0.02em;
    /* Полный текст, без обрезки */
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    hyphens: auto;

    /* Кегль по длине строки (sm = короткие названия — крупнее) */
    &--len-sm {
      font-size: clamp(1.5rem, 3.8vw + 0.6rem, 2.125rem);
      line-height: $line-height-tight;
    }

    &--len-md {
      font-size: clamp(1.28rem, 2.8vw + 0.45rem, 1.75rem);
      line-height: 1.22;
    }

    &--len-lg {
      font-size: clamp(1.12rem, 2.1vw + 0.35rem, 1.5rem);
      line-height: 1.28;
    }

    &--len-xl {
      font-size: clamp(1rem, 1.5vw + 0.3rem, 1.28rem);
      line-height: 1.35;
    }
  }

  &__code {
    margin: 0;
    text-align: center;
    color: $color-darkBlue;
    font-family: $font-ibm-m;
    font-weight: $font-weight-semibold;
    font-size: $font-size-lg;
    opacity: 0.92;
  }

  &__description {
    border-radius: $radius-lg;
    background: color-mix(in srgb, $color-white 65%, $color-lightBlue);
    border: 1px solid color-mix(in srgb, $color-border 80%, transparent);
    padding: $spacing-lg;
    box-shadow: inset 0 1px 0 color-mix(in srgb, $color-white 90%, transparent);

    &-value {
      margin: 0;
      font-family: $font-ibm;
      font-size: $font-size-base;
      line-height: $line-height-relaxed;
      color: $color-text-body;
    }
  }
}

.block {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  width: 100%;
  max-width: 100%;
  margin: 0 0 $spacing-xl;

  &__users,
  &__require,
  &__document {
    width: 100%;
    padding: $spacing-lg $spacing-xl;
    background: $color-white;
    border: 1px solid $color-border-strong;
    border-radius: $radius-xl;
    box-shadow: $shadow-soft;
  }

  &__title {
    margin: 0 0 $spacing-md;
    font-family: $font-ibm-m;
    font-size: $font-size-lg;
    color: $color-darkBlue;
    font-weight: $font-weight-semibold;
    line-height: $line-height-tight;
  }

  &__img {
    height: 1.375rem;
    width: 1.375rem;
    flex-shrink: 0;
  }
}

.block__users-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.block__users-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: $spacing-md;
  font-family: $font-ibm;
  font-size: $font-size-base;
  line-height: $line-height-relaxed;
  color: $color-text-body;
}

.info__value-list {
  margin: 0;
  padding-left: 1.15rem;
  color: $color-text-body;
  line-height: $line-height-relaxed;
}

.info__value-item {
  margin-bottom: $spacing-xs;

  &:last-child {
    margin-bottom: 0;
  }
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11.5rem), 1fr));
  gap: $spacing-md;
  width: 100%;

  &-item {
    border-radius: $radius-lg;
    background: linear-gradient(
      180deg,
      $color-lightBlue 0%,
      color-mix(in srgb, $color-lightBlue 40%, $color-white) 100%
    );
    border: 1px solid $color-border;
    padding: $spacing-lg;
    transition:
      border-color $transition-fast,
      box-shadow $transition-fast;

    &:hover {
      border-color: color-mix(in srgb, $color-darkBlue 25%, $color-border);
      box-shadow: $shadow-soft;
    }

    .block__title {
      margin: 0 0 $spacing-sm;
      font-family: $font-ibm;
      font-size: 0.9rem;
      font-weight: $font-weight-regular;
      line-height: 1.4;
      text-transform: none;
      letter-spacing: 0.01em;
      color: $color-text-muted;
    }

    .info__value {
      font-family: $font-ibm-m;
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      color: $color-darkBlue;
      line-height: $line-height-tight;
    }
  }
}

.block__buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: $spacing-md;
  align-items: center;
  width: 100%;
  padding: $spacing-lg 0 $spacing-sm;
}

.info {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  width: 100%;

  &__value {
    margin: 0;
    line-height: $line-height-body;
    color: $color-text-body;
    font-family: $font-ibm;
    font-size: $font-size-base;

    > p {
      margin: 0 0 $spacing-sm 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__users-list {
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: $line-height-relaxed;
  }

  &__users-item {
    margin-bottom: $spacing-sm;
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    align-items: flex-start;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__document-img {
    margin-top: $spacing-md;
    text-align: center;
  }

  &__image {
    max-width: min(100%, 26rem);
    height: auto;
    border-radius: $radius-lg;
    display: block;
  }

  &__action-icon {
    flex-shrink: 0;
  }

  &__back-btn,
  &__action-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    min-height: 2.75rem;
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-lg;
    cursor: pointer;
    font-size: $font-size-base;
    font-family: $font-ibm-m;
    font-weight: $font-weight-semibold;
    transition:
      background-color $transition-base,
      color $transition-base,
      border-color $transition-base,
      box-shadow $transition-base;

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  &__back-btn {
    background: $color-white;
    color: $color-darkBlue;
    border: 2px solid $color-border-strong;

    &:hover:not(:disabled) {
      border-color: $color-darkBlue;
      background: color-mix(in srgb, $color-lightBlue 40%, $color-white);
    }
  }

  &__action-btn--primary {
    background: $color-darkBlue;
    color: $color-white;
    border: 2px solid $color-darkBlue;

    &:hover:not(:disabled) {
      background: $color-cta-hover;
      border-color: $color-cta-hover;
    }
  }

  &__action-btn--secondary {
    background: transparent;
    color: $color-darkBlue;
    border: 2px solid $color-darkBlue;

    &:hover:not(:disabled) {
      background: color-mix(in srgb, $color-lightBlue 55%, $color-white);
      color: $color-cta-hover;
      border-color: $color-cta-hover;
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.info__hint {
  margin-top: $spacing-sm;
  font-size: $font-size-sm;
  color: $color-text-muted;
  flex: 1 1 100%;
  width: 100%;
  line-height: $line-height-body;
}

.info__phone-highlight {
  position: relative;
  color: $color-darkBlue;
  font-weight: $font-weight-semibold;
  cursor: help;
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  transition: color $transition-fast;
}

.info__phone-highlight:hover {
  color: $color-cta-hover;
}

.info__phone-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: $color-white;
  border: 1px solid $color-border-strong;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md;
  min-width: 12.5rem;
  z-index: 1000;
  margin-bottom: $spacing-sm;
  animation: tpc-fade-in 0.2s ease;
}

.info__phone-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0;
  border-style: solid;
  border-color: $color-white transparent transparent;
}

.info__phone-link {
  display: block;
  color: $color-darkBlue;
  text-decoration: none;
  padding: $spacing-xs 0;
  font-size: $font-size-sm;
  transition: color $transition-fast;
}

.info__phone-link:hover {
  color: $color-cta-hover;
  text-decoration: underline;
}

.info__phone-link:not(:last-child) {
  border-bottom: 1px solid $color-border;
  padding-bottom: $spacing-sm;
  margin-bottom: $spacing-sm;
}

@keyframes tpc-fade-in {
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
  gap: $spacing-md;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: $spacing-md;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  display: inline-block;
  flex: 1;
  min-width: min(100%, 10rem);
  max-width: 26rem;
  border-radius: $radius-lg;
  overflow: hidden;
  border: 1px solid $color-border;
  box-shadow: $shadow-soft;
}

.info__image {
  transition:
    transform $transition-base,
    opacity $transition-base;
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.image-wrapper:hover .info__image {
  transform: scale(1.02);
}

.zoom-overlay {
  position: absolute;
  inset: 0;
  background: $color-overlay-dark;
  opacity: 0;
  transition: opacity $transition-base;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

.image-wrapper:hover .zoom-overlay {
  opacity: 1;
}

.zoom-icon {
  width: 3rem;
  height: 3rem;
  opacity: 0.95;
}

.image-modal {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, $color-darkBlue 55%, transparent);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  max-width: min(90vw, 56rem);
  max-height: 85vh;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: $radius-lg;
  box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.35);
}

.modal-close {
  position: absolute;
  top: -2.75rem;
  right: 0;
  background: color-mix(in srgb, $color-white 12%, transparent);
  border: 1px solid color-mix(in srgb, $color-white 35%, transparent);
  color: $color-white;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  transition:
    background $transition-fast,
    border-color $transition-fast;

  &:hover {
    background: color-mix(in srgb, $color-white 22%, transparent);
  }
}

.not-found {
  text-align: center;
  padding: $spacing-3xl $spacing-md;
  width: 100%;
  max-width: 100%;

  .top__title {
    margin: 0 0 $spacing-lg;
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    font-family: $font-ibm-m;
    font-size: clamp(1.35rem, 4vw, 2rem);
    line-height: $line-height-tight;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
}

@include m.until($bp-md) {
  .top {
    padding: $spacing-md $spacing-lg;
  }

  .block {
    &__users,
    &__require,
    &__document {
      padding: $spacing-md $spacing-lg;
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
  }

  .modal-close {
    top: -2.25rem;
    font-size: 1.5rem;
  }
}
</style>
