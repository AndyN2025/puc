<template>
  <header class="header">
    <div class="header__container">
      <HeaderBrand />
      <HeaderNav :items="navItems" />
      <HeaderMail
        :icon="mailIcon"
        text="EKC_06@MAIL.RU"
        link="mailto:ekc_06@mail.ru"
      />
      <HeaderPhone
        :icon="phoneIcon"
        textFirst="8 (910) 520-15-64, "
        textSecond="8 (4842) 56-21-83"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderBrand from './HeaderBrand.vue'
import HeaderNav from './HeaderNav.vue'
import HeaderMail from './HeaderMail.vue'

import phoneIcon from '@/assets/img/phoneIcon.svg'
import mailIcon from '@/assets/img/mailIcon.svg'

/** Навигация — источник данных (DRY) */
const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Об организации', to: '/sveden/common/' },
  { label: 'Обучение', to: '/training_programs/' },
  { label: 'Бланки документов', to: '/docs/' }
]
</script>

<style lang="scss" scoped>
@use "./Header.scss";
</style>
