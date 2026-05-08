<template>
  <div class="steps-grid">
    <div
      v-for="(step, index) in stepsWithFile"
      :key="index"
      class="step-card"
      :class="{ 'step-card--first': index === 0 }"
    >
      <div class="step-header">
        <span class="step-number">{{ step.number }}</span>
        <div class="step-line" />
      </div>

      <h3 class="step-title">{{ step.title }}</h3>

      <p v-if="step.phoneDescription" class="step-description">
        Оформить заявку можно онлайн на нашем сайте или позвонив по
        <a class="step-description__link" :href="'tel:' + primaryPhoneHref">{{ primaryPhoneLabel }}</a>.
        Наши специалисты свяжутся с Вами для уточнения всех деталей.
      </p>
      <p v-else-if="step.phoneCompact" class="step-description">
        Онлайн на нашем сайте или позвонив по
        <a class="step-description__link" :href="'tel:' + primaryPhoneHref">{{ primaryPhoneLabel }}</a>.
        Наши специалисты свяжутся с Вами для уточнения всех деталей.
      </p>
      <p v-else-if="step.phoneSiteNumber" class="step-description">
        Оформить заявку можно на сайте или позвонив по
        <a class="step-description__link" :href="'tel:' + primaryPhoneHref">номеру</a>. Наши специалисты
        свяжутся с Вами для уточнения деталей
      </p>
      <template v-else-if="step.bullets?.length">
        <p v-if="step.description" class="step-description">{{ step.description }}</p>
        <ul class="step-bullets">
          <li v-for="(item, bi) in step.bullets" :key="bi">{{ item }}</li>
        </ul>
      </template>
      <p v-else-if="step.description" class="step-description">{{ step.description }}</p>

      <div v-if="step.img" class="step-description__post post">
        <div class="post-top">
          <img :src="step.img" alt="Почта России" />
          <div class="post__description">
            <h5 class="post__description-title">Почта России</h5>
            <div class="post__description-item">
              <span class="post__description-item__title">Стоимость: </span>
              <span class="post__description-item__desc">Бесплатно</span>
            </div>

            <div class="post__description-item">
              <span class="post__description-item__title">Срок: </span>
              <span class="post__description-item__desc">От 3-х дней</span>
            </div>
          </div>
        </div>
        <div class="post-bottom">
          Заказное письмо с уведомлением. Трек-номер для отслеживания письма отправляется на электронную почту.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logoPostRF from '@/assets/img/common/logo_postrf.png'
import { SITE_PHONES } from '@/utils/site'

export type IndustrialWorkflowTab = 'pre_attest' | 'qualification'

/** Пожарная / экология / прекурсоры / охрана труда — сценарий из макета (6 шагов); энергетика — отдельный макет */
export type StepsPreset =
  | 'remote_standard'
  | 'energy'
  | 'opo_worker'
  | 'professional_preparation'

interface StepDef {
  number: number
  title: string
  description?: string
  /** Промка, предаттестационная ветка: длинный текст заявки + телефон */
  phoneDescription?: boolean
  /** Пожарка, экология и др.: короткий текст + телефон */
  phoneCompact?: boolean
  /** «На сайте или по номеру» — ссылка на «номеру» */
  phoneSiteNumber?: boolean
  bullets?: string[]
  img?: string
}

const props = defineProps<{
  file?: string
  /** Промышленная безопасность: переключение по вкладке */
  workflow?: IndustrialWorkflowTab | null
  /** Фиксированный сценарий для других направлений (если задан, `workflow` не используется) */
  preset?: StepsPreset | null
}>()

const primaryPhone = SITE_PHONES[0]!
const primaryPhoneHref = primaryPhone.tel.replace(/\s+/g, '')
const primaryPhoneLabel = 'телефону'

