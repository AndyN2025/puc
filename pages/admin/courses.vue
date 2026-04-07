<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: categories, refresh } = await useFetch('/api/admin/categories')

const activeTab = ref('')
watch(categories, (cats) => {
  if (cats?.length && !activeTab.value) activeTab.value = cats[0].slug
}, { immediate: true })

const activeCat = computed(() => (categories.value || []).find((c: any) => c.slug === activeTab.value))

// Course editing
const editingCourse = ref<any>(null)
const creatingCourse = ref(false)
const courseForm = reactive({
  code: '', textCode: '', title: '', hours: '', mainDescription: '',
  users: [''], requirements: [''], format: '', period: '',
  applicationFile: '', programFile: '', categorySlug: ''
})

function startCreateCourse() {
  creatingCourse.value = true
  editingCourse.value = null
  Object.assign(courseForm, {
    code: '', textCode: '', title: '', hours: '', mainDescription: '',
    users: [''], requirements: [''], format: '', period: '',
    applicationFile: '', programFile: '', categorySlug: activeTab.value
  })
}

function startEditCourse(c: any) {
  editingCourse.value = c
  creatingCourse.value = false
  Object.assign(courseForm, {
    code: c.code, textCode: c.textCode, title: c.title, hours: c.hours,
    mainDescription: c.mainDescription || '',
    users: c.users?.length ? [...c.users] : [''],
    requirements: c.requirements?.length ? [...c.requirements] : [''],
    format: c.format || '', period: c.period || '',
    applicationFile: c.applicationFile || '', programFile: c.programFile || '',
    categorySlug: c.categorySlug
  })
}

function cancelCourse() { editingCourse.value = null; creatingCourse.value = false }

async function saveCourse() {
  if (editingCourse.value) {
    await $fetch(`/api/admin/courses/${editingCourse.value.id}`, { method: 'PUT', body: courseForm })
    showToast('Курс обновлён!')
  } else {
    await $fetch('/api/admin/courses', { method: 'POST', body: courseForm })
    showToast('Курс создан!')
  }
  cancelCourse()
  await refresh()
}

async function toggleCourse(c: any) {
  await $fetch(`/api/admin/courses/${c.id}`, { method: 'PUT', body: { ...c, isEnabled: !c.isEnabled, users: c.users, requirements: c.requirements } })
  await refresh()
  showToast(c.isEnabled ? 'Курс отключён' : 'Курс включён')
}

async function deleteCourse(id: string) {
  if (!confirm('Удалить курс?')) return
  await $fetch(`/api/admin/courses/${id}`, { method: 'DELETE' })
  await refresh()
  showToast('Курс удалён')
}

async function toggleCategory(cat: any) {
  await $fetch(`/api/admin/categories/${cat.id}`, { method: 'PUT', body: { title: cat.title, isEnabled: !cat.isEnabled } })
  await refresh()
  showToast(cat.isEnabled ? 'Категория отключена' : 'Категория включена')
}

// File upload helpers
async function uploadFile(event: Event, target: 'applicationFile' | 'programFile') {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  const fd = new FormData()
  fd.append('file', input.files[0])
  const res = await $fetch<{ name: string; url: string }[]>('/api/admin/upload', { method: 'POST', body: fd })
  if (res?.length) courseForm[target] = res[0].url
  showToast('Файл загружен!')
}

function addUser() { courseForm.users.push('') }
function removeUser(i: number) { courseForm.users.splice(i, 1) }
function addReq() { courseForm.requirements.push('') }
function removeReq(i: number) { courseForm.requirements.splice(i, 1) }
</script>

