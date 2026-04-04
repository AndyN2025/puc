<template>
  <div class="contact-section">
    
    <div class="map-column">
      <div class="map-container">
        
        
         <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/priokskiy_uchebny_tsentr/1030102847/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Приокский учебный центр</a><a href="https://yandex.ru/maps/6/kaluga/category/occupational_safety_and_health/184105368/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Безопасность труда в Калуге</a><a href="https://yandex.ru/maps/6/kaluga/category/further_education/184106162/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Дополнительное образование в Калуге</a><iframe src="https://yandex.ru/map-widget/v1/?ll=36.272661%2C54.504872&mode=poi&poi%5Bpoint%5D=36.272394%2C54.505870&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1030102847&z=16.73" width="1000" height="440" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
        
      </div>
    </div>

    
    <div class="contacts-column">
      <div class="contacts-grid">
        
        <div class="address-row">
          <h3>Учебный центр на ул. Никитина</h3>
          <div class="address-info">
            <div class="info-item">
              <span class="label">Адрес:</span>
              <span class="value">г.Калуга, ул. Никитина, д. 41</span>
            </div>
            <div class="info-item">
              <span class="label">Офис:</span>
              <span class="value">401, четвёртый этаж</span>
            </div>
            <div class="info-item">
              <span class="label">Телефоны:</span>
              <span class="value">(4842) 56-21-83</span>
            </div>
            <div class="info-item">
              <span class="label">По любым вопросам</span>
              <span class="value">8 (910) 520-15-64</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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

  @include m.from($bp-lg) {
    flex-direction: row;
    align-items: flex-start;
    gap: $spacing-xl;
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
      flex: 1.4;
    }

    .yandex-map {
      width: 100%;
      height: 100%;
      border-radius: $radius-md;
    }

    .map-container {
      position: relative;
      width: 100%;
      height: clamp(16rem, 50vw, 27.5rem);
      border-radius: $radius-md;
      overflow: hidden;
      box-shadow: $shadow-soft;

      :deep(iframe) {
        width: 100%;
        height: 100%;
        max-width: 100%;
        border: 0;
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
      flex: 1;
    }

    .contacts-grid {
      display: grid;
      grid-template-rows: auto auto;
      gap: 24px;

      .address-row {
        background: #E9F4FF;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.05);

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #123970;
          margin-bottom: 42px;
        }

        .address-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;

          .info-item {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .label {
              font-size: 18px;
              color: #666;
              font-weight: 600;
            }

            .value {
              font-size: 18px;
              color: #333;
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