const qualificationSteps: StepDef[] = [
  {
    number: 1,
    title: 'Вы отправляете нам заявку на обучение',
    description: 'Заявки принимаем на нашу почту. Отвечаем в течение рабочего дня.'
  },
  {
    number: 2,
    title: 'Мы заключаем с Вами договор'
  },
  {
    number: 3,
    title: 'Оплата',
    description: 'Начало обучения доступно сразу после оплаты'
  },
  {
    number: 4,
    title: 'Даем персональный логин и пароль',
    description:
      'После авторизации на портале учащийся попадает в личный кабинет, где представлены все необходимые учебные материалы по выбранной программе'
  },
  {
    number: 5,
    title: 'Проходите онлайн тестирование',
    description:
      'Скан вашего удостоверения (диплома) получаете на электронную почту после сдачи итогового тестирования'
  },
  {
    number: 6,
    title: 'Внесение документов об образовании в реестр ФИС ФРДО'
  },
  {
    number: 7,
    title: 'Отправка документов',
    img: logoPostRF
  }
]

/** Обучение рабочего персонала ОПО — текст из скрина 1 (5 шагов + блок почты на последнем шаге) */
const opoWorkerSteps: StepDef[] = [
  {
    number: 1,
    title: 'Заполнение заявки на обучение',
    phoneSiteNumber: true
  },
  {
    number: 2,
    title: 'Заключение договора и оплата',
    description:
      'После согласования условий обучения заключается договор и выставляется счет на оплату.'
  },
  {
    number: 3,
    title: 'Прохождение обучения',
    description:
      'Каждому слушателю предоставляется доступ к учебным материалам выбранного курса (онлайн-семинары, лекции) на базе современной СДО с поддержкой куратора и команды методистов.'
  },
  {
    number: 4,
    title: 'Получение документа об обучении',
    description:
      'Результаты обучения и прохождения проверки знаний обслуживающего персонала (рабочих) оформляются протоколом, с отметкой в удостоверении о допуске к самостоятельной работе.'
  },
  {
    number: 5,
    title: 'Отправка документов',
    description: 'Доставка документов по России.',
    img: logoPostRF
  }
]

/**
 * Профессиональная подготовка: шаги 1–3 как на скрине 1 для рабочих; далее — личный кабинет,
 * итоговое тестирование, ФИС ФРДО и отправка (скрин 2 / общий профессиональный сценарий).
 */
const professionalPrepSteps: StepDef[] = [
  {
    number: 1,
    title: 'Заполнение заявки на обучение',
    phoneSiteNumber: true
  },
  {
    number: 2,
    title: 'Заключение договора и оплата',
    description:
      'После согласования условий обучения заключается договор и выставляется счет на оплату.'
  },
  {
    number: 3,
    title: 'Прохождение обучения',
    description:
      'Каждому слушателю предоставляется доступ к учебным материалам выбранного курса (онлайн-семинары, лекции) на базе современной СДО с поддержкой куратора и команды методистов.'
  },
  {
    number: 4,
    title: 'Даем персональный логин и пароль',
    description:
      'После авторизации на портале учащийся попадает в личный кабинет, где представлены все необходимые учебные материалы по выбранной программе.'
  },
  {
    number: 5,
    title: 'Проходите онлайн тестирование',
    description:
      'Скан вашего удостоверения (диплома) получаете на электронную почту после сдачи итогового тестирования.'
  },
  {
    number: 6,
    title: 'Внесение документов об образовании в реестр ФИС ФРДО'
  },
  {
    number: 7,
    title: 'Отправка документов',
    img: logoPostRF
  }
]

/** Пожарная безопасность, экология, прекурсоры, охрана труда (дистанционно) */
const remoteStandardSteps: StepDef[] = [
  {
    number: 1,
    title: 'Заполнение заявки на обучение',
    phoneCompact: true
  },
  {
    number: 2,
    title: 'Заключение договора и оплата',
    description:
      'После согласования условий обучения заключается договор и выставляется счет на оплату.'
  },
  {
    number: 3,
    title: 'Прохождение обучения',
    description:
      'Каждому слушателю предоставляется доступ к учебным материалам выбранного курса в режиме 24/7.'
  },
  {
    number: 4,
    title: 'Прохождение онлайн тестирования',
    description:
      'Скан вашего удостоверения (диплома) получаете на электронную почту после сдачи итогового тестирования.'
  },
  {
    number: 5,
    title: 'Внесение документа об образовании в реестр ФИС ФРДО'
  },
  {
    number: 6,
    title: 'Отправка документов',
    img: logoPostRF
  }
]

