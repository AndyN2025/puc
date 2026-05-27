<template>
  <div class="p">
    <TrainingProgramCourseDetail
      :course="course ?? null"
      :bread-crumbs="breadCrumbs"
      :listeners-title="SITE_TEXT.trainingPages.listeners.categories"
      :hours-display="hoursDisplay"
      list-index-path="/training_programs/trafficking_in_drugs/"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { drugsPrograms, type DrugsTrainingProgram } from './utils'
import TrainingProgramCourseDetail from '@/components/trainingPrograms/TrainingProgramCourseDetail.vue'
import { SITE_TEXT } from '@/utils/siteText'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const course = computed<DrugsTrainingProgram | undefined>(() =>
  drugsPrograms.find((p) => p.code === code.value)
)

const hoursDisplay = computed(() => {
  const c = course.value
  if (!c) return ''
  return `${c.hours} ${SITE_TEXT.trainingPages.hours.hour}`
})

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: SITE_TEXT.trainingPages.breadcrumbs.home, link: '/' },
    { text: SITE_TEXT.trainingPages.breadcrumbs.trainingPrograms, link: '/training_programs/' },
    {
      text: SITE_TEXT.trainingPages.sections.drugs,
      link: '/training_programs/trafficking_in_drugs/'
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

</script>
