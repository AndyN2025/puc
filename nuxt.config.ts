// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true, // ← обязательно для SSG
  modules: ['@pinia/nuxt'],
  vite: {
    assetsInclude: ['**/*.doc', '**/*.docx']
  },
  css: [
    '@/assets/styles/main.scss'
  ],
  pinia: {
    storesDirs: ['./stores']
  },

  // 🔑 Ключевые настройки для GitHub Pages
  nitro: {
    preset: 'static' // ← генерирует .output/public
  },
  app: {
    baseURL: '/puc/' // ← замените "puc" на имя вашего репозитория!
  }
})