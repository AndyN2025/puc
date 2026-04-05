<template>
  <Teleport to="body">
    <div class="consultation-widget">
      
      <button 
        class="consultation-widget__icon-btn"
        :class="{ 'consultation-widget__icon-btn--pulse': isPulsing }"
        @click="toggleForm"
        aria-label="Позвонить"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </button>

      
      <transition name="form-slide">
        <div 
          v-if="isFormVisible"
          class="consultation-widget__form"
        >
          
          <button 
            class="consultation-widget__close"
            @click="toggleForm"
            aria-label="Закрыть"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          
          <div class="consultation-widget__decoration">
            <div class="consultation-widget__decoration-circle"></div>
            <div class="consultation-widget__decoration-circle"></div>
            <div class="consultation-widget__decoration-circle"></div>
          </div>

          <div class="consultation-widget__content">
            <div class="consultation-widget__header">
              
              <h3 class="consultation-widget__title">{{ props.title }}</h3>
            </div>

            <p class="consultation-widget__description">
              {{ props.description }}
            </p>

            <div class="consultation-widget__divider"></div>

            <div class="consultation-widget__section">
              <h4 class="consultation-widget__section-title">Наши телефоны:</h4>
              <div class="consultation-widget__phones">
                <a 
                  v-for="(phone, index) in props.phones" 
                  :key="index"
                  :href="`tel:${phone.number}`"
                  class="consultation-widget__phone-card"
                  @click="handleCall"
                >
                  <div class="consultation-widget__phone-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <span class="consultation-widget__phone-number">{{ phone.formatted }}</span>
                  
                </a>
              </div>
            </div>

            <div class="consultation-widget__footer">
              <div class="consultation-widget__schedule-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span class="consultation-widget__schedule-text">{{ props.schedule }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { sitePhonesForConsultantWidget } from '@/utils/site'

const props = defineProps({
  delay: {
    type: Number,
    default: 4000
  },
  phones: {
    type: Array,
    default: () => sitePhonesForConsultantWidget()
  },
  title: {
    type: String,
    default: 'Бесплатная консультация'
  },
  description: {
    type: String,
    default: 'Подберем нужную программу обучения, если вы еще не определились'
  },
  schedule: {
    type: String,
    default: 'Пн-Пт: 9:00 - 18:00'
  },
  autoShow: {
    type: Boolean,
    default: true
  }
})

const isPulsing = ref(true)
const isFormVisible = ref(false)
let showTimer = null

const toggleForm = () => {
  console.log('[Widget] toggleForm вызван, текущее состояние:', isFormVisible.value)
  
  if (showTimer) {
    console.log('[Widget] Очищаем таймер')
    clearTimeout(showTimer)
    showTimer = null
  }
  
  isFormVisible.value = !isFormVisible.value
  
  if (!isFormVisible.value) {
    console.log('[Widget] Форма закрыта, включаем моргание')
    isPulsing.value = true
  } else {
    console.log('[Widget] Форма открыта, выключаем моргание')
    isPulsing.value = false
  }
}

const handleCall = () => {
  console.log('[Widget] Пользователь нажал на номер телефона')
}

const initWidget = () => {
  console.log('[Widget] 🚀 initWidget вызван')
  console.log('[Widget] autoShow:', props.autoShow)
  console.log('[Widget] delay:', props.delay, 'мс')
  
  if (props.autoShow) {
    console.log('[Widget] ⏰ Запускаем таймер на', props.delay, 'мс')
    
    showTimer = setTimeout(() => {
      console.log('[Widget] ✅ Таймер сработал! Открываем форму')
      isFormVisible.value = true
      isPulsing.value = false
      console.log('[Widget] isFormVisible =', isFormVisible.value)
    }, props.delay)
    
    console.log('[Widget] Таймер ID:', showTimer)
  }
}

onMounted(() => {
  console.log('[Widget] 📦 onMounted - компонент смонтирован')
  initWidget()
})

onUnmounted(() => {
  console.log('[Widget] 🗑️ onUnmounted - компонент размонтирован')
  if (showTimer) {
    clearTimeout(showTimer)
    console.log('[Widget] Таймер очищен')
  }
})

