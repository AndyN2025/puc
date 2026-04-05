<template>
  <div class="p">
    <TrainingProgramCourseDetail
      :course="course ?? null"
      :bread-crumbs="breadCrumbs"
      listeners-title="Категории слушателей:"
      :hours-display="hoursDisplay"
      list-index-path="/training_programs/professional_education/"
      @download-application="downloadApplication"
      @download-program="openShortInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  findProfessionalProgramByCode,
  type ProfessionalTrainingProgram
} from './utils'
import TrainingProgramCourseDetail from '@/components/trainingPrograms/TrainingProgramCourseDetail.vue'

const route = useRoute()

const code = computed(() => {
  const raw = route.params.code
  const c = Array.isArray(raw) ? raw[0] : raw
  return typeof c === 'string' ? decodeURIComponent(c) : ''
})

const course = computed<ProfessionalTrainingProgram | undefined>(() => {
  if (!code.value) return undefined
  return findProfessionalProgramByCode(code.value)
})

const hoursDisplay = computed(() => {
  const c = course.value
  if (!c) return ''
  const h = c.hours
  return typeof h === 'string' ? h : `${h} часов`
})

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: 'Главная', link: '/' },
    { text: 'Виды обучения', link: '/training_programs/' },
    {
      text: 'Профессиональная подготовка',
      link: '/training_programs/professional_education/'
    }
  ]
  if (course.value) {
    crumbs.push({
      text: course.value.title,
      link: route.path
    })
  }
  return crumbs
})

const downloadApplication = () => {
  if (!course.value?.application) {
    alert('Файл заявки не найден для этого курса')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.application
  link.download = `Заявка_${course.value.code || 'на_обучение'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert('Программа обучения не найдена для этого курса')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.programm
  link.download = `Программа_${course.value.code || 'обучения'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
