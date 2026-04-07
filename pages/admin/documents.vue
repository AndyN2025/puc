<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: docs, refresh } = await useFetch('/api/documents')

const editing = ref<any>(null)
const creating = ref(false)
const form = reactive({ title: '', fileUrl: '' })

function startCreate() {
  creating.value = true; editing.value = null
  Object.assign(form, { title: '', fileUrl: '' })
}

function startEdit(d: any) {
  editing.value = d; creating.value = false
  Object.assign(form, { title: d.title, fileUrl: d.fileUrl })
}

function cancel() { editing.value = null; creating.value = false }

async function uploadDoc(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  const fd = new FormData()
  fd.append('file', input.files[0])
  const res = await $fetch<{ name: string; url: string }[]>('/api/admin/upload', { method: 'POST', body: fd })
  if (res?.length) {
    form.fileUrl = res[0].url
    if (!form.title) form.title = res[0].name
  }
  showToast('Файл загружен!')
}

async function save() {
  if (editing.value) {
    await $fetch(`/api/admin/documents/${editing.value.id}`, { method: 'PUT', body: form })
    showToast('Документ обновлён!')
  } else {
    await $fetch('/api/admin/documents', { method: 'POST', body: form })
    showToast('Документ добавлен!')
  }
  cancel(); await refresh()
}

async function remove(id: string) {
  if (!confirm('Удалить документ?')) return
  await $fetch(`/api/admin/documents/${id}`, { method: 'DELETE' })
  await refresh()
  showToast('Документ удалён')
}
</script>

<template>
  <div>
    <div class="admin-header-row">
      <div>
        <h1 class="admin-page-title">Бланки документов</h1>
        <p class="admin-page-desc">Загрузка и управление бланками документов</p>
      </div>
      <button class="admin-btn primary" @click="startCreate" v-if="!creating && !editing">+ Добавить документ</button>
    </div>

    <div v-if="creating || editing" class="admin-card">
      <h2 class="admin-card-title">{{ editing ? 'Редактирование' : 'Новый документ' }}</h2>
      <div class="admin-form-group">
        <label>Название документа</label>
        <input v-model="form.title" />
      </div>
      <div class="admin-form-group">
        <label>Файл документа</label>
        <input type="file" @change="uploadDoc" />
        <div v-if="form.fileUrl" style="margin-top:6px;font-size:12px;color:#6b7280">{{ form.fileUrl }}</div>
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" @click="save">💾 Сохранить</button>
        <button class="admin-btn secondary" @click="cancel">Отмена</button>
      </div>
    </div>

    <div v-if="!creating && !editing" class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Файл</th>
            <th style="width:140px">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in (docs || [])" :key="d.id">
            <td>{{ d.title }}</td>
            <td><a :href="d.fileUrl" target="_blank" style="color:#6366f1">📥 Скачать</a></td>
            <td>
              <div style="display:flex;gap:8px">
                <button class="admin-btn secondary sm" @click="startEdit(d)">✏️</button>
                <button class="admin-btn danger sm" @click="remove(d.id)">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!docs?.length" class="admin-empty">Документов пока нет</div>
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>