/** Энергетическая безопасность */
const energySteps: StepDef[] = [
  {
    number: 1,
    title: 'Заполнение заявки на обучение',
    phoneCompact: true
  },
  {
    number: 2,
    title: 'Заключение договора и оплата',
    description:
      'После согласования условий обучения заключается договор и выставляется счет на оплату.'
  },
  {
    number: 3,
    title: 'Прохождение обучения',
    description:
      'Тренировка на платформе идентичной Единому Порталу тестирования (ЕПТ) Ростехнадзора. Каждому слушателю предоставляется доступ к учебным материалам выбранного курса в режиме 24/7.'
  },
  {
    number: 4,
    title: 'Подготовка документов для проверки знаний в Ростехнадзоре.',
    description: 'Вышлем вам все необходимые документы и поможем их правильно заполнить:',
    bullets: [
      'Заявление в комиссию Ростехнадзора по проверке знаний норм и правил в области энергетического надзора.',
      'Журнал проверки знаний правил технической эксплуатации ТЭУ',
      'Удостоверение'
    ]
  },
  {
    number: 5,
    title: 'Подача документов в Ростехнадзор',
    description:
      'Сами отправляем документы в Ростехнадзор. Дата экзамена направляется на электронную почту организации.'
  },
  {
    number: 6,
    title: 'Прохождение проверки знаний в Ростехнадзоре',
    description:
      'Получение протокола проверки знаний правил работы на объектах теплоснабжения с отметкой в журнале и удостоверении.'
  }
]

const preAttestSteps: StepDef[] = [
  {
    number: 1,
    title: 'Заполнение заявки на обучение',
    phoneDescription: true
  },
  {
    number: 2,
    title: 'Прохождение обучения',
    description:
      'Очно, в режиме онлайн или заочно с использованием системы дистанционного обучения'
  },
  {
    number: 3,
    title: 'Тренировка на платформе идентичной Единому Порталу Тестирования (ЕПТ)',
    description:
      'Материалы для подготовки актуализируются с учетом их изменения в ЕПТ Ростехнадзора'
  },
  {
    number: 4,
    title: 'Подготовка документов для аттестации в Ростехнадзоре',
    description: 'Вышлем вам все необходимые документы, поможем их правильно заполнить'
  },
  {
    number: 5,
    title: 'Подача документов в Ростехнадзор',
    description:
      'Сами отправляем документы в Ростехнадзор. Дата экзамена направляется на электронную почту организации'
  },
  {
    number: 6,
    title: 'Прохождение аттестации в Ростехнадзоре'
  },
  {
    number: 7,
    title: 'Получение на электронную почту протокола заседания аттестационной комиссии Ростехнадзора.'
  }
]

function baseSteps(workflow?: IndustrialWorkflowTab | null, preset?: StepsPreset | null): StepDef[] {
  if (workflow === 'pre_attest') return preAttestSteps
  if (workflow === 'qualification') return qualificationSteps
  if (preset === 'remote_standard') return remoteStandardSteps
  if (preset === 'energy') return energySteps
  if (preset === 'opo_worker') return opoWorkerSteps
  if (preset === 'professional_preparation') return professionalPrepSteps
  return qualificationSteps
}

const stepsWithFile = computed(() => {
  const steps = baseSteps(props.workflow ?? null, props.preset ?? null).map((s) => ({ ...s }))
  if (props.file && steps[0]) {
    ;(steps[0] as StepDef & { file?: string }).file = props.file
  }
  return steps
})
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
        flex-shrink: 0;
        margin-right: 12px;
      }

      .step-line {
        flex: 1;
        height: 1px;
        background: #c4c4c4;
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

      &__link {
        color: #123970;
        text-decoration: underline;
        font-weight: 500;

        &:hover {
          color: #004494;
        }
      }
    }

    .step-bullets {
      margin: 0 0 16px 0;
      padding-left: 1.25rem;
      font-size: 1rem;
      color: #555;
      line-height: 1.5;
      font-family: 'IBM', sans-serif;
      list-style-type: disc;

      li + li {
        margin-top: 0.5rem;
      }
    }
  }
}

.post {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &-top {
    display: flex;
    flex-direction: row;
    gap: 10px;

    img {
      height: 60px;
      margin-top: 10px;
    }
  }
}
</style>