<template>
  <div>
    <div class="admin-header-row">
      <div>
        <h1 class="admin-page-title">Учебные курсы</h1>
        <p class="admin-page-desc">Управление категориями и курсами по вкладкам</p>
      </div>
      <button class="admin-btn primary" @click="startCreateCourse" v-if="!creatingCourse && !editingCourse">+ Добавить курс</button>
    </div>

    <!-- Category tabs -->
    <div class="admin-tabs">
      <button
        v-for="cat in (categories || [])" :key="cat.slug"
        class="admin-tab"
        :class="{ active: activeTab === cat.slug }"
        @click="activeTab = cat.slug"
      >
        {{ cat.title }}
        <span v-if="!cat.isEnabled" style="opacity:0.5"> (скрыт)</span>
      </button>
    </div>

    <!-- Category toggle -->
    <div v-if="activeCat" class="admin-card" style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px">
      <div>
        <strong>{{ activeCat.title }}</strong>
        <span :class="['admin-badge', activeCat.isEnabled ? 'enabled' : 'disabled']" style="margin-left:12px">
          {{ activeCat.isEnabled ? 'Активна' : 'Скрыта' }}
        </span>
      </div>
      <label class="admin-toggle">
        <input type="checkbox" :checked="activeCat.isEnabled" @change="toggleCategory(activeCat)" />
        <span class="slider"></span>
      </label>
    </div>

    <!-- Course form -->
    <div v-if="creatingCourse || editingCourse" class="admin-card">
      <h2 class="admin-card-title">{{ editingCourse ? 'Редактирование курса' : 'Новый курс' }}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
        <div class="admin-form-group">
          <label>Код курса</label>
          <input v-model="courseForm.code" />
        </div>
        <div class="admin-form-group">
          <label>Код (отображаемый)</label>
          <input v-model="courseForm.textCode" />
        </div>
        <div class="admin-form-group">
          <label>Кол-во часов</label>
          <input v-model="courseForm.hours" />
        </div>
      </div>
      <div class="admin-form-group">
        <label>Наименование</label>
        <input v-model="courseForm.title" />
      </div>
      <div class="admin-form-group">
        <label>Описание курса</label>
        <textarea v-model="courseForm.mainDescription" rows="4" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="admin-form-group">
          <label>Форма обучения</label>
          <input v-model="courseForm.format" />
        </div>
        <div class="admin-form-group">
          <label>Периодичность</label>
          <input v-model="courseForm.period" />
        </div>
      </div>

      <div class="admin-form-group">
        <label>Кто должен проходить аттестацию</label>
        <div v-for="(_, i) in courseForm.users" :key="'u'+i" style="display:flex;gap:8px;margin-bottom:6px">
          <input v-model="courseForm.users[i]" style="flex:1" />
          <button class="admin-btn danger sm" @click="removeUser(i)" :disabled="courseForm.users.length <= 1">✕</button>
        </div>
        <button class="admin-btn secondary sm" @click="addUser">+ Пункт</button>
      </div>

      <div class="admin-form-group">
        <label>Требования</label>
        <div v-for="(_, i) in courseForm.requirements" :key="'r'+i" style="display:flex;gap:8px;margin-bottom:6px">
          <input v-model="courseForm.requirements[i]" style="flex:1" />
          <button class="admin-btn danger sm" @click="removeReq(i)" :disabled="courseForm.requirements.length <= 1">✕</button>
        </div>
        <button class="admin-btn secondary sm" @click="addReq">+ Пункт</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="admin-form-group">
          <label>Заявка на обучение (файл)</label>
          <input type="file" @change="(e) => uploadFile(e, 'applicationFile')" />
          <div v-if="courseForm.applicationFile" style="margin-top:6px;font-size:12px;color:#6b7280">
            {{ courseForm.applicationFile }}
          </div>
        </div>
        <div class="admin-form-group">
          <label>Программа обучения (файл)</label>
          <input type="file" @change="(e) => uploadFile(e, 'programFile')" />
          <div v-if="courseForm.programFile" style="margin-top:6px;font-size:12px;color:#6b7280">
            {{ courseForm.programFile }}
          </div>
        </div>
      </div>

      <div class="admin-actions">
        <button class="admin-btn primary" @click="saveCourse">💾 Сохранить</button>
        <button class="admin-btn secondary" @click="cancelCourse">Отмена</button>
      </div>
    </div>

    <!-- Courses table -->
    <div v-if="!creatingCourse && !editingCourse && activeCat" class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th style="width:50px">Вкл</th>
            <th style="width:100px">Код</th>
            <th>Наименование</th>
            <th style="width:80px">Часы</th>
            <th style="width:140px">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in activeCat.courses" :key="c.id" :style="{ opacity: c.isEnabled ? 1 : 0.5 }">
            <td>
              <label class="admin-toggle">
                <input type="checkbox" :checked="c.isEnabled" @change="toggleCourse(c)" />
                <span class="slider"></span>
              </label>
            </td>
            <td><code style="font-size:12px">{{ c.textCode || c.code }}</code></td>
            <td>{{ c.title }}</td>
            <td>{{ c.hours }}</td>
            <td>
              <div style="display:flex;gap:8px">
                <button class="admin-btn secondary sm" @click="startEditCourse(c)">✏️</button>
                <button class="admin-btn danger sm" @click="deleteCourse(c.id)">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!activeCat.courses?.length" class="admin-empty">Курсов нет</div>
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>
