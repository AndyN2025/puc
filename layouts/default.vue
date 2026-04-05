<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <NuxtPage />
    </main>
    <Footer />
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/Header.vue"
import Footer from "@/components/Footer/Footer.vue"
import CookieConsent from "@/components/UI/CookieConsent.vue"
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
  overflow-x: hidden;
}

.main {
  flex: 1;
  min-width: 0;
  max-width: 100%;
}
</style>
