<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/Header.vue"
import Footer from "@/components/Footer/Footer.vue"
</script>

<style lang="scss" scoped>
.wrapper{
  max-width: 1480px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main{
  padding-top: 10px;
  flex: 1;
}
</style>
