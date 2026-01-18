<template>
  <div class="programs-table">
    <!-- Табы (опционально) -->
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
        <span v-if="tab.value === currentTab" class="checkmark">✓</span>
      </button>
    </div>

    <!-- Таблица программ -->
    <div class="table-wrapper">
      <div class="table-header">
        <div class="header-cell">Код</div>
        <div class="header-cell">{{ centralTitle }}</div>
        <div class="header-cell">Объем (часы)</div>
      </div>

      <!-- Рендерим либо блоки, либо простой список -->
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
            <div class="row-cell">{{ item.code }}</div>
            <div class="row-cell">{{ item.title }}</div>
            <div class="row-cell">{{ item.hours }} ч.</div>
          </div>
          <!-- Разделитель между блоками (кроме последнего) -->
          <div v-if="blockIndex < items.length - 1" class="block-divider"></div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="table-row"
        >
          <div class="row-cell">{{ item.code }}</div>
          <div class="row-cell">{{ item.title }}</div>
          <div class="row-cell">{{ item.hours }} ч.</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Опциональные табы
  tabs: {
    type: Array,
    default: () => null
  },
  centralTitle:{
    type: String,
  },
  // Данные для таблицы — может быть массивом объектов ИЛИ массивом массивов
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      if (!Array.isArray(items)) return false

      // Если первый элемент — массив → значит, это блоки
      if (Array.isArray(items[0])) {
        return items.every(block =>
          Array.isArray(block) &&
          block.every(item =>
            typeof item.code === 'string' &&
            typeof item.title === 'string' &&
            typeof item.hours === 'number'
          )
        )
      }

      // Иначе — обычный массив объектов
      return items.every(item =>
        typeof item.code === 'string' &&
        typeof item.title === 'string' &&
        typeof item.hours === 'number'
      )
    }
  },
  // Для двусторонней привязки текущего таба
  modelValue: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

// Локальное состояние текущего таба
const currentTab = ref(props.modelValue ?? (props.tabs?.[0]?.value ?? null))

function setTab(value, index) {
  currentTab.value = value
  emit('update:modelValue', value)
  // 🔥 Эмитим и значение, и индекс — выбирай, что удобнее
  emit('tab-change', { value, index })
  console.log('[Tab changed]', { value, index })
}

// Определяем режим: блоки или простой список
const isBlocksMode = computed(() => {
  return Array.isArray(props.items) && props.items.length > 0 && Array.isArray(props.items[0])
})
</script>

<style scoped lang="scss">
.programs-table {
  background: #f8fcff;
  border-radius: 8px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  margin-bottom: 60px;
}

.tabs-container {
  display: flex;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;

  .tab-button {
    padding: 16px 32px;
    max-width: 360px;
    width: 100%;
    background: #E9F4FF;
    border-radius: 16px 16px 0 0;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    transition: all 0.2s ease;
    border: none;

    &:hover {
      background: #d0e6fa;
    }

    &.tab-active {
      background: #123970;
      color: white;

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
  background-color: #eaf6ff;
  
  .table-header {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    background: #e0e0e0;
    padding: 24px 32px;
    font-weight: 500;
    font-size: 0.875rem;
    color: #333;

    .header-cell {
      padding: 0 4px;
      text-align: center;
    }
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    background: #eaf6ff;
    padding: 24px 32px;
    font-size: 0.875rem;

    .row-cell {
      padding: 0 4px;
      word-break: break-word;
      text-align: center;

      &:nth-child(2) {
        font-weight: 500;
        text-align: start;
      }
    }
  }

  .block-wrapper {
    &:not(:last-child) {
      margin-bottom: 16px; // Отступ между блоками
    }
  }

  .block-divider {
    height: 1px;
    background: #d0d0d0;
    margin: 2px auto;
    width: 96%;
  }
}
</style>