const forceShowForm = () => {
  console.log('[Widget] forceShowForm вызван')
  isFormVisible.value = true
  isPulsing.value = false
  
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

const forceHideForm = () => {
  console.log('[Widget] forceHideForm вызван')
  isFormVisible.value = false
  isPulsing.value = true
  
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

defineExpose({
  forceShowForm,
  forceHideForm,
  toggleForm
})
</script>

<style scoped lang="scss">
.consultation-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  &__close{
    border: none;
    position: absolute;
    top: 20px;
    right: 20px;
    height: 26px;
    width: 26px;
  }

  &__title{
    color: white;
    text-align: center;
    margin: 2px 0 10px 0;
    font-family: 'IBM M', sans-serif;
    font-size: 18px;
  }

  &__description{
    color: white;
    text-align: start;
    margin: 2px 0 18px 0;
    font-family: 'IBM', sans-serif;
    font-size: 16px;
  }

  &__phones{
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 22px;
  }

  &__section-title{
    color: white;
    margin-bottom: 8px;
  }

  &__phone-icon,
  &__shedule-icon{
    display: flex;
    align-items: center;
  }

  &__phone-card{
    display: flex;
    flex-direction: row;
    gap: 4px;
    color: white;
    align-items: center;
    line-height: 24px;
  }

  &__footer{
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: white;
  }
}

.consultation-widget__icon-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #123970 0%, #0d2a54 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(18, 57, 112, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 100;
  color: white;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(18, 57, 112, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    color: currentColor;
    stroke-width: 1.5;
    width: 28px;
    height: 28px;
  }

  &--pulse {
    animation: pulse 2s ease-in-out infinite;
  }
}

.consultation-widget__form {
  background: linear-gradient(145deg, #1a4a8cc9 0%, #0d2a54fc 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35), 
              0 0 40px rgba(18, 57, 112, 0.2);
  padding: 32px;
  width: 380px;
  max-width: 95vw;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 90;

  &__close {
    position: absolute;
    top: -12px;
    right: -12px;
    background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
    border: 3px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;

    &:hover {
      transform: scale(1.1) rotate(90deg);
      background: linear-gradient(135deg, #ff6666 0%, #ff0000 100%);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 20px;
      height: 20px;
      stroke-width: 2.5;
      
      stroke: var(--close-icon-stroke, white);
      display: block;
    }
  }

  &__decoration {
    position: absolute;
    top: -40px;
    left: -40px;
    opacity: 0.1;
    pointer-events: none;

    &-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, #4da6ff, #1a75ff);
      
      &:nth-child(1) {
        width: 120px;
        height: 120px;
        top: 0;
        left: 0;
      }
      
      &:nth-child(2) {
        width: 80px;
        height: 80px;
        top: 40px;
        left: 60px;
      }
      
      &:nth-child(3) {
        width: 50px;
        height: 50px;
        top: 80px;
        left: 100px;
      }
    }
  }

  &__content {
    position: relative;
    z-index: 10;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__icon-wrapper {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  &__title {
    color: white;
    font-family: 'IBM M', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &__description {
    color: rgba(255, 255, 255, 0.95);
    font-size: 15px;
    line-height: 1.7;
    margin: 0 0 24px 0;
    font-weight: 400;
  }

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    margin: 24px 0;
  }

  &__section {
    margin-bottom: 24px;

    &-title {
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  &__phones {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__phone-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateX(6px);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateX(2px);
      background: rgba(255, 255, 255, 0.2);
    }
  }

  &__phone-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #123970, #0d2a54);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.3);

    svg {
      width: 16px;
      height: 16px;
      stroke-width: 2;
      color: white;
    }
  }

  &__phone-number {
    flex: 1;
    font-size: 15px;
    font-weight: 600;
  }

  &__phone-arrow {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: all 0.3s ease;

    svg {
      width: 16px;
      height: 16px;
      stroke-width: 2;
      color: white;
    }
  }

  .consultation-widget__phone-card:hover &__phone-arrow {
    opacity: 1;
    transform: translateX(4px);
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 14px 16px;
  }

  &__schedule-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 16px;
      height: 16px;
      stroke-width: 2;
      color: white;
    }
  }

  &__schedule-text {
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
    font-weight: 500;
  }
}

.form-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.form-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateY(60px) scale(0.92);
}

.form-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.form-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.9);
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(26, 74, 140, 0.8);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(26, 74, 140, 0);
  }
}

@media (max-width: 480px) {
  .consultation-widget {
    bottom: 16px;
    right: 16px;
  }

  .consultation-widget__form {
    width: calc(100vw - 32px);
    padding: 24px;
    
    &__close {
      top: -10px;
      right: -10px;
      width: 36px;
      height: 36px;
    }
  }

  .consultation-widget__icon-btn {
    width: 50px;
    height: 50px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>