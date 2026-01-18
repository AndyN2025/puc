// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  vite: {
    assetsInclude: ['**/*.doc', '**/*.docx']
  },
  css: [
    '@/assets/styles/main.scss'
  ],

  pinia: {
    storesDirs: ['./stores']
  }
})
