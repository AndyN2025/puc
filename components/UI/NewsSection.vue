<template>
  <div class="about-center-section">
    <!-- Левая колонка (65%) -->
    <div class="left-column">
      <!-- Блок "Коротко о центре" -->
      <div class="section-block">
        <h2 class="section-title">АНО ДПО "Приокский учебный центр"</h2>
        <p class="section-text">
          Приокский учебный центр является ведущей организацией дополнительного профессионального образования в Калужской области, специализирующейся на подготовке руководителей, специалистов в области обеспечения промышленной, экологической, энергетической безопасности, безопасности гидротехнических сооружений. Приокский учебный центр организует обучение и проверку знаний рабочих организаций, поднадзорных Федеральной службе по экологическому, технологическому и атомному надзору, обучение по охране труда и пожарной безопасности.
        </p>
        <p class="section-text">
          Наш опыт работы, знания квалифицированных преподавателей-практиков, наличие обширной обновляемой учебно-методической базы и современного оборудования позволяют гарантировать нашим слушателям качественный учебный процесс и актуальные знания. Мы рады оказать нашим выпускникам консультационную поддержку.
        </p>
      </div>

      <!-- Блок "Миссия и стандарты" -->
      <div class="section-block">
        <h2 class="section-title">Миссия и стандарты</h2>
        <p class="section-text">
          В своей деятельности Центр руководствуется действующим законодательством Российской Федерации и документами предприятия. Свою миссию мы видим в удовлетворении потребностей общества в качественном дополнительном профессиональном образовании его граждан, содействии в получении ими новых знаний и навыков.
        </p>
        <p class="section-text">
          Одновременно с этим Центр последовательно развивает методические подходы, соответствующие текущим требованиям образовательной среды и требованиям работодателей промышленного сектора. Особое внимание уделяется практическому применению полученных знаний в условиях реальной профессиональной деятельности, что обеспечивает осознанность, устойчивость и прикладной характер подготовки специалистов.
        </p>
      </div>
    </div>

    <!-- Правая колонка (35%) -->
    <div class="right-column">
      <div class="news-sidebar">
        <h3 class="sidebar-title">Новости центра</h3>

        <!-- Список новостей -->
        <div v-for="(news, index) in newsList" :key="index" class="news-item">
          <div class="news-date">{{ news.date }}</div>
          <div class="news-content">
            <span class="news-category">{{ news.category }}</span>
            <a :href="news.link" class="news-link">{{ news.title }}</a>
          </div>
        </div>

        <!-- Ссылка "Все новости" -->
        <a href="/news" class="all-news-link">ВСЕ НОВОСТИ</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Данные новостей — замените на свои из API или store
const newsList = ref([
  {
    date: '14.10.2025',
    category: 'Профессиональная переподготовка',
    title: 'Специалист в сфере промышленной безопасности',
    link: '/news/'
  },
  {
    date: '14.10.2025',
    category: 'Профессиональная переподготовка',
    title: 'Специалист в сфере промышленной безопасности',
    link: '/news/'
  },
  {
    date: '14.10.2025',
    category: 'Профессиональная переподготовка',
    title: 'Специалист в сфере промышленной безопасности',
    link: '/news/'
  }
])
</script>

<style lang="scss" scoped>
.about-center-section {
  display: flex;
  gap: 32px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  .left-column {
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .section-block {
      margin-bottom: 24px;

      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #123970;
        margin-bottom: 12px;
        position: relative;
      }

      .section-text {
        font-size: 0.9375rem;
        line-height: 1.6;
        color: #333;
        margin: 0 0 16px 0;
        text-align: justify;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .right-column {
    width: 35%;

    .news-sidebar {
      background-color: #eaf6ff; // светло-голубой фон
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .sidebar-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #123970;
        margin-bottom: 20px;
        text-align: center;
      }

      .news-item {
        background: white;
        padding: 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
        }

        .news-date {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 8px;
        }

        .news-content {
          .news-category {
            display: block;
            font-size: 0.875rem;
            color: #123970;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .news-link {
            font-size: 0.9375rem;
            color: #333;
            text-decoration: none;
            line-height: 1.4;
            display: block;
            transition: color 0.2s;

            &:hover {
              color: #123970;
              text-decoration: underline;
            }
          }
        }
      }

      .all-news-link {
        display: block;
        text-align: center;
        font-weight: 600;
        color: #123970;
        text-decoration: none;
        margin-top: 20px;
        padding: 8px 0;
        border-top: 1px solid #d0d0d0;
        transition: color 0.2s;

        &:hover {
          color: #004494;
        }
      }
    }
  }
}
</style>