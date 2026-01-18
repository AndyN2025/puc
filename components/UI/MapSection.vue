<template>
  <div class="contact-section">
    <!-- Левая колонка — карта -->
    <div class="map-column">
      <div class="map-container">
        <!-- Заглушка карты — замените на реальную Yandex Map -->
        <!-- <div id="yandex-map" class="yandex-map"> -->
         <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/priokskiy_uchebny_tsentr/1030102847/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Приокский учебный центр</a><a href="https://yandex.ru/maps/6/kaluga/category/occupational_safety_and_health/184105368/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Безопасность труда в Калуге</a><a href="https://yandex.ru/maps/6/kaluga/category/further_education/184106162/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Дополнительное образование в Калуге</a><iframe src="https://yandex.ru/map-widget/v1/?ll=36.272661%2C54.504872&mode=poi&poi%5Bpoint%5D=36.272394%2C54.505870&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1030102847&z=16.73" width="860" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
        <!-- </div> -->
      </div>
    </div>

    <!-- Правая колонка — контакты -->
    <div class="contacts-column">
      <div class="contacts-grid">
        <!-- Верхняя строка — объединяет 2 колонки -->
        <div class="address-row">
          <h3>Центр на ул. Никитина</h3>
          <div class="address-info">
            <div class="info-item">
              <span class="label">Адрес:</span>
              <span class="value">Калуга, ул. Никитина, д. 41</span>
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

        <!-- Нижняя строка — две карточки -->
        <div class="contact-cards">
          <!-- Карточка 1 -->
          <div class="contact-card" @click="sendEmail('ekc_06@mail.ru')">
            <div class="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123970" stroke-width="2">
                <path d="M4 4h16v16H4V4z" />
                <path d="M4 8l8 4 8-4" />
              </svg>
            </div>
            <div class="card-content">
              <h4>Шмарева Елена Геннадьевна</h4>
              <p>Заместитель ген. директора</p>
            </div>
            <div class="card-email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
                <path d="M4 4h16v16H4V4z" />
                <path d="M4 8l8 4 8-4" />
              </svg>
              <span>ekc_06@mail.ru</span>
            </div>
          </div>

          <!-- Карточка 2 -->
          <div class="contact-card" @click="sendEmail('ekc_06@mail.ru')">
            <div class="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123970" stroke-width="2">
                <path d="M4 4h16v16H4V4z" />
                <path d="M4 8l8 4 8-4" />
              </svg>
            </div>
            <div class="card-content">
              <h4>Стрекалова Наталия Валентиновна</h4>
              <p>Главный бухгалтер</p>
            </div>
            <div class="card-email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
                <path d="M4 4h16v16H4V4z" />
                <path d="M4 8l8 4 8-4" />
              </svg>
              <span>ekc_06@mail.ru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const sendEmail = (email) => {
  window.location.href = `mailto:${email}`
}


// // const key = 5392290d-8cb8-4447-b8f4-527f8a671835
// // Инициализация карты
// onMounted(() => {
//   // Проверяем, не загружена ли уже библиотека (на случай повторного монтирования)
//   if (window.ymaps && window.ymaps.Map) {
//     initMap()
//   } else {
//     // Загружаем API Яндекс.Карт
//     const script = document.createElement('script')
//     // script.src = `https://api-maps.yandex.ru/3.0/?lang=ru_RU&apikey=${YOUR_API_KEY}`
//     script.onload = initMap
//     document.head.appendChild(script)
//   }
// })

// function initMap() {
//   // Координаты центра: Калуга, ул. Никитина, 41
//   const center = [54.5176, 36.2792] // [широта, долгота]
//   const zoom = 16

//   // Создаём карту
//   const map = new window.ymaps.Map('yandex-map', {
//     location: {
//       center,
//       zoom,
//       controls: [] // можно добавить ['zoomControl'] если нужно
//     },
//     behaviors: ['default', 'drag']
//   })

//   // Создаём метку
//   const placemark = new window.ymaps.Placemark(
//     center,
//     {
//       balloonContentHeader: 'Центр на ул. Никитина',
//       balloonContentBody: `
//         <strong>Калуга, ул. Никитина, д. 41</strong><br>
//         Пн–Пт: 8:00–17:00<br>
//         Сб–Вс: Выходной<br>
//         Офис 401, 4 этаж
//       `,
//       balloonContentFooter: 'ekc_06@mail.ru'
//     },
//     {
//       preset: 'islands#blueDotIcon', // стиль метки
//       hasBalloon: true
//     }
//   )

//   // Добавляем метку на карту
//   map.addChild(placemark)

//   // Автоматически открываем балун (опционально)
//   placemark.events.add('click', () => {
//     placemark.balloon.open()
//   })
// }
</script>

<style lang="scss" scoped>
.contact-section {
  display: flex;
  gap: 32px;
  background-color: #fff;
  border-radius: 8px;

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
    width: 60%;

    .yandex-map {
      width: 100%;
      height: 100%;
      border-radius: 8px; /* опционально */
    }

    .map-container {
      position: relative;
      width: 100%;
      height: 400px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);

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
    width: 40%;

    .contacts-grid {
      display: grid;
      grid-template-rows: auto auto;
      gap: 24px;

      .address-row {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.05);

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #123970;
          margin-bottom: 12px;
        }

        .address-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;

          .info-item {
            display: flex;
            flex-direction: column;

            .label {
              font-size: 0.875rem;
              color: #666;
              font-weight: 600;
            }

            .value {
              font-size: 0.9375rem;
              color: #333;
            }
          }
        }
      }

      .contact-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;

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