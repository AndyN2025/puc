<template>
  <div class="repair">
    <div class="repair__media">
      <img
        class="repair__img"
        :src="Repair"
        alt="Технические работы на странице"
      />
    </div>
    <div class="repair__panel">
      <p class="repair__title">Страница в разработке</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Repair from '@/assets/img/repairImg.png'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.repair {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  padding: clamp(1.25rem, 4vw, 2rem) clamp(12px, 3vw, 20px) clamp(2rem, 6vw, 3rem);
  min-width: 0;
  box-sizing: border-box;
}

/* Картинка отдельным блоком — текст не заходит на неё */
.repair__media {
  flex: 0 0 auto;
  width: 100%;
  max-width: min(100%, 260px);
  margin: 0;
  padding: 0;
}

.repair__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(42vw, 220px);
  object-fit: contain;
  object-position: center bottom;
}

.repair__panel {
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
  margin-top: clamp(1.5rem, 5vw, 2.25rem);
  padding: clamp(1rem, 3.5vw, 1.35rem) clamp(1rem, 4vw, 1.5rem);
  text-align: center;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, $color-lightBlue 88%, $color-white) 0%,
    $color-white 100%
  );
  border: 1px solid $color-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-soft;
}

.repair__title {
  margin: 0;
  font-size: clamp(1.125rem, 4.5vw, 1.75rem);
  font-weight: $font-weight-semibold;
  font-family: $font-inter-m, sans-serif;
  color: $color-darkBlue;
  line-height: 1.35;
  letter-spacing: 0.02em;
}

@include m.from($bp-md) {
  .repair {
    max-width: 32rem;
  }

  .repair__media {
    max-width: 300px;
  }

  .repair__img {
    max-height: 280px;
  }

  .repair__title {
    font-size: clamp(1.35rem, 2.8vw, 1.875rem);
  }
}
</style>
