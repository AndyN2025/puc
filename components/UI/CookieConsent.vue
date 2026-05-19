<template>
  <Teleport v-if="mounted" to="body">
    <Transition name="cookie-consent-fade">
      <div
        v-if="isOpen"
        class="cookie-consent"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
      >
        <div class="cookie-consent__wrap">
          <div class="cookie-consent__panel">
            <div class="cookie-consent__content">
            <h2 id="cookie-consent-title" class="cookie-consent__title">
              {{ SITE_TEXT.cookieConsent.title }}
            </h2>
            <p id="cookie-consent-desc" class="cookie-consent__text">
              {{ SITE_TEXT.cookieConsent.description.beforeStorage }}
              <strong>{{ SITE_TEXT.cookieConsent.description.storage }}</strong>
              {{ SITE_TEXT.cookieConsent.description.afterStorage }}
              <code class="cookie-consent__code">{{ COOKIE_CONSENT_STORAGE_KEY }}</code>{{ SITE_TEXT.cookieConsent.description.afterKey }}
            </p>
            <p class="cookie-consent__hint">
              {{ SITE_TEXT.cookieConsent.hint }}
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
import {
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY
} from '@/utils/cookieConsent'
import { SITE_TEXT } from '@/utils/siteText'

const mounted = ref(false)
const isOpen = ref(false)

function readStored(): 'accepted' | 'rejected' | null {
  if (!import.meta.client) return null
  const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (v === 'accepted' || v === 'rejected') return v
  return null
}

function showBannerFromFooter() {
  isOpen.value = true
}

onMounted(() => {
  mounted.value = true
  isOpen.value = readStored() === null
  window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, showBannerFromFooter)
})

onUnmounted(() => {
  window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, showBannerFromFooter)
})

function accept() {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted')
  isOpen.value = false
}

function decline() {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'rejected')
  isOpen.value = false
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
  }

  &__panel {
    pointer-events: auto;
    width: 100%;
    max-width: 100%;
    border-radius: $radius-xl;
    padding: clamp(1.125rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.75rem);
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
      padding: $spacing-md $spacing-md;
      text-align: center;
      align-items: center;
    }
  }

  &__content {
    min-width: 0;
    width: 100%;

    @include m.from($bp-md) {
      text-align: left;
    }
  }

  &__title {
    margin: 0 0 $spacing-sm;
    font-family: $font-ibm-m;
    font-size: clamp(1.0625rem, 2.2vw, 1.2rem);
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    line-height: $line-height-tight;

    @include m.until($bp-md) {
      text-align: center;
      font-size: 1rem;
    }
  }

  &__text {
    margin: 0 0 $spacing-sm;
    font-family: $font-ibm;
    font-size: $font-size-sm;
    line-height: $line-height-body;
    color: $color-text-body;

    @include m.until($bp-md) {
      font-size: 0.8125rem;
      line-height: 1.5;
      text-align: left;
    }
  }

  &__hint {
    margin: 0;
    font-family: $font-ibm;
    font-size: 0.8125rem;
    line-height: $line-height-body;
    color: $color-text-muted;

    @include m.until($bp-md) {
      font-size: 0.75rem;
      line-height: 1.45;
      text-align: left;
    }
  }

  &__code {
    font-family: ui-monospace, monospace;
    font-size: 0.8em;
    padding: 0.1em 0.35em;
    border-radius: $radius-sm;
    background: color-mix(in srgb, $color-lightBlue 80%, transparent);
    color: $color-darkBlue;
    word-break: break-all;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $spacing-sm;
    flex-shrink: 0;
    margin-top: 0;
    justify-content: flex-start;
    align-self: stretch;

    @include m.from($bp-md) {
      gap: $spacing-md;
    }

    @include m.until($bp-md) {
      flex-direction: column;
      align-items: stretch;
      max-width: 16rem;
      align-self: center;
    }
  }

  &__btn {
    font-family: $font-ibm-m;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    line-height: 1.25;
    padding: 0.65rem 1.25rem;
    border-radius: $radius-lg;
    cursor: pointer;
    border: none;
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
      width: 100%;
      font-size: $font-size-sm;
      padding: 0.55rem 1rem;
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
