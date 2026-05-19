<template>
  <div class="programs-table">
    <div v-if="tabs && tabs.length" class="tabs-container">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        type="button"
        class="tab-button"
        :class="{ 'tab-active': tab.value === currentTab }"
        @click="setTab(tab.value, idx)"
      >
        {{ tab.text }}
      </button>
    </div>

    <div
      class="table-wrapper"
      :class="{ 'table-wrapper--no-code': hideCodeColumn }"
    >
      <div class="table-header">
        <div v-if="!hideCodeColumn" class="header-cell">{{ codeColumnTitle }}</div>
        <div class="header-cell">{{ SITE_TEXT.programTable.programName }}</div>
        <div class="header-cell">{{ hoursColumnTitle }}</div>
      </div>

      <template v-if="isBlocksMode">
        <div
          v-for="(block, blockIndex) in items"
          :key="blockIndex"
          class="block-wrapper"
        >
          <div
            v-for="(item, itemIndex) in block"
            :key="itemIndex"
            class="table-row"
          >
            <component
              :is="rowLinkComponent(item)"
              v-bind="rowLinkProps(item)"
              :class="['table-row__link', rowHref(item) ? 'table-row__link--clickable' : 'table-row__link--plain']"
            >
              <div v-if="!hideCodeColumn" class="row-cell">{{ displayCode(item) }}</div>
              <div class="row-cell">{{ item.title }}</div>
              <div class="row-cell">{{ formatHours(item) }}</div>
            </component>
          </div>

          <div v-if="blockIndex < items.length - 1" class="block-divider" />
        </div>
      </template>

      <template v-else>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="table-row"
        >
          <component
            :is="rowLinkComponent(item)"
            v-bind="rowLinkProps(item)"
            :class="['table-row__link', rowHref(item) ? 'table-row__link--clickable' : 'table-row__link--plain']"
          >
            <div v-if="!hideCodeColumn" class="row-cell">{{ displayCode(item) }}</div>
            <div class="row-cell">{{ item.title }}</div>
            <div class="row-cell">{{ formatHours(item) }}</div>
          </component>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { NuxtLink } from '#components'
import { SITE_TEXT } from '@/utils/siteText'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => null
  },
  link: {
    type: String,
    default: () => null
  },
  hideCodeColumn: {
    type: Boolean,
    default: false
  },
  codeColumnTitle: {
    type: String,
    default: SITE_TEXT.programTable.defaultCodeLabel
  },
  hoursColumnTitle: {
    type: String,
    default: SITE_TEXT.programTable.defaultHoursLabel
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      if (!Array.isArray(items)) return false

      if (Array.isArray(items[0])) {
        return items.every(block =>
          Array.isArray(block) &&
          block.every(item =>
            typeof item.code === 'string' &&
            typeof item.title === 'string' &&
            (typeof item.hours === 'number' || typeof item.hours === 'string')
          )
        )
      }

      return items.every(item =>
        typeof item.code === 'string' &&
        typeof item.title === 'string' &&
        (typeof item.hours === 'number' || typeof item.hours === 'string')
      )
    }
  },
  modelValue: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

const currentTab = ref(props.modelValue ?? (props.tabs?.[0]?.value ?? null))

watch(
  () => props.modelValue,
  (v) => {
    if (v == null || !props.tabs?.length) return
    if (props.tabs.some((t) => t.value === v)) {
      currentTab.value = v
    }
  }
)

function setTab(value, index) {
  currentTab.value = value
  emit('update:modelValue', value)
  emit('tab-change', { value, index })
}

const isBlocksMode = computed(() => {
  return Array.isArray(props.items) && props.items.length > 0 && Array.isArray(props.items[0])
})

function formatHours(item) {
  const h = item?.hours
  if (h == null) return ''
  if (typeof h === 'string') return h
  return SITE_TEXT.programTable.hoursShort(h)
}

