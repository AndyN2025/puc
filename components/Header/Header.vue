<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container container">
      <HeaderBrand />
      <HeaderNav :items="navItems" />
      <HeaderMail
        text="EKC_06@MAIL.RU"
        link="mailto:ekc_06@mail.ru"
      />
      <HeaderPhone
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

/** Навигация — источник данных (DRY) */
const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Об организации', to: '/sveden/common/' },
  { label: 'Обучение', to: '/training_programs/' },
  { label: 'Бланки документов', to: '/docs/' }
]

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // проверить начальное положение
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use "./Header.scss";
</style>
