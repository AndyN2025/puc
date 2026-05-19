import { SITE_EMAIL } from './utils/site'
import { firePrograms } from './pages/training_programs/fire_safety/utils'
import { environmentalProgramsPpo, environmentalProgramsPq } from './pages/training_programs/environmental_security/utils'
import { energyPrograms } from './pages/training_programs/energy_security/utils'
import { drugsPrograms } from './pages/training_programs/trafficking_in_drugs/utils'
import { opoWorkerPrograms } from './pages/training_programs/tematicheskie_seminary/utils'
import { professionalPrograms } from './pages/training_programs/professional_education/utils'
import { industrialTrainingPrograms } from './pages/training_programs/industrial_safety/utils'
import { newsPrerenderPaths } from './data/news'
import { SITE_COPY, SITE_ORG } from './utils/site'

function trainingCourseRoutes(
  base: string,
  programs: { code: string }[]
): string[] {
  return programs.map((p) => `${base}/${encodeURIComponent(p.code)}`)
}

const extraPrerenderRoutes = [
  ...trainingCourseRoutes('/training_programs/fire_safety', firePrograms),
  ...trainingCourseRoutes(
    '/training_programs/environmental_security',
    [...environmentalProgramsPq, ...environmentalProgramsPpo]
  ),
  ...trainingCourseRoutes('/training_programs/energy_security', energyPrograms),
  ...trainingCourseRoutes('/training_programs/trafficking_in_drugs', drugsPrograms),
  ...trainingCourseRoutes(
    '/training_programs/tematicheskie_seminary',
    opoWorkerPrograms
  ),
  ...trainingCourseRoutes(
    '/training_programs/professional_education',
    professionalPrograms
  ),
  ...trainingCourseRoutes('/training_programs/industrial_safety', industrialTrainingPrograms),
  ...newsPrerenderPaths
]

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://yandex.ru https://*.yandex.ru",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:"
].join('; ')

const securityHeaders = {
  'Content-Security-Policy': contentSecurityPolicy,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'X-Frame-Options': 'SAMEORIGIN'
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  ignore: ['**/pages/**/*.ts'],
  modules: ['@pinia/nuxt', '@nuxt/image'],

  /** GitHub Pages: без сервера IPX, только корректный baseURL в src */
  image: {
    provider: 'none'
  },

  /**
   * Почта для формы «Заказать звонок» (server/api/callback-request.post.ts).
   * Задайте в .env: NUXT_CALLBACK_SMTP_HOST, NUXT_CALLBACK_SMTP_USER, NUXT_CALLBACK_SMTP_PASS,
   * NUXT_CALLBACK_MAIL_TO, NUXT_CALLBACK_MAIL_FROM (от кого, часто = SMTP user).
   */
  runtimeConfig: {
    /** Заявки «Заказать звонок» (по умолчанию = SITE_EMAIL в utils/site.ts) */
    callbackMailTo: SITE_EMAIL,
    callbackMailFrom: '',
    callbackSmtpHost: '',
    callbackSmtpPort: '465',
    callbackSmtpSecure: 'true',
    callbackSmtpUser: '',
    callbackSmtpPass: ''
  },
  vite: {
    assetsInclude: ['**/*.doc', '**/*.docx']
  },
  css: [
    '@/assets/styles/main.scss'
  ],
  pinia: {
    storesDirs: ['./stores']
  },

  nitro: {
    preset: 'static',
    routeRules: {
      '/**': {
        headers: securityHeaders
      }
    },

    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: extraPrerenderRoutes
    }
  },
  app: {
    baseURL: '/puc/',
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: `${SITE_ORG.shortName} — ДПО и обучение в Калуге`,
      meta: [
        {
          name: 'description',
          content: SITE_COPY.contactsLead
        }
      ]
    }
  }
})