<template>
  <div class="about-center-section">
    
    <div class="left-column">
      
      <div class="section-block">
        <h2 class="section-title">АНО ДПО "Приокский учебный центр"</h2>
        <ul class="section-text">
          <li class="section-text__item" v-for="item in textAboutUC" :key="item.id">
            {{ item.text }}
          </li>
        </ul>
      </div>

      
      
    </div> 

    
    <div class="right-column">
      <div class="news-sidebar">
        <h3 class="sidebar-title">Новости центра</h3>

        
        <div v-for="(news, index) in newsList" :key="index" class="news-item">
          <div class="news-date">{{ news.date }}</div>
          <div class="news-content">
            <span class="news-category">{{ news.category }}</span>
            <a :href="news.link" class="news-link">{{ news.title }}</a>
          </div>
        </div>

        
        <a href="/news" class="all-news-link">ВСЕ НОВОСТИ</a>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const textAboutUC = reactive([
  {
    id: 1,
    text: `Автономная некоммерческая организация дополнительного профессионального образования 
          «Приокский учебный центр» — многопрофильный учебный центр, успешно работающий с 1998 года. 
          Центр осуществляет образовательную деятельность для специалистов различного профиля, проводит 
          профессиональное обучение, направленное на приобретение  профессиональных компетенций, получение 
          квалификации по программам подготовки, переподготовки, повышения квалификации, обучение рабочим 
          профессиям.`,
  },
  {
    id: 2,
    text: `Приокский учебный центр внесен в реестр аккредитованных организаций, оказывающих услуги в области 
          охраны труда, обучению безопасным методам и приемам выполнения работ повышенной опасности.`,
  },
  {
    id: 3,
    text: `Подготовка руководителей и специалистов проводится по промышленной, пожарной, экологической 
          безопасности, безопасности гидротехнических сооружений, организации деятельности по обороту 
          наркотических средств, психотропных веществ и их прекурсоров.`, 
  },
  {
    id: 4,
    text: `C 2005 года проводим подготовку персонала в сфере теплоснабжения. Накоплен большой опыт, 
          разработан курс комплексной подготовки, позволяющий слушателям успешно подготовиться к 
          проверке знаний в комиссии Ростехнадзора.`,
  },
  {
    id: 5,
    text: `Дистанционное обучение без отрыва от работы, из любого региона проводится на базе системы 
          дистанционного обучения, обеспечивающей круглосуточный доступ к учебным материалам и проверке 
          знаний. Для учебы достаточно иметь доступ в интернет.`,
  },
  {
    id: 6,
    text: `За время своей деятельности центр зарекомендовал себя как надежный партнер. Наши программы 
          соответствуют современным требованиям, а гибкий формат обучения позволяет учиться в любое 
          время и с любого устройства.`,
  },
  {
    id: 7,
    text: `Обучайтесь у профессионалов и повышайте уровень своей безопасности вместе с нами.`,
  },
  {
    id: 8,
    text: `Мы всегда готовы к диалогу и взаимовыгодному сотрудничеству!`
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
      margin-bottom: 4px;

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

        &__item{
          margin: 8px 0;

          &:last-child{
            font-family: 'IBM M';
            font-size: 18px;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .right-column {
    width: 35%;

    .news-sidebar {
      background-color: #eaf6ff; 
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