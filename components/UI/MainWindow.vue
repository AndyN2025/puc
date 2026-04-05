<template>
  <div class="main" :style="{ backgroundImage: `url(${mainPic})` }">
    <div class="container">
      <div class="main__content">
        <h1 class="main__title">
          Дополнительное профессиональное образование<br />
          Очно, заочно, онлайн
        </h1>
        <p class="main__text">
          Более 20 лет мы занимаемся профессиональным обучением, дополнительным профессиональным образованием в области
          промышленной, экологической, энергетической, пожарной безопасности, охраны труда.
        </p>
        <div class="main__buttons">
          <button type="button" class="main__buttons-item main__buttons-item--dark" @click="callbackModalOpen = true">Заказать звонок</button>
          <NuxtLink to="/training_programs" class="main__buttons-item main__buttons-item--light">Наши курсы</NuxtLink>
          <a
            :href="`tel:${mainPhone.tel}`"
            class="main__buttons-item main__buttons-item--number"
          >{{ mainPhone.displayPlus7 }}</a>
        </div>
      </div>
    </div>
  </div>
  <CallbackRequestModal v-model="callbackModalOpen" />
</template>

<script setup lang="ts">
import mainPic from '@/assets/img/mainTest1.png'
import CallbackRequestModal from '@/components/UI/CallbackRequestModal.vue'
import { SITE_PHONES } from '@/utils/site'

const mainPhone = SITE_PHONES[0]!
const callbackModalOpen = ref(false)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;

.main {
  position: relative;
  min-height: min(95vh, 52rem);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  /* Ниже фиксированного хедера на всех экранах */
  padding-top: calc(#{$header-height} + clamp(1.75rem, 4vw, 3rem));
  padding-bottom: clamp(2.5rem, 8vw, 4rem);
  padding-left: 0;
  padding-right: 0;
  border-radius: 0 0 $radius-lg $radius-lg;

  &__content {
    width: 100%;
    max-width: 52rem;
    margin-left: 0;
    margin-right: auto;
    color: $color-white;
  }

  &__title {
    font-size: clamp(1.75rem, 5vw + 0.5rem, 4.25rem);
    line-height: $line-height-tight;
    text-transform: uppercase;
    margin: 0 0 $spacing-lg;
    font-family: $font-beb-b;
  }

  &__text {
    font-size: clamp($font-size-base, 1vw + 0.85rem, 1.125rem);
    line-height: $line-height-relaxed;
    font-family: $font-ibm;
    margin: 0 0 clamp(1.5rem, 4vw, 3.75rem);
    max-width: 42rem;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $spacing-md;
    align-items: stretch;

    @media (max-width: $bp-md) {
      flex-direction: column;
    }
  }

  &__buttons-item {
    min-height: 3.5rem;
    padding: 0 $spacing-md;
    border-radius: $radius-md;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: $font-size-lg;
    font-family: $font-ibm-m;
    text-decoration: none;
    cursor: pointer;
    flex: 1 1 auto;
    min-width: min(100%, 14rem);
    transition: background-color $transition-base, color $transition-base, transform $transition-fast;

    &:hover {
      transform: translateY(-1px);
    }

    &--dark {
      background-color: $color-darkBlue;
      color: $color-white;
    }

    &--light {
      background-color: $color-white;
      color: $color-black;
    }

    &--number {
      color: $color-white;
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      background: transparent;
    }
  }

  /* До 768px включительно: чуть ниже и по центру */
  @media (max-width: $bp-md) {
    justify-content: flex-start;
    padding-top: calc(#{$header-height} + clamp(2.25rem, 10vw, 3.5rem));
    min-height: min(100vh, 56rem);

    .main__content {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      max-width: 100%;
    }

    .main__title,
    .main__text {
      text-align: center;
    }

    .main__text {
      margin-left: auto;
      margin-right: auto;
    }

    .main__buttons {
      justify-content: center;
      align-items: stretch;
    }
  }
}
</style>
