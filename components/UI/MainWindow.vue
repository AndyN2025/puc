<template>
  <div class="main" :style="{ backgroundImage: `url(${mainPic})` }">
    <div class="main__content container">
      <h1 class="main__title">
        Дополнительное профессиональное образование<br />
        Очно, заочно, онлайн
      </h1>
      <p class="main__text">
        Более 20 лет мы занимаемся профессиональным обучением, дополнительным профессиональным образованием в области
        промышленной, экологической, энергетической, пожарной безопасности, охраны труда.
      </p>
      <div class="main__buttons">
        <button type="button" class="main__buttons-item main__buttons-item--dark">Заказать звонок</button>
        <NuxtLink to="/training_programs" class="main__buttons-item main__buttons-item--light">Наши курсы</NuxtLink>
        <a :href="'tel:' + telNumber" class="main__buttons-item main__buttons-item--number">+7 (4842) 56-21-83</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mainPic from '@/assets/img/mainTest1.png'

const telNumber = ref('84842562183')
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

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
  padding: clamp(4rem, 12vw, 6rem) 0 clamp(2.5rem, 8vw, 4rem);
  border-radius: 0 0 $radius-lg $radius-lg;

  &__content {
    max-width: 52rem;
    margin-left: 50px;
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

    @include m.until($bp-md) {
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
}
</style>
