<template>
  <header
    class="header"
    :class="{
      'header--scrolled': isScrolled,
      'header--solid': !isHomePage,
      'header--menu-open': menuOpen
    }"
  >
    <div class="header__container container">
      <HeaderBrand />
      <button
        type="button"
        class="header__burger"
        :aria-expanded="menuOpen"
        aria-controls="header-mobile-panel"
        aria-label="Открыть меню"
        @click="toggleMenu"
      >
        <span class="header__burger-line" aria-hidden="true" />
        <span class="header__burger-line" aria-hidden="true" />
        <span class="header__burger-line" aria-hidden="true" />
      </button>
      <div
        id="header-mobile-panel"
        class="header__panel"
      >
        <HeaderNav :items="navItems" />
        <div class="header__panel-contacts">
          <HeaderMail
            text="EKC_06@MAIL.RU"
            link="mailto:ekc_06@mail.ru"
          />
          <HeaderPhone
            textFirst="8 (910) 520-15-64, "
            textSecond="8 (4842) 56-21-83"
          />
        </div>
      </div>
    </div>
    <div
      v-show="menuOpen"
      class="header__backdrop"
      aria-hidden="true"
      @click="closeMenu"
    />
  </header>
</template>

<script setup lang="ts">
import HeaderBrand from './HeaderBrand.vue'
import HeaderNav from './HeaderNav.vue'
import HeaderMail from './HeaderMail.vue'
import HeaderPhone from './HeaderPhone.vue'

const route = useRoute()

const isHomePage = computed(() => {
  const p = route.path
  return p === '/' || p === '' || p === '/puc' || p === '/puc/'
})

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Об организации', to: '/sveden/common/' },
  { label: 'Обучение', to: '/training_programs/' },
  { label: 'Бланки документов', to: '/docs/' }
]

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

watch(() => route.fullPath, () => {
  closeMenu()
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
@use "./Header.scss";
</style>
