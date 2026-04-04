<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="11" />
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon" />

    <div class="inter__text">
      <p class="inter__text-item">Договоров с иностранными или международными организациями по вопросам образования и науки — нет.</p>
      <p class="inter__text-item">Образовательных программ, прошедших международную аккредитацию — нет.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'

const titleCommon = ref('Международное сотрудничество')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/inter/' }
] 

</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.inter__text {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: clamp(3rem, 10vw, 8rem);
  max-width: 48rem;
  line-height: $line-height-body;
  color: $color-text-body;
}
</style>
