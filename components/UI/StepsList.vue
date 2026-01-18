<template>
  <div class="steps-grid">
    <div
      v-for="(step, index) in stepsWithFile"
      :key="index"
      class="step-card"
      :class="{ 'step-card--first': index === 0 }"
    >
      <!-- Цифра и линия -->
      <div class="step-header">
        <span class="step-number">{{ step.number }}</span>
        <div class="step-line"></div>
      </div>

      <!-- Заголовок -->
      <h3 class="step-title">{{ step.title }}</h3>

      <!-- Описание -->
      <a class="step-description" v-if="index === 1" href="#">{{ step.description }}</a>
      <p class="step-description" v-if="index !== 1">{{ step.description }}</p>

      <!-- Кнопка (только для первого элемента) -->
      <button
        v-if="step.buttonText"
        type="button"
        class="step-button"
        @click="handleButtonClick(step)"
      >
        {{ step.buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  file?: string 
}>()

const emit = defineEmits<{
  (e: 'submit', step: any): void
}>()

// Добавляем file к первому шагу, если он задан
const stepsWithFile = computed(() => {
  const steps = [...defaultSteps]
  if (props.file && steps[0]) {
    steps[0].file = props.file
  }
  return steps
})

const handleButtonClick = (step: any) => {
  if (step.file) {
    // Скачиваем файл
    const link = document.createElement('a')
    link.href = step.file
    link.download = '' // браузер предложит имя файла из URL
    link.target = '_blank' // необязательно, но безопаснее
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    // Если файла нет — просто эмитим событие (как раньше)
    emit('submit', step)
  }
}

const defaultSteps = [
  {
    number: 1,
    title: 'Вы отправляете нам заявку на обучение',
    description: 'Заявки принимаем на нашу почту. Отвечаем в течение рабочего дня.',
    buttonText: 'Открыть заявку'
  },
  {
    number: 2,
    title: 'Мы заключаем с Вами договор',
    description: 'Текст договора',
    link: '#'
  },
  {
    number: 3,
    title: 'Оплата',
    description: 'Оплата удобным вам способом по реквизитам Учебного центра. Начало обучения доступно сразу после оплаты'
  },
  {
    number: 4,
    title: 'Даем персональный логин и пароль',
    description: 'После авторизации на портале учащийся попадает в личный кабинет, где представлены все необходимые учебные материалы по выбранной программе'
  },
  {
    number: 5,
    title: 'Проходите онлайн тестирование',
    description: 'Скан вашего удостоверения (диплома) получаете на электронную почту после сдачи итогового тестирования'
  },
  {
    number: 6,
    title: 'Отправка документов удобным способом',
    description: 'Получение документов с доставкой по РФ от 3-х дней'
  }
]

</script>

<style scoped lang="scss">
.steps-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  background: #f0f7ff;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 70px;

  .step-card {
    flex: 1 1 calc(33.333% - 16px);
    padding: 18px;
    position: relative;

    @media (max-width: 768px) {
      flex: 1 1 100%;
    }

    &--first {
      .step-button {
        margin-top: 16px;
        padding: 8px 16px;
        background: #123970;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;

        &:hover {
          background: #004494;
        }
      }
    }

    .step-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: #123970;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        font-size: 1rem;
        margin-right: 12px;
      }

      .step-line {
        flex: 1;
        height: 1px;
        background: #123970;
      }
    }

    .step-title {
      font-size: 1rem;
      color: #333;
      margin: 0 0 12px 0;
      font-family: 'Inter B', sans-serif;
    }

    .step-description {
      font-size: 1rem;
      color: #555;
      line-height: 1.5;
      margin: 0 0 16px 0;
      font-family: 'IBM', sans-serif;
    }
  }
}
</style>