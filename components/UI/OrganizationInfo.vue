<template>
  <!-- Микроразметка по методичке: itemprop; отдельный itemtype (schema.org) не требуется документом -->
  <section class="organization-info" itemscope>
    <div class="info-grid">
      <div class="info-label">{{ labels.fullName }}</div>
      <div class="info-value" itemprop="fullName">
        {{ SITE_ORG.nameFull }}
      </div>

      <div class="info-label">{{ labels.shortName }}</div>
      <div class="info-value" itemprop="shortName">{{ orgText.shortName }}</div>

      <div class="info-label">{{ labels.regDate }}</div>
      <div class="info-value" itemprop="regDate">{{ orgText.regDate }}</div>

      <div class="info-label">{{ labels.founder }}</div>
      <div class="info-value">
        <!-- п. 5 «uchredLaw»: главный тег; п. 5.1 — nameUchred -->
        <div itemprop="uchredLaw" itemscope>
          <span itemprop="nameUchred">{{ orgText.founderName }}</span>
          <span class="visually-hidden" itemprop="addressUchred">
            Адрес учредителя: {{ uchredExtra.addressUchred }}
          </span>
          <span class="visually-hidden" itemprop="telUchred">
            Телефон учредителя: {{ uchredExtra.telUchred }}
          </span>
          <span class="visually-hidden" itemprop="mailUchred">
            Электронная почта учредителя: {{ uchredExtra.mailUchred }}
          </span>
          <span class="visually-hidden" itemprop="websiteUchred">
            Сайт учредителя: {{ uchredExtra.websiteUchred }}
          </span>
        </div>
      </div>

      <div class="info-label">{{ labels.address }}</div>
      <div class="info-value" itemprop="address">
        {{ SITE_ADDRESS.legal }}
      </div>

      <div class="info-label">{{ labels.workTime }}</div>
      <div class="info-value item-value--preline" itemprop="workTime">
        {{ orgText.workTime }}
      </div>

      <div class="info-label">{{ labels.phones }}</div>
      <div class="info-value phones">
        <a
          v-for="p in SITE_PHONES"
          :key="p.tel"
          itemprop="telephone"
          :href="`tel:${p.tel}`"
          class="phone-link"
        >{{ p.display8 }}</a>
      </div>

      <div class="info-label">{{ labels.email }}</div>
      <div class="info-value">
        <a itemprop="email" :href="siteMailto()" class="email-link">{{ SITE_EMAIL }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_ORG,
  SITE_PHONES,
  siteMailto
} from '@/utils/site'
import {
  SVEDEN_ORG_FIELD_LABELS,
  SVEDEN_ORG_TEXT,
  SVEDEN_UCHRED_EXTRA
} from '@/utils/svedenCommonContent'

const labels = SVEDEN_ORG_FIELD_LABELS
const orgText = SVEDEN_ORG_TEXT
const uchredExtra = SVEDEN_UCHRED_EXTRA
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

.item-value--preline {
  white-space: pre-line;
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

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

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
