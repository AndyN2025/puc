<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: classrooms, refresh } = await useFetch('/api/classrooms')

const editing = ref<any>(null)
const creating = ref(false)
const form = reactive({ name: '', content: '' })

function startCreate() {
  creating.value = true; editing.value = null
  Object.assign(form, { name: '', content: '' })
}

function startEdit(c: any) {
  editing.value = c; creating.value = false
  Object.assign(form, { name: c.name, content: c.content })
}

function cancel() { editing.value = null; creating.value = false }

async function save() {
  if (editing.value) {
    await $fetch(`/api/admin/classrooms/${editing.value.id}`, { method: 'PUT', body: form })
    showToast('Аудитория обновлена!')
  } else {
    await $fetch('/api/admin/classrooms', { method: 'POST', body: form })
    showToast('Аудитория создана!')
  }
  cancel(); await refresh()
}

async function remove(id: string) {
  if (!confirm('Удалить аудиторию?')) return
  await $fetch(`/api/admin/classrooms/${id}`, { method: 'DELETE' })
  await refresh()
  showToast('Аудитория удалена')
}
</script>

<template>
  <div>
    <div class="admin-header-row">
      <div>
        <h1 class="admin-page-title">Аудитории (МТО)</h1>
        <p class="admin-page-desc">Материально-техническое обеспечение — 3 аудитории с наполнением</p>
      </div>
      <button class="admin-btn primary" @click="startCreate" v-if="!creating && !editing">+ Добавить аудиторию</button>
    </div>

    <div v-if="creating || editing" class="admin-card">
      <h2 class="admin-card-title">{{ editing ? 'Редактирование' : 'Новая аудитория' }}</h2>
      <div class="admin-form-group">
        <label>Название</label>
        <input v-model="form.name" placeholder="Аудитория 1" />
      </div>
      <div class="admin-form-group">
        <label>Наполнение / оборудование</label>
        <textarea v-model="form.content" rows="8" placeholder="Описание оборудования и технического оснащения..." />
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" @click="save">💾 Сохранить</button>
        <button class="admin-btn secondary" @click="cancel">Отмена</button>
      </div>
    </div>

    <div v-if="!creating && !editing" class="classrooms-grid">
      <div v-for="c in (classrooms || [])" :key="c.id" class="admin-card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h2 class="admin-card-title" style="margin:0">{{ c.name }}</h2>
          <div style="display:flex;gap:8px">
            <button class="admin-btn secondary sm" @click="startEdit(c)">✏️</button>
            <button class="admin-btn danger sm" @click="remove(c.id)">🗑</button>
          </div>
        </div>
        <div style="white-space:pre-wrap;font-size:14px;color:#9ca3af;line-height:1.6">{{ c.content || 'Нет данных' }}</div>
      </div>
    </div>

    <div v-if="!classrooms?.length && !creating && !editing" class="admin-card admin-empty">
      Аудиторий пока нет. Нажмите "+ Добавить аудиторию"
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>

<style scoped>
.classrooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}
</style>
