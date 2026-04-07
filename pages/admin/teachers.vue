<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: teachers, refresh } = await useFetch('/api/teachers')

const editing = ref<any>(null)
const creating = ref(false)
const form = reactive({ name: '', diploma: '', certificate: '', programs: [''] })

function startCreate() {
  creating.value = true; editing.value = null
  Object.assign(form, { name: '', diploma: '', certificate: '', programs: [''] })
}

function startEdit(t: any) {
  editing.value = t; creating.value = false
  const progs = typeof t.programs === 'string' ? JSON.parse(t.programs || '[]') : (t.programs || [])
  Object.assign(form, {
    name: t.name, diploma: t.diploma || '', certificate: t.certificate || '',
    programs: progs.length ? [...progs] : ['']
  })
}

function cancel() { editing.value = null; creating.value = false }
function addProg() { form.programs.push('') }
function removeProg(i: number) { form.programs.splice(i, 1) }

async function uploadField(event: Event, field: 'diploma' | 'certificate') {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  const fd = new FormData()
  fd.append('file', input.files[0])
  const res = await $fetch<{ name: string; url: string }[]>('/api/admin/upload', { method: 'POST', body: fd })
  if (res?.length) form[field] = res[0].url
  showToast('Файл загружен!')
}

async function save() {
  if (editing.value) {
    await $fetch(`/api/admin/teachers/${editing.value.id}`, { method: 'PUT', body: form })
    showToast('Преподаватель обновлён!')
  } else {
    await $fetch('/api/admin/teachers', { method: 'POST', body: form })
    showToast('Преподаватель добавлен!')
  }
  cancel(); await refresh()
}

async function remove(id: string) {
  if (!confirm('Удалить преподавателя?')) return
  await $fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' })
  await refresh()
  showToast('Преподаватель удалён')
}
</script>

<template>
  <div>
    <div class="admin-header-row">
      <div>
        <h1 class="admin-page-title">Педагогический состав</h1>
        <p class="admin-page-desc">Имя, диплом, удостоверение и перечень программ</p>
      </div>
      <button class="admin-btn primary" @click="startCreate" v-if="!creating && !editing">+ Добавить</button>
    </div>

    <div v-if="creating || editing" class="admin-card">
      <h2 class="admin-card-title">{{ editing ? 'Редактирование' : 'Новый преподаватель' }}</h2>
      <div class="admin-form-group">
        <label>ФИО</label>
        <input v-model="form.name" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="admin-form-group">
          <label>Диплом (загрузить файл)</label>
          <input type="file" @change="(e) => uploadField(e, 'diploma')" />
          <div v-if="form.diploma" style="margin-top:4px;font-size:12px;color:#6b7280">{{ form.diploma }}</div>
        </div>
        <div class="admin-form-group">
          <label>Удостоверение (загрузить файл)</label>
          <input type="file" @change="(e) => uploadField(e, 'certificate')" />
          <div v-if="form.certificate" style="margin-top:4px;font-size:12px;color:#6b7280">{{ form.certificate }}</div>
        </div>
      </div>
      <div class="admin-form-group">
        <label>Перечень программ</label>
        <div v-for="(_, i) in form.programs" :key="i" style="display:flex;gap:8px;margin-bottom:6px">
          <input v-model="form.programs[i]" style="flex:1" />
          <button class="admin-btn danger sm" @click="removeProg(i)" :disabled="form.programs.length <= 1">✕</button>
        </div>
        <button class="admin-btn secondary sm" @click="addProg">+ Программа</button>
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" @click="save">💾 Сохранить</button>
        <button class="admin-btn secondary" @click="cancel">Отмена</button>
      </div>
    </div>

    <div v-if="!creating && !editing" class="admin-card">
      <table class="admin-table">
        <thead><tr><th>ФИО</th><th>Диплом</th><th>Удостоверение</th><th style="width:140px">Действия</th></tr></thead>
        <tbody>
          <tr v-for="t in (teachers || [])" :key="t.id">
            <td>{{ t.name }}</td>
            <td><a v-if="t.diploma" :href="t.diploma" target="_blank" style="color:#6366f1">📄</a><span v-else style="color:#6b7280">—</span></td>
            <td><a v-if="t.certificate" :href="t.certificate" target="_blank" style="color:#6366f1">📄</a><span v-else style="color:#6b7280">—</span></td>
            <td>
              <div style="display:flex;gap:8px">
                <button class="admin-btn secondary sm" @click="startEdit(t)">✏️</button>
                <button class="admin-btn danger sm" @click="remove(t.id)">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!teachers?.length" class="admin-empty">Преподавателей пока нет</div>
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>
