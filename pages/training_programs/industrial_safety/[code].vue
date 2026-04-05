<template>
  <div class="p">
    <TrainingProgramCourseDetail
      :course="course ?? null"
      :bread-crumbs="breadCrumbs"
      :listeners-title="listenersBlockTitle"
      :page-title="pageTitle"
      :hours-display="hoursDisplay"
      period-label="Периодичность:"
      not-found-title="Программа не найдена"
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
    return `Дополнительная общеобразовательная программа предаттестационной подготовки. ${c.title}`
  }
  return c.title
})

const listenersBlockTitle = computed(() => {
  const t = course.value?.track
  if (t === 'preAttest') {
    return 'Кто должен проходить аттестацию по промышленной безопасности:'
  }
  return 'Категории слушателей:'
})

const hoursDisplay = computed(() => {
  const c = course.value
  if (!c) return ''
  return `${c.hours} часов`
})

const breadCrumbs = computed(() => {
  const crumbs = [
    { text: 'Главная', link: '/' },
    { text: 'Виды обучения', link: '/training_programs/' },
    {
      text: 'Промышленная безопасность',
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
    alert('Файл заявки не найден для этой программы')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.application
  link.download = `Заявка_${course.value.textCode || 'на_обучение'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const openShortInfo = () => {
  if (!course.value?.programm) {
    alert('Программа обучения не найдена для этой программы')
    return
  }
  const link = document.createElement('a')
  link.href = course.value.programm
  link.download = `Программа_${course.value.textCode || 'обучения'}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
