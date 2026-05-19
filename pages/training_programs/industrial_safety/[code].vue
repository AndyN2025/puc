<template>
  <div class="p">
    <TrainingProgramCourseDetail
      :course="course ?? null"
      :bread-crumbs="breadCrumbs"
      :listeners-title="listenersBlockTitle"
      :page-title="pageTitle"
      :hours-display="hoursDisplay"
      :period-label="SITE_TEXT.trainingDetail.periodLabel"
      :not-found-title="SITE_TEXT.trainingPages.notFoundProgram"
      list-index-path="/training_programs/industrial_safety/"
      @download-application="downloadApplication"
      @download-program="openShortInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  findIndustrialTrainingProgramByCode,
  type IndustrialTrainingProgram
} from './utils'
import TrainingProgramCourseDetail from '@/components/trainingPrograms/TrainingProgramCourseDetail.vue'
import { downloadSafeDocument } from '@/utils/documentLinks'
import { SITE_TEXT } from '@/utils/siteText'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const course = computed<IndustrialTrainingProgram | undefined>(() => {
  if (!code.value) return undefined
  return findIndustrialTrainingProgramByCode(code.value)
})

const pageTitle = computed(() => {
  const c = course.value
  if (!c) return ''
  if (c.track === 'preAttest') {
    return `${SITE_TEXT.trainingPages.industrialPreAttestTitlePrefix} ${c.title}`
  }
  return c.title
})

const listenersBlockTitle = computed(() => {
  const t = course.value?.track
  if (t === 'preAttest') {
    return SITE_TEXT.trainingPages.listeners.industrialAttestation
  }
  return SITE_TEXT.trainingPages.listeners.categories
})

const hoursDisplay = computed(() => {
  const c = course.value
  if (!c) return ''
  return `${c.hours} ${SITE_TEXT.trainingPages.hours.hours}`
})

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
    { text: SITE_TEXT.trainingPages.breadcrumbs.trainingPrograms, link: '/training_programs/' },
    {
      text: SITE_TEXT.trainingPages.sections.industrialSafety,
      link: '/training_programs/industrial_safety/'
    }
  ]
  if (course.value) {
    const tc = course.value.textCode
    const lastText =
      tc === '—' || tc === ''
        ? course.value.title.slice(0, 80) + (course.value.title.length > 80 ? '…' : '')
        : tc
    crumbs.push({
      text: lastText,
      link: route.path
    })
  }
  return crumbs
})

const downloadApplication = () => {
  if (!course.value?.application) {
    alert(SITE_TEXT.trainingPages.alerts.missingProgramApplication)
    return
  }
  downloadSafeDocument(
    course.value.application,
    `${SITE_TEXT.trainingPages.files.applicationPrefix}_${course.value.textCode || SITE_TEXT.trainingPages.files.applicationFallback}.doc`
  )
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert(SITE_TEXT.trainingPages.alerts.missingProgramProgram)
    return
  }
  downloadSafeDocument(
    course.value.programm,
    `${SITE_TEXT.trainingPages.files.programPrefix}_${course.value.textCode || SITE_TEXT.trainingPages.files.programFallback}.doc`
  )
}
</script>
