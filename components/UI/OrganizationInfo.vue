<template>
  <div class="organization-info">
    <div class="info-grid">
      
      <div class="info-label">Полное наименование образовательной организации</div>
      <div class="info-value">
        {{ SITE_ORG.nameFull }}
      </div>

      
      <div class="info-label">Сокращенное наименование образовательной организации</div>
      <div class="info-value">АНО ДПО «ПУЦ»</div>

      
      <div class="info-label">Дата создания образовательной организации</div>
      <div class="info-value">05.05.2014 г.</div>

      
      <div class="info-label">Информация об учредителе</div>
      <div class="info-value">Смоловик Андрей Евгеньевич</div>

      
      <div class="info-label">Адрес местонахождения образовательной организации</div>
      <div class="info-value">
        {{ SITE_ADDRESS.legal }}
      </div>

      
      <div class="info-label">Режим, график работы</div>
      <div class="info-value">
        Понедельник - пятница с 08:00 по 17:00
        <br />
        Суббота, воскресенье - выходной
      </div>

      
      <div class="info-label">Контактные телефоны</div>
      <div class="info-value phones">
        <a
          v-for="p in SITE_PHONES"
          :key="p.tel"
          :href="`tel:${p.tel}`"
          class="phone-link"
        >{{ p.display8 }}</a>
      </div>

      
      <div class="info-label">Адрес электронной почты</div>
      <div class="info-value">
        <a :href="siteMailto()" class="email-link">{{ SITE_EMAIL }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SITE_ADDRESS, SITE_EMAIL, SITE_ORG, SITE_PHONES, siteMailto } from '@/utils/site'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars' as *;

.organization-info {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 60px;
}

.info-grid {
  display: grid;
  grid-template-columns: 3fr 10fr;
  gap: 16px 24px;
  width: 100%;
}

.info-label {
  font-family: 'IBM M', sans-serif;
  color: $color-darkBlue;
  background-color: $color-bg-nav;
  padding: 16px;
  align-self: start;
  min-height: 88px;
  font-weight: 600;
}

.info-value {
  color: $color-text-body;
  padding: 16px;
  align-self: start;
  font-size: 18px;
  background-color: $color-white;

  &.phones {
    padding: 0 8px;
  }
}

.info-grid > :nth-child(-n + 2) {
  border-top: none;
}

.info-grid > :nth-last-child(-n + 2) {
  border-bottom: none;
}

.phone-link {
  display: block;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 4px;
}

.phone-link:last-child {
  margin-bottom: 0;
}

.phone-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.email-link {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.email-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  /* Как на десктопе: подпись на голубом, значение на белом — пара визуально связана */
  .info-label {
    margin-top: 14px;
    font-size: clamp(0.875rem, 3.2vw, 1rem);
    padding: 12px 14px;
    min-height: 0;
    font-weight: 600;
    color: $color-darkBlue;
    background-color: $color-bg-nav;
    border: 1px solid $color-border-strong;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }

  .info-grid > .info-label:first-child {
    margin-top: 0;
  }

  .info-value {
    font-size: 15px;
    padding: 12px 14px 14px;
    background-color: $color-white;
    border: 1px solid $color-border-strong;
    border-top: none;
    border-radius: 0 0 10px 10px;

    &.phones {
      padding: 12px 14px 14px;
    }
  }

  .info-value + .info-label {
    margin-top: 14px;
  }
}
</style>