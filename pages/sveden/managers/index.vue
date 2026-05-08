<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs" />
    <NavBlock :navItems="navSvedenItems" :activeIndex="4" />
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon" />

    <div class="struct">
      <ul class="struct__list">
        <li class="struct__item" v-for="item in peoples" :key="item.name">
          <div :itemprop="item.leadershipTag" itemscope>
            <p class="struct__item-name" itemprop="fio">{{ item.name }}</p>
            <p class="struct__item-post" itemprop="post">{{ item.post }}</p>
            <span class="struct__item-otdel">{{ item.otdel }}</span>
            <div class="struct__item-contacts">
              <a
                itemprop="telephone"
                :href="'tel:' + normalizeTel(item.phone)"
                class="struct__item-contacts__item"
              >{{ item.phone }}</a>
              <a
                itemprop="telephone"
                :href="'tel:' + normalizeTel(item.phoneDop)"
                class="struct__item-contacts__item"
              >{{ item.phoneDop }}</a>
              <a
                itemprop="email"
                :href="'mailto:' + item.email"
                class="struct__item-contacts__item"
              >{{ item.email }}</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import TitleCommon from '@/components/UI/TitleCommon.vue'
import NavBlock from '@/components/UI/NavBlock.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import { SITE_EMAIL, SITE_PHONES } from '@/utils/site'

const titleCommon = ref('Руководство')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/managers/' }
]

const peoples = [
  {
    id: 1,
    name: 'Шмарева Елена Геннадьевна',
    post: 'Генеральный директор',
    otdel: 'Администрация',
    phone: SITE_PHONES[2]!.display8,
    phoneDop: SITE_PHONES[0]!.display8,
    email: SITE_EMAIL,
    leadershipTag: 'rucovodstvo' as const
  },
  {
    id: 2,
    name: 'Стрекалова Наталия Валентиновна',
    post: 'Главный бухгалтер',
    otdel: 'Финансовый отдел',
    phone: SITE_PHONES[2]!.display8,
    phoneDop: SITE_PHONES[0]!.display8,
    email: SITE_EMAIL,
    leadershipTag: 'rucovodstvoZam' as const
  }
]

function normalizeTel(phone: string) {
  return phone.replace(/\D/g, '')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.struct {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-3xl;

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    list-style: none;
    margin: 0;
    padding: 0;
    color: $black;

    @include m.from($bp-md) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: $spacing-md;
    }
  }

  &__item {
    flex: 1;
    min-width: min(100%, 18rem);
    background-color: $color-lightBlue;
    padding: $spacing-lg;
    border-radius: $radius-lg;

    &-name {
      color: $color-darkBlue;
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      line-height: 1.4;
      margin-bottom: $spacing-lg;
      font-family: $font-inter, sans-serif;
    }

    &-post {
      font-size: $font-size-base;
      line-height: 1.35;
      margin-bottom: $spacing-sm;
      font-family: $font-ibm-m, sans-serif;
    }

    &-otdel {
      font-size: $font-size-base;
      line-height: 1.35;
      font-family: $font-ibm, sans-serif;
    }

    &-contacts {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
      margin: $spacing-lg 0 0;
      align-items: flex-start;
      font-size: $font-size-base;
      font-family: $font-inter, sans-serif;

      &__item {
        font-size: $font-size-lg;
        color: $color-darkBlue;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
