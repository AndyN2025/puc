<template>
  <header
    class="header"
    :class="{
      'header--home-top': isHomeTop,
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
        :aria-label="menuOpen ? SITE_TEXT.common.closeMenu : SITE_TEXT.common.openMenu"
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
            :text="SITE_EMAIL_HEADER_DISPLAY"
            :link="siteMailto()"
          />
          <HeaderPhone
            :textFirst="headerPhoneFirst"
            :textSecond="headerPhoneSecond"
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
import {
  SITE_EMAIL_HEADER_DISPLAY,
  SITE_PHONES,
  siteMailto
} from '@/utils/site'
import { SITE_TEXT } from '@/utils/siteText'

const route = useRoute()

const isHomePage = computed(() => {
  const p = route.path
  return p === '/' || p === '' || p === '/puc' || p === '/puc/'
})

const headerPhoneFirst = `${SITE_PHONES[2]!.display8}, `
const headerPhoneSecond = SITE_PHONES[0]!.display8

const navItems = SITE_TEXT.header.nav

const isScrolledPastTop = ref(false)
const menuOpen = ref(false)

/** Главная, scrollY < 100px; при открытом меню снимаем — иначе белый крест на белой панели */
const isHomeTop = computed(
  () => isHomePage.value && !isScrolledPastTop.value && !menuOpen.value
)

const handleScroll = () => {
  isScrolledPastTop.value = window.scrollY >= 80
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
  if (import.meta.client) {
    handleScroll()
  }
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
