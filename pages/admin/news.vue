<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: newsList, refresh } = await useFetch('/api/news')

const editing = ref<any>(null)
const creating = ref(false)
const form = reactive({
  slug: '', title: '', date: '', category: '', excerpt: '', accent: 0, body: ['']
})

function startCreate() {
  creating.value = true
  editing.value = null
  Object.assign(form, { slug: '', title: '', date: '', category: '', excerpt: '', accent: 0, body: [''] })
}

function startEdit(n: any) {
  editing.value = n
  creating.value = false
  Object.assign(form, {
    slug: n.slug, title: n.title, date: n.date, category: n.category,
    excerpt: n.excerpt, accent: n.accent, body: [...(n.body || [''])]
  })
}

function cancel() { editing.value = null; creating.value = false }

function addParagraph() { form.body.push('') }
function removeParagraph(i: number) { form.body.splice(i, 1) }

async function save() {
  if (editing.value) {
    await $fetch(`/api/admin/news/${editing.value.id}`, { method: 'PUT', body: form })
    showToast('Новость обновлена!')
  } else {
    await $fetch('/api/admin/news', { method: 'POST', body: form })
    showToast('Новость создана!')
  }
  editing.value = null
  creating.value = false
  await refresh()
}

async function remove(id: string) {
  if (!confirm('Удалить новость?')) return
  await $fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
  await refresh()
  showToast('Новость удалена')
}
</script>

<template>
  <div>
    <div class="admin-header-row">
      <div>
        <h1 class="admin-page-title">Новости</h1>
        <p class="admin-page-desc">Управление новостями сайта</p>
      </div>
      <button class="admin-btn primary" @click="startCreate">+ Добавить новость</button>
    </div>

    <!-- Form -->
    <div v-if="creating || editing" class="admin-card">
      <h2 class="admin-card-title">{{ editing ? 'Редактирование' : 'Новая новость' }}</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
        <div class="admin-form-group">
          <label>Заголовок</label>
          <input v-model="form.title" />
        </div>
        <div class="admin-form-group">
          <label>Slug (URL)</label>
          <input v-model="form.slug" />
        </div>
        <div class="admin-form-group">
          <label>Дата</label>
          <input v-model="form.date" placeholder="01.01.2025" />
        </div>
        <div class="admin-form-group">
          <label>Категория</label>
          <input v-model="form.category" />
        </div>
      </div>
      <div class="admin-form-group">
        <label>Краткое описание</label>
        <textarea v-model="form.excerpt" rows="2" />
      </div>
      <div class="admin-form-group">
        <label>Текст (параграфы)</label>
        <div v-for="(_, i) in form.body" :key="i" style="display:flex;gap:8px;margin-bottom:8px">
          <textarea v-model="form.body[i]" rows="3" style="flex:1" />
          <button class="admin-btn danger sm" @click="removeParagraph(i)" :disabled="form.body.length <= 1">✕</button>
        </div>
        <button class="admin-btn secondary sm" @click="addParagraph">+ Параграф</button>
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" @click="save">💾 Сохранить</button>
        <button class="admin-btn secondary" @click="cancel">Отмена</button>
      </div>
    </div>

    <!-- Table -->
    <div class="admin-card" v-if="!creating && !editing">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Дата</th>
            <th>Категория</th>
            <th style="width:140px">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in (newsList || [])" :key="n.id">
            <td>{{ n.title }}</td>
            <td>{{ n.date }}</td>
            <td>{{ n.category }}</td>
            <td>
              <div style="display:flex;gap:8px">
                <button class="admin-btn secondary sm" @click="startEdit(n)">✏️</button>
                <button class="admin-btn danger sm" @click="remove(n.id)">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!newsList?.length" class="admin-empty">Новостей пока нет</div>
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>
