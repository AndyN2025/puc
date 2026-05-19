<template>
  <div class="p">
    <TrainingProgramCourseDetail
      :course="course ?? null"
      :bread-crumbs="breadCrumbs"
      :listeners-title="SITE_TEXT.trainingPages.listeners.categories"
      :hours-display="hoursDisplay"
      list-index-path="/training_programs/environmental_security/"
      @download-application="downloadApplication"
      @download-program="openShortInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findEnvironmentalProgramByCode, type EnvironmentalTrainingProgram } from './utils'
import TrainingProgramCourseDetail from '@/components/trainingPrograms/TrainingProgramCourseDetail.vue'
import { downloadSafeDocument } from '@/utils/documentLinks'
import { SITE_TEXT } from '@/utils/siteText'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const course = computed<EnvironmentalTrainingProgram | undefined>(() => {
  if (!code.value) return undefined
  return findEnvironmentalProgramByCode(code.value)
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
      text: SITE_TEXT.trainingPages.sections.environmentalSafety,
      link: '/training_programs/environmental_security/'
    }
  ]
  if (course.value) {
    const tc = course.value.textCode
    const lastText =
      tc === '-' || tc === ''
        ? course.value.title
        : tc || course.value.code || course.value.title
    crumbs.push({
      text: lastText,
      link: route.path
    })
  }
  return crumbs
})

const downloadApplication = () => {
  if (!course.value?.application) {
    alert(SITE_TEXT.trainingPages.alerts.missingCourseApplication)
    return
  }
  downloadSafeDocument(
    course.value.application,
    `${SITE_TEXT.trainingPages.files.applicationPrefix}_${course.value.code || SITE_TEXT.trainingPages.files.applicationFallback}.doc`
  )
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert(SITE_TEXT.trainingPages.alerts.missingCourseProgram)
    return
  }
  downloadSafeDocument(
    course.value.programm,
    `${SITE_TEXT.trainingPages.files.programPrefix}_${course.value.code || SITE_TEXT.trainingPages.files.programFallback}.doc`
  )
}
</script>
