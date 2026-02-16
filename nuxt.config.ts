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
    preset: 'static',           // уже есть — хорошо

    prerender: {
      crawlLinks: true,         // включить краулер (обычно по умолчанию true)
      failOnError: false,       // ← НЕ ломать всю сборку из-за одной битой страницы
      // ignore: ['/training_programs/security_work/utils/**'], // ← опционально, если хочешь временно пропустить проблемный маршрут
    }
  },
  app: {
    baseURL: '/puc/' // ← замените "puc" на имя вашего репозитория!
  }
})