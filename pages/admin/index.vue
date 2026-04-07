<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const toast = ref('')
const showToast = (msg: string) => { toast.value = msg; setTimeout(() => toast.value = '', 2500) }

const { data: settings, refresh } = await useFetch('/api/settings')

const form = reactive({
  mainTitle: '',
  mainDescription: '',
  email: '',
  phones: [] as { tel: string; display8: string; displayPlus7: string }[]
})

watch(settings, (s) => {
  if (s) {
    form.mainTitle = s.mainTitle || ''
    form.mainDescription = s.mainDescription || ''
    form.email = s.email || ''
    form.phones = (s.phones || []).map((p: any) => ({ tel: p.tel, display8: p.display8, displayPlus7: p.displayPlus7 }))
  }
}, { immediate: true })

function addPhone() {
  form.phones.push({ tel: '', display8: '', displayPlus7: '' })
}

function removePhone(i: number) {
  form.phones.splice(i, 1)
}

async function save() {
  await $fetch('/api/admin/settings', { method: 'PUT', body: form })
  await refresh()
  showToast('Настройки сохранены!')
}
</script>

<template>
  <div>
    <h1 class="admin-page-title">Главный экран и контакты</h1>
    <p class="admin-page-desc">Заголовок, описание главного экрана, почта и телефоны</p>

    <div class="admin-card">
      <h2 class="admin-card-title">Главный экран</h2>
      <div class="admin-form-group">
        <label>Главный заголовок</label>
        <input v-model="form.mainTitle" placeholder="Заголовок сайта" />
      </div>
      <div class="admin-form-group">
        <label>Описание</label>
        <textarea v-model="form.mainDescription" rows="4" placeholder="Описание главного экрана" />
      </div>
    </div>

    <div class="admin-card">
      <h2 class="admin-card-title">Контакты</h2>
      <div class="admin-form-group">
        <label>E-mail</label>
        <input v-model="form.email" type="email" placeholder="email@example.com" />
      </div>

      <h3 style="font-size:14px; font-weight:600; margin-bottom:12px; color:#9ca3af">Телефоны</h3>
      <div v-for="(phone, i) in form.phones" :key="i" class="phone-row">
        <div class="admin-form-group" style="flex:1">
          <label>Номер (для ссылки)</label>
          <input v-model="phone.tel" placeholder="+74842562183" />
        </div>
        <div class="admin-form-group" style="flex:1">
          <label>Формат 8 (…)</label>
          <input v-model="phone.display8" placeholder="8 (4842) 56-21-83" />
        </div>
        <div class="admin-form-group" style="flex:1">
          <label>Формат +7 (…)</label>
          <input v-model="phone.displayPlus7" placeholder="+7 (4842) 56-21-83" />
        </div>
        <button class="admin-btn danger sm" style="margin-top:20px" @click="removePhone(i)">✕</button>
      </div>
      <button class="admin-btn secondary" @click="addPhone">+ Добавить телефон</button>
    </div>

    <div class="admin-actions">
      <button class="admin-btn primary" @click="save">💾 Сохранить</button>
    </div>

    <div v-if="toast" class="admin-toast">{{ toast }}</div>
  </div>
</template>

<style scoped>
.phone-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 8px;
}
</style>
