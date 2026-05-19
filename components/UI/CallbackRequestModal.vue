<template>
  <Teleport v-if="mounted" to="body">
    <div
      v-if="modelValue"
      class="cb-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
    >
      <div class="cb-modal__backdrop" aria-hidden="true" @click="close" />
      <div class="cb-modal__panel">
        <button type="button" class="cb-modal__close" :aria-label="SITE_TEXT.callbackModal.closeAria" @click="close">
          ×
        </button>
        <h2 :id="titleId" class="cb-modal__title">{{ SITE_TEXT.callbackModal.title }}</h2>
        <p class="cb-modal__lead">
          {{ SITE_TEXT.callbackModal.lead }}
        </p>

        <div v-if="success" class="cb-modal__success" role="status">
          {{ SITE_TEXT.callbackModal.success }}
        </div>

        <form v-else class="cb-modal__form" novalidate @submit.prevent="onSubmit">
          <label class="cb-modal__field">
            <span class="cb-modal__label">{{ SITE_TEXT.callbackModal.labels.name }}</span>
            <input
              :value="name"
              type="text"
              name="name"
              autocomplete="name"
              maxlength="120"
              class="cb-modal__input"
              :placeholder="SITE_TEXT.callbackModal.placeholders.name"
              @input="onNameInput"
            />
          </label>

          <label class="cb-modal__field">
            <span class="cb-modal__label">{{ SITE_TEXT.callbackModal.labels.phone }}</span>
            <input
              :value="phoneDisplay"
              type="tel"
              name="phone"
              inputmode="numeric"
              autocomplete="tel"
              maxlength="18"
              class="cb-modal__input"
              :placeholder="SITE_TEXT.callbackModal.placeholders.phone"
              @input="onPhoneInput"
            />
          </label>

          <div class="cb-modal__hp" aria-hidden="true">
            <label>
              <span>{{ SITE_TEXT.callbackModal.labels.company }}</span>
              <input v-model="honeypot" type="text" name="website" tabindex="-1" />
            </label>
          </div>

          <p v-if="clientError" class="cb-modal__error" role="alert">{{ clientError }}</p>
          <p v-if="serverError" class="cb-modal__error" role="alert">{{ serverError }}</p>

          <button type="submit" class="cb-modal__submit" :disabled="pending">
            {{ pending ? SITE_TEXT.callbackModal.pending : SITE_TEXT.callbackModal.submit }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { SITE_TEXT } from '@/utils/siteText'

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

/** Только кириллица, пробел, дефис, апостроф (двойные имена) */
const NAME_PATTERN =
  /^[а-яА-ЯёЁ]+(?:[\s'-][а-яА-ЯёЁ]+)*$/u

function sanitizeNameInput(raw: string) {
  return raw
    .replace(/[^а-яА-ЯёЁ\s'-]/gu, '')
    .replace(/\s+/g, ' ')
}

/** Цифры → нормализованный российский мобильный: 7 + 10 цифр (начиная с 9) */
function parseDigitsToRuMobile(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (!d.startsWith('7')) {
    if (d[0] === '9') d = '7' + d
    else return ''
  }
  return d.slice(0, 11)
}

function formatRuPhoneDisplay(digits: string): string {
  if (!digits) return ''
  const rest = digits.slice(1, 11)
  let s = '+7'
  if (rest.length === 0) return `${s} (`
  const p1 = rest.slice(0, 3)
  s += ` (${p1}`
  if (rest.length < 3) return s
  s += ')'
  const p2 = rest.slice(3, 6)
  if (p2) s += ` ${p2}`
  const p3 = rest.slice(6, 8)
  if (p3) s += `-${p3}`
  const p4 = rest.slice(8, 10)
  if (p4) s += `-${p4}`
  return s
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const titleId = `cb-modal-title-${Math.random().toString(36).slice(2, 9)}`

const name = ref('')
const phoneDigits = ref('')
const honeypot = ref('')

const phoneDisplay = computed(() => formatRuPhoneDisplay(phoneDigits.value))
const pending = ref(false)
const success = ref(false)
const clientError = ref('')
const serverError = ref('')

const config = useRuntimeConfig()

const apiUrl = computed(() => {
  const base = config.app.baseURL || '/'
  const normalized = base.endsWith('/') ? base : `${base}/`
  return `${normalized}api/callback-request`
})

function close() {
  emit('update:modelValue', false)
}

function reset() {
  name.value = ''
  phoneDigits.value = ''
  honeypot.value = ''
  clientError.value = ''
  serverError.value = ''
  success.value = false
  pending.value = false
}

function onNameInput(e: Event) {
  const el = e.target as HTMLInputElement
  name.value = sanitizeNameInput(el.value)
}

function onPhoneInput(e: Event) {
  const el = e.target as HTMLInputElement
  phoneDigits.value = parseDigitsToRuMobile(el.value)
}

watch(
  () => props.modelValue,
  (open) => {
    if (import.meta.client) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
    if (open) {
      reset()
    }
  }
)

function validate(): boolean {
  clientError.value = ''
  const n = name.value.trim()
  if (n.length < 2) {
    clientError.value = SITE_TEXT.callbackModal.errors.shortName
    return false
  }
  if (!NAME_PATTERN.test(n)) {
    clientError.value =
      SITE_TEXT.callbackModal.errors.invalidName
    return false
  }
  if (!/^79\d{9}$/.test(phoneDigits.value)) {
    clientError.value =
      SITE_TEXT.callbackModal.errors.invalidPhone
    return false
  }
  return true
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return
  if (honeypot.value) return

  pending.value = true
  try {
    await $fetch<{ ok: boolean }>(apiUrl.value, {
      method: 'POST',
      body: {
        name: name.value.trim(),
        phone: formatRuPhoneDisplay(phoneDigits.value),
        phoneDigits: phoneDigits.value,
        website: honeypot.value || undefined
      }
    })
    success.value = true
  } catch (e: unknown) {
    const err = e as {
      data?: { statusMessage?: string; message?: string }
      message?: string
    }
    serverError.value =
      err?.data?.message ||
      err?.data?.statusMessage ||
      err?.message ||
      SITE_TEXT.callbackModal.errors.submitFailed
  } finally {
    pending.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.cb-modal {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
  box-sizing: border-box;
}

.cb-modal__backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, $color-darkBlue 45%, transparent);
  backdrop-filter: blur(4px);
}

.cb-modal__panel {
  position: relative;
  width: 100%;
  max-width: 26rem;
  padding: $spacing-xl;
  background: $color-white;
  border-radius: $radius-xl;
  border: 1px solid $color-border-strong;
  box-shadow: $shadow-card;
  z-index: 1;
  max-height: min(90vh, 36rem);
  overflow-y: auto;
}

.cb-modal__close {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  color: $color-text-muted;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  border-radius: $radius-md;
  transition:
    color $transition-fast,
    background $transition-fast;

  &:hover {
    color: $color-darkBlue;
    background: color-mix(in srgb, $color-lightBlue 50%, transparent);
  }
}

.cb-modal__title {
  margin: 0 0 $spacing-sm;
  font-family: $font-ibm-m, sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: $font-weight-semibold;
  color: $color-darkBlue;
  padding-right: 2rem;
}

.cb-modal__lead {
  margin: 0 0 $spacing-lg;
  font-family: $font-ibm, sans-serif;
  font-size: $font-size-sm;
  line-height: $line-height-body;
  color: $color-text-body;
}

.cb-modal__form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.cb-modal__field {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.cb-modal__label {
  font-family: $font-ibm-m, sans-serif;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-darkBlue;
}

.cb-modal__input {
  width: 100%;
  box-sizing: border-box;
  padding: $spacing-sm $spacing-md;
  font-family: $font-ibm, sans-serif;
  font-size: $font-size-base;
  border: 1px solid $color-border-strong;
  border-radius: $radius-md;
  transition:
    border-color $transition-fast,
    box-shadow $transition-fast;

  &:focus {
    outline: none;
    border-color: $color-darkBlue;
    box-shadow: 0 0 0 3px color-mix(in srgb, $color-lightBlue 65%, transparent);
  }

  &::placeholder {
    color: $color-text-muted;
  }
}

.cb-modal__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cb-modal__error {
  margin: 0;
  font-size: $font-size-sm;
  color: #b42318;
  line-height: $line-height-body;
}

.cb-modal__success {
  padding: $spacing-md;
  background: color-mix(in srgb, $color-lightBlue 55%, $color-white);
  border: 1px solid $color-border;
  border-radius: $radius-md;
  font-family: $font-ibm, sans-serif;
  font-size: $font-size-base;
  line-height: $line-height-body;
  color: $color-text-body;
}

.cb-modal__submit {
  margin-top: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  font-family: $font-ibm-m, sans-serif;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-white;
  background: $color-darkBlue;
  border: none;
  border-radius: $radius-lg;
  cursor: pointer;
  transition:
    filter $transition-base,
    opacity $transition-fast;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}
</style>
