<template>
  <div class="contact-section">
    
    <div class="map-column">
      <div ref="mapSentinel" class="map-container">
        <div class="map-embed">
          <div
            v-if="!mapLoaded"
            class="map-embed__lazy"
            aria-busy="true"
            aria-live="polite"
          >
            <span class="map-embed__lazy-text">Загрузка карты…</span>
          </div>
          <template v-else>
            <a
              href="https://yandex.ru/maps/org/priokskiy_uchebny_tsentr/1030102847/?utm_medium=mapframe&utm_source=maps"
              class="map-embed__sr"
            >{{ SITE_ORG.shortName }}</a>
            <a
              href="https://yandex.ru/maps/6/kaluga/category/occupational_safety_and_health/184105368/?utm_medium=mapframe&utm_source=maps"
              class="map-embed__sr"
            >Безопасность труда в Калуге</a>
            <a
              href="https://yandex.ru/maps/6/kaluga/category/further_education/184106162/?utm_medium=mapframe&utm_source=maps"
              class="map-embed__sr"
            >Дополнительное образование в Калуге</a>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=36.272661%2C54.504872&mode=poi&poi%5Bpoint%5D=36.272394%2C54.505870&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1030102847&z=16.73"
              width="560"
              height="400"
              loading="lazy"
              :title="`Карта: ${SITE_ORG.shortName}, Калуга`"
              allowfullscreen
            />
          </template>
        </div>
      </div>
    </div>

    
    <div class="contacts-column">
      <div class="contacts-grid">
        
        <div class="address-row">
          <h3>Учебный центр на ул. Никитина</h3>
          <div class="address-info">
            <div class="info-item">
              <span class="label">Адрес:</span>
              <span class="value">{{ SITE_ADDRESS.short }}</span>
            </div>
            <div class="info-item">
              <span class="label">Офис:</span>
              <span class="value">401, четвёртый этаж</span>
            </div>
            <div class="info-item">
              <span class="label">Телефоны</span>
              <span class="value value--phones">
                <a
                  v-for="p in SITE_PHONES"
                  :key="p.tel"
                  :href="`tel:${p.tel}`"
                >{{ p.display8 }}</a>
              </span>
            </div>
            <div class="info-item">
              <span class="label">E-mail</span>
              <span class="value">
                <a class="map-email" :href="siteMailto()">{{ SITE_EMAIL }}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SITE_ADDRESS, SITE_EMAIL, SITE_ORG, SITE_PHONES, siteMailto } from '@/utils/site'

const mapSentinel = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)

onMounted(() => {
  const el = mapSentinel.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    mapLoaded.value = true
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          mapLoaded.value = true
          obs.disconnect()
          break
        }
      }
    },
    { rootMargin: '140px 0px', threshold: 0 }
  )
  obs.observe(el)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.contact-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  background-color: $color-white;
  border-radius: $radius-md;
  width: 100%;
  min-width: 0;

  @include m.from($bp-lg) {
    flex-direction: row;
    align-items: stretch;
    gap: $spacing-lg;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #123970;
    margin-bottom: 16px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background-color: #123970;
      border-radius: 50%;
    }
  }

  .map-column {
    width: 100%;
    min-width: 0;

    @include m.from($bp-lg) {
      flex: 3 1 0;
      display: flex;
      flex-direction: column;
      align-self: stretch;
      min-height: 0;
    }

    .yandex-map {
      width: 100%;
      height: 100%;
      border-radius: $radius-md;
    }

    .map-container {
      position: relative;
      width: 100%;
      height: clamp(16rem, 50vw, 24.5rem);
      border-radius: $radius-md;
      overflow: hidden;
      box-shadow: $shadow-soft;
      display: flex;
      flex-direction: column;
      min-height: 0;

      @include m.from($bp-lg) {
        flex: 1 1 auto;
        height: 100%;
        min-height: clamp(16rem, 36vh, 24.5rem);
      }

      .map-embed {
        position: relative;
        flex: 1;
        min-height: 0;
        width: 100%;
        overflow: hidden;

        &__sr {
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

        &__skeleton {
          position: absolute;
          inset: 0;
          background: color-mix(in srgb, $color-lightBlue 45%, $color-white);
          border-radius: inherit;
        }

        &__lazy {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, $color-lightBlue 50%, $color-white);
          border-radius: inherit;
        }

        &__lazy-text {
          font-size: $font-size-sm;
          font-family: $font-ibm-m;
          font-weight: $font-weight-semibold;
          color: $color-darkBlue;
        }

        :deep(iframe),
        iframe {
          display: block;
          width: 100%;
          max-width: 100%;
          border: 0;

          @include m.until($bp-lg) {
            height: 100%;
            min-height: 100%;
          }

          @include m.from($bp-lg) {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
        }
      }

      .map-placeholder {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .map-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;

          .marker-popup {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 200px;
            font-size: 0.875rem;
            line-height: 1.4;

            .office-number {
              font-size: 1.25rem;
              font-weight: 700;
              color: #123970;
              display: block;
              margin: 8px 0;
            }
          }
        }
      }
    }
  }

  .contacts-column {
    width: 100%;
    min-width: 0;

    @include m.from($bp-lg) {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      align-self: stretch;
      min-height: 0;
    }

    .contacts-grid {
      display: grid;
      grid-template-rows: auto auto;
      gap: 24px;

      @include m.from($bp-lg) {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        gap: 0;
      }

      .address-row {
        background: $color-lightBlue;
        padding: clamp(0.875rem, 2vw, 1.25rem);
        border-radius: $radius-lg;
        box-shadow: $shadow-soft;
        border: 1px solid $color-border;
        height: 100%;
        display: flex;
        flex-direction: column;

        @include m.from($bp-lg) {
          flex: 1;
          min-height: 0;
        }

        h3 {
          font-size: clamp(1rem, 1.1vw + 0.75rem, 1.125rem);
          font-weight: $font-weight-semibold;
          font-family: $font-ibm-m;
          color: $color-darkBlue;
          margin: 0 0 $spacing-md;
          line-height: $line-height-tight;
        }

        .address-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: $spacing-md;

          .info-item {
            display: flex;
            flex-direction: column;
            gap: $spacing-xs;

            .label {
              font-size: $font-size-sm;
              color: color-mix(in srgb, $color-text-body 85%, $color-darkBlue);
              font-weight: $font-weight-semibold;
            }

            .value {
              font-size: clamp(0.8125rem, 0.5vw + 0.7rem, $font-size-base);
              color: $color-text-body;
              line-height: $line-height-body;
              word-break: break-word;

              &--phones {
                display: flex;
                flex-direction: column;
                gap: $spacing-xs;
              }

              a {
                color: $color-darkBlue;
                text-decoration: none;
                font-weight: $font-weight-medium;
                transition: color $transition-fast;

                &:hover {
                  color: $color-cta-hover;
                  text-decoration: underline;
                }
              }
            }

            .map-email {
              word-break: break-all;
            }
          }
        }
      }

      .contact-cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: $spacing-md;

        @include m.from($bp-md) {
          grid-template-columns: 1fr 1fr;
        }

        .contact-card {
          background: #eaf6ff;
          padding: 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;

          &:hover {
            background: #d0e7ff;
            transform: translateY(-2px);
          }

          .card-icon {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .card-content {
            h4 {
              font-size: 1rem;
              font-weight: 600;
              color: #333;
              margin: 0;
            }

            p {
              font-size: 0.875rem;
              color: #666;
              margin: 4px 0 0 0;
            }
          }

          .card-email {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.875rem;
            color: #888;

            svg {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>