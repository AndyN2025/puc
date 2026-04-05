<template>
  <div class="p contacts-page">
    <Breadcrumbs :items="breadCrumbs" />
    <DotTitle text="Контакты" />

    <p class="contacts-page__lead">
      {{ SITE_COPY.contactsLead }}
    </p>

    <section class="contacts-page__cards" aria-label="Краткие контакты">
      <article class="contact-card">
        <h2 class="contact-card__title">Телефоны</h2>
        <ul class="contact-card__list">
          <li v-for="p in SITE_PHONES" :key="p.tel">
            <a :href="`tel:${p.tel}`">{{ p.display8 }}</a>
          </li>
        </ul>
      </article>

      <article class="contact-card">
        <h2 class="contact-card__title">Электронная почта</h2>
        <p class="contact-card__text">
          <a :href="siteMailto()">{{ SITE_EMAIL_CONTACTS_DISPLAY }}</a>
        </p>
      </article>

      <article class="contact-card">
        <h2 class="contact-card__title">Адрес офиса</h2>
        <address class="contact-card__address">
          {{ SITE_ADDRESS.contactsLine1 }}<br />
          {{ SITE_ADDRESS.contactsLine2 }}
        </address>
      </article>
    </section>

    <section class="contacts-page__hours" aria-label="Режим работы">
      <h2 class="contacts-page__hours-title">Режим работы</h2>
      <p class="contacts-page__hours-text">
        Понедельник — пятница: с 08:00 до 17:00<br />
        Суббота и воскресенье — выходной
      </p>
    </section>

    <section class="contacts-page__map" aria-label="Карта проезда">
      <h2 class="visually-hidden">Как нас найти</h2>
      <MapSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import DotTitle from '@/components/UI/DotTitle.vue'
import MapSection from '@/components/UI/MapSection.vue'
import {
  SITE_ADDRESS,
  SITE_COPY,
  SITE_EMAIL_CONTACTS_DISPLAY,
  SITE_PHONES,
  siteMailto
} from '@/utils/site'

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Контакты', link: '/contacts' }
]
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.contacts-page {
  &__lead {
    font-family: $font-ibm;
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: $line-height-relaxed;
    color: $color-text-body;
    max-width: 86rem;
    margin: 0 0 $spacing-xl;
  }

  &__cards {
    display: grid;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    @include m.from($bp-md) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: $spacing-lg;
    }
  }

  &__hours {
    margin-bottom: $spacing-xl;
    padding: $spacing-lg $spacing-xl;
    background: linear-gradient(
      135deg,
      $color-lightBlue 0%,
      color-mix(in srgb, $color-white 55%, $color-lightBlue) 100%
    );
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    box-shadow: $shadow-soft;
  }

  &__hours-title {
    margin: 0 0 $spacing-sm;
    font-family: $font-ibm-m;
    font-size: clamp(1.0625rem, 2vw, 1.25rem);
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
  }

  &__hours-text {
    margin: 0;
    font-family: $font-ibm;
    font-size: $font-size-base;
    line-height: $line-height-body;
    color: $color-text-body;
  }

  &__map {
    margin-bottom: $spacing-section-tight;
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: $color-white;
  border-radius: $radius-lg;
  border: 1px solid $color-border;
  box-shadow: $shadow-soft;
  min-height: 100%;
  transition:
    box-shadow $transition-base,
    border-color $transition-base;

  &:hover {
    box-shadow: $shadow-card;
    border-color: color-mix(in srgb, $color-darkBlue 22%, $color-border);
  }

  &__title {
    margin: 0;
    font-family: $font-ibm-m;
    font-size: clamp(1rem, 1.8vw, 1.125rem);
    font-weight: $font-weight-semibold;
    color: $color-darkBlue;
    line-height: $line-height-tight;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    font-family: $font-ibm;
    font-size: $font-size-base;

    a {
      color: $color-text-body;
      text-decoration: none;
      font-weight: $font-weight-medium;
      transition: color $transition-fast;

      &:hover {
        color: $color-darkBlue;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  &__text {
    margin: 0;
    font-family: $font-ibm;
    font-size: $font-size-base;

    a {
      color: $color-darkBlue;
      font-weight: $font-weight-semibold;
      text-decoration: none;
      word-break: break-all;
      transition: color $transition-fast;

      &:hover {
        color: $color-cta-hover;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  &__address {
    margin: 0;
    font-family: $font-ibm;
    font-size: $font-size-base;
    line-height: $line-height-body;
    color: $color-text-body;
    font-style: normal;
  }
}
</style>
