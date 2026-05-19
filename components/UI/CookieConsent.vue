<template>
  <Teleport v-if="mounted" to="body">
    <Transition name="cookie-consent-fade">
      <div
        v-if="isOpen"
        class="cookie-consent"
        role="dialog"
        aria-modal="false"
        :aria-label="SITE_TEXT.cookieConsent.ariaLabel"
        aria-describedby="cookie-consent-desc"
      >
        <div class="cookie-consent__wrap">
          <div class="cookie-consent__panel">
            <button
              type="button"
              class="cookie-consent__close"
              :aria-label="SITE_TEXT.common.close"
              @click="close"
            >
              <span class="cookie-consent__close-icon" aria-hidden="true" />
            </button>
            <div class="cookie-consent__content">
              <p id="cookie-consent-desc" class="cookie-consent__text">
                {{ SITE_TEXT.cookieConsent.message }}
              </p>
            </div>
            <div class="cookie-consent__actions">
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--secondary"
              @click="decline"
            >
              {{ SITE_TEXT.cookieConsent.decline }}
            </button>
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--primary"
              @click="accept"
            >
              {{ SITE_TEXT.cookieConsent.accept }}
            </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { COOKIE_CONSENT_STORAGE_KEY } from '@/utils/cookieConsent'
import { SITE_TEXT } from '@/utils/siteText'

const mounted = ref(false)
const isOpen = ref(false)

function readStored(): 'accepted' | 'rejected' | null {
  if (!import.meta.client) return null
  const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (v === 'accepted' || v === 'rejected') return v
  return null
}

onMounted(() => {
  mounted.value = true
  isOpen.value = readStored() === null
})

function accept() {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted')
  isOpen.value = false
}

function decline() {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'rejected')
  isOpen.value = false
}

function close() {
  decline()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

/* Плашка: «стекло» / glassmorphism в духе iOS */
.cookie-consent {
  position: fixed;
  z-index: 280;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  pointer-events: none;

  &__wrap {
    width: 100%;
    max-width: $container-max-width;
    margin-left: auto;
    margin-right: auto;
    @include m.container-padding;
    padding-top: $spacing-md;
    padding-bottom: calc(#{$spacing-md} + env(safe-area-inset-bottom, 0px));
    pointer-events: none;

    @include m.until($bp-md) {
      display: flex;
      justify-content: center;
    }

    @include m.from($bp-lg) {
      max-width: none;
      margin: 0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

  &__panel {
    position: relative;
    pointer-events: auto;
    width: 100%;
    max-width: 100%;
    border-radius: $radius-xl;
    padding: clamp(1.125rem, 3vw, 1.5rem) clamp(2.25rem, 4vw, 2.5rem) clamp(1.125rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.75rem);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: $spacing-md;

    /* Стекло: размытие фона + полупрозрачная пластина */
    background: color-mix(in srgb, $color-white 58%, transparent);
    -webkit-backdrop-filter: blur(22px) saturate(1.65);
    backdrop-filter: blur(22px) saturate(1.65);

    border: 1px solid color-mix(in srgb, $color-white 55%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, $color-darkBlue 6%, transparent),
      0 -8px 40px rgba(18, 57, 112, 0.12),
      inset 0 1px 0 color-mix(in srgb, $color-white 70%, transparent);

    @supports not (backdrop-filter: blur(1px)) {
      background: color-mix(in srgb, $color-lightBlue 92%, $color-white);
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
    }

    /* Мобильный: компактнее и по центру */
    @include m.until($bp-md) {
      max-width: min(22rem, 100%);
      margin-left: auto;
      margin-right: auto;
      padding: $spacing-md calc(#{$spacing-md} + 1.75rem) $spacing-md $spacing-md;
      text-align: center;
      align-items: center;
    }

    /* Десктоп: 25% ширины, правый нижний угол */
    @include m.from($bp-lg) {
      width: 25%;
      max-width: 25%;
      flex-shrink: 0;
      margin: 0;
    }
  }

  &__close {
    position: absolute;
    top: clamp(0.5rem, 1.5vw, 0.75rem);
    right: clamp(0.5rem, 1.5vw, 0.75rem);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: $radius-sm;
    background: transparent;
    color: $color-text-muted;
    cursor: pointer;
    transition:
      color $transition-fast,
      background-color $transition-fast;

    &:hover {
      color: $color-darkBlue;
      background: color-mix(in srgb, $color-lightBlue 55%, transparent);
    }

    &:focus-visible {
      outline: 2px solid $color-darkBlue;
      outline-offset: 2px;
    }
  }

  &__close-icon {
    position: relative;
    display: block;
    width: 0.875rem;
    height: 0.875rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 2px;
      background: currentColor;
      border-radius: 1px;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__content {
    min-width: 0;
    width: 100%;

    @include m.from($bp-md) {
      text-align: left;
    }
  }

  &__text {
    margin: 0;
    font-family: $font-ibm;
    font-size: 0.75rem;
    line-height: $line-height-body;
    color: $color-text-body;

    @include m.until($bp-md) {
      font-size: 0.6875rem;
      line-height: 1.5;
      text-align: left;
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: $spacing-sm;
    flex-shrink: 0;
    margin-top: 0;
    justify-content: stretch;
    align-self: stretch;
    width: 100%;

    @include m.from($bp-md) {
      gap: $spacing-sm;
    }
  }

  &__btn {
    flex: 1 1 0;
    min-width: 0;
    font-family: $font-ibm-m;
    font-size: 0.8125rem;
    font-weight: $font-weight-semibold;
    line-height: 1.25;
    padding: 0.4rem 0.5rem;
    border-radius: $radius-lg;
    cursor: pointer;
    border: none;
    text-align: center;
    white-space: nowrap;
    transition:
      background-color $transition-fast,
      color $transition-fast,
      box-shadow $transition-fast,
      transform $transition-fast;

    &:focus-visible {
      outline: 2px solid $color-darkBlue;
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.98);
    }

    &--primary {
      color: $color-white;
      background: $color-darkBlue;
      box-shadow: 0 2px 12px rgba(18, 57, 112, 0.25);

      &:hover {
        background: $color-cta-hover;
      }
    }

    &--secondary {
      color: $color-darkBlue;
      background: color-mix(in srgb, $color-white 45%, transparent);
      border: 1px solid color-mix(in srgb, $color-darkBlue 22%, $color-border);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);

      &:hover {
        background: color-mix(in srgb, $color-white 75%, $color-lightBlue);
        border-color: $color-darkBlue;
      }
    }

    @include m.until($bp-md) {
      font-size: 0.6875rem;
      padding: 0.4rem 0.5rem;
    }
  }
}

.cookie-consent-fade-enter-active,
.cookie-consent-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.cookie-consent-fade-enter-from,
.cookie-consent-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
