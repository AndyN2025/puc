<template>
  <div class="site-navigation">
    <div class="nav-grid">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.link"
        class="nav-item"
        :class="{ 'is-active': index === activeIndex }"
      >
        {{ item.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      return items.every(item =>
        typeof item.text === 'string' &&
        typeof item.link === 'string'
      )
    }
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => null
  },
  modelValue: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const currentTab = ref(props.modelValue ?? (props.tabs?.[0]?.value ?? null))

function setTab(value) {
  currentTab.value = value // <-- .value, потому что ref!
  emit('update:modelValue', value)
  console.log('[Tab changed]', value)
}
</script>

<style lang="scss" scoped>
.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.tab-button {
  padding: 12px 32px;
  max-width: 180px;
  width: 100%;
  background: #E9F4FF;
  border-radius: 16px 16px 0 0;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background-color: #123970;
    color: white;
  }

  &.tab-active {
    background-color: #123970;
    color: white;
  }
}

.site-navigation {
  // background-color: #eaf6ff;
  // padding: 24px;
  // border-radius: 8px;
  margin-bottom: 60px;

  .nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background-color: #eaf6ff;
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 32px;

    .nav-item {
      display: inline-block;
      padding: 8px 16px;
      margin: 2px 10px;
      border-radius: 6px;
      text-align: center;
      font-size: 0.9375rem;
      color: #333;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: #123970;
        color: white;
      }

      &.is-active {
        background-color: #123970;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
          background-color: #004494;
        }
      }
    }
  }
}
</style>