function displayCode(item) {
  return item.textCode ?? item.code
}

function rowHref(item) {
  if (!props.link || !item?.code) return null
  const c = String(item.code).trim()
  if (c === '' || c === '-') return null
  const base = props.link.replace(/^\/+|\/+$/g, '')
  return `/${base}/${encodeURIComponent(c)}`
}

function rowLinkComponent(item) {
  return rowHref(item) ? NuxtLink : 'div'
}

function rowLinkProps(item) {
  const to = rowHref(item)
  if (to) {
    return { to }
  }
  return {}
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.programs-table {
  background: #f8fcff;
  border-radius: $radius-md;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  font-family: $font-ibm, sans-serif;
  margin-bottom: clamp(2rem, 5vw, 3.75rem);
}

.tabs-container {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  background: $color-white;
  border-bottom: 1px solid #e0e0e0;
  padding: $spacing-sm;

  .tab-button {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem);
    max-width: 22.5rem;
    flex: 1 1 auto;
    min-width: min(100%, 10rem);
    background: $color-lightBlue;
    border-radius: $radius-md $radius-md 0 0;
    cursor: pointer;
    font-size: $font-size-sm;
    color: $color-text-body;
    transition: background-color $transition-fast, color $transition-fast;
    border: none;
    position: relative;

    @include m.from($bp-md) {
      font-size: $font-size-base;
    }

    &:hover {
      background: #d0e6fa;
    }

    &.tab-active {
      background: $color-darkBlue;
      color: $color-white;

      .checkmark {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
      }
    }
  }
}

.table-wrapper {
  background-color: $color-bg-nav;
  border-radius: 0 $radius-md $radius-md $radius-md;
  min-width: min(100%, 42rem);

  .table-header {
    display: grid;
    grid-template-columns: minmax(4rem, 1.1fr) minmax(0, 10fr) minmax(4rem, 1fr);
    border-radius: 0 $radius-md 0 0;
    background: #e0e0e0;
    padding: clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 3vw, 2rem);
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
    color: $color-text-body;

    .header-cell {
      padding: 0 $spacing-xs;
      text-align: center;
      font-family: $font-ibm-m, sans-serif;

      &:nth-child(2) {
        text-align: left;
      }
    }
  }

  .table-row {
    align-items: stretch;

    &__link {
      display: grid;
      grid-template-columns: minmax(4rem, 1.1fr) minmax(0, 10fr) minmax(4rem, 1fr);
      background: $color-bg-nav;
      padding: clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 3vw, 2rem);
      font-size: $font-size-sm;
      color: $black;
      text-decoration: none;
      border: none;
      border-radius: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      text-align: inherit;
      font: inherit;

      &--clickable {
        cursor: pointer;

        &:hover {
          background-color: $color-darkBlue;
          color: $color-white;
        }
      }

      &--plain {
        cursor: default;
      }
    }

    .row-cell {
      padding: 0 $spacing-xs;
      word-break: break-word;
      text-align: center;
      align-self: center;

      &:nth-child(2) {
        font-weight: $font-weight-medium;
        text-align: start;
      }
    }
  }

  .block-wrapper {
    &:not(:last-child) {
      margin-bottom: $spacing-md;
    }
  }

  .block-divider {
    height: 1px;
    background: #d0d0d0;
    margin: 2px auto;
    width: 96%;
  }

  &--no-code {
    .table-header {
      grid-template-columns: minmax(0, 10fr) minmax(6rem, 1.2fr);

      .header-cell:first-child {
        text-align: left;
      }

      .header-cell:last-child {
        text-align: center;
      }
    }

    .table-row__link {
      grid-template-columns: minmax(0, 10fr) minmax(6rem, 1.2fr);
    }

    .row-cell:first-child {
      font-weight: $font-weight-medium;
      text-align: start;
    }

    .row-cell:last-child {
      text-align: center;
    }
  }
}
</style>
