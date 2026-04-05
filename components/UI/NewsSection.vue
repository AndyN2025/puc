<template>
  <div class="about-center-section">
    <div class="left-column">
      <div class="section-block">
        <h2 class="section-title">АНО ДПО "Приокский учебный центр"</h2>
        <ul class="section-text">
          <li
            v-for="item in textAboutUC"
            :key="item.id"
            class="section-text__item"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="right-column">
      <div class="news-sidebar">
        <h3 class="sidebar-title">Новости центра</h3>

        <div class="news-sidebar__mobile-only">
          <p class="sidebar-lead">
            Актуальные объявления о наборах, программах и форматах обучения.
          </p>
          <NuxtLink to="/news/" class="news-cta-link">
            Перейти к новостям
          </NuxtLink>
        </div>

        <div class="news-sidebar__list">
          <div
            v-for="news in newsList"
            :key="news.slug"
            class="news-item"
          >
            <div class="news-date">{{ news.date }}</div>
            <div class="news-content">
              <span class="news-category">{{ news.category }}</span>
              <NuxtLink :to="`/news/${news.slug}`" class="news-link">{{ news.title }}</NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink to="/news/" class="all-news-link">Все новости</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { homeNewsPreview } from '@/data/news'

const newsList = homeNewsPreview

const textAboutUC = reactive([
  {
    id: 1,
    text: `Автономная некоммерческая организация дополнительного профессионального образования 
          «Приокский учебный центр» — многопрофильный учебный центр, успешно работающий с 1998 года. 
          Центр осуществляет образовательную деятельность для специалистов различного профиля, проводит 
          профессиональное обучение, направленное на приобретение  профессиональных компетенций, получение 
          квалификации по программам подготовки, переподготовки, повышения квалификации, обучение рабочим 
          профессиям.`
  },
  {
    id: 2,
    text: `Приокский учебный центр внесен в реестр аккредитованных организаций, оказывающих услуги в области 
          охраны труда, обучению безопасным методам и приемам выполнения работ повышенной опасности.`
  },
  {
    id: 3,
    text: `Подготовка руководителей и специалистов проводится по промышленной, пожарной, экологической 
          безопасности, безопасности гидротехнических сооружений, организации деятельности по обороту 
          наркотических средств, психотропных веществ и их прекурсоров.`
  },
  {
    id: 4,
    text: `C 2005 года проводим подготовку персонала в сфере теплоснабжения. Накоплен большой опыт, 
          разработан курс комплексной подготовки, позволяющий слушателям успешно подготовиться к 
          проверке знаний в комиссии Ростехнадзора.`
  },
  {
    id: 5,
    text: `Дистанционное обучение без отрыва от работы, из любого региона проводится на базе системы 
          дистанционного обучения, обеспечивающей круглосуточный доступ к учебным материалам и проверке 
          знаний. Для учебы достаточно иметь доступ в интернет.`
  },
  {
    id: 6,
    text: `За время своей деятельности центр зарекомендовал себя как надежный партнер. Наши программы 
          соответствуют современным требованиям, а гибкий формат обучения позволяет учиться в любое 
          время и с любого устройства.`
  },
  {
    id: 7,
    text: `Обучайтесь у профессионалов и повышайте уровень своей безопасности вместе с нами.`
  },
  {
    id: 8,
    text: `Мы всегда готовы к диалогу и взаимовыгодному сотрудничеству!`
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.about-center-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  padding: $spacing-lg;
  background-color: $color-white;
  border: 1px solid $color-border-strong;
  border-radius: $radius-lg;

  @include m.from($bp-md) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    padding: 1.5rem;
  }

  .left-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;

    @include m.from($bp-md) {
      flex: 1 1 0;
      min-width: 0;
      width: auto;
    }

    .section-block {
      margin-bottom: 4px;

      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: $color-darkBlue;
        margin-bottom: 12px;
        position: relative;
      }

      .section-text {
        font-size: 0.9375rem;
        line-height: 1.6;
        color: $color-text-body;
        margin: 0 0 16px 0;
        text-align: justify;
        list-style: none;
        padding: 0;

        &__item {
          margin: 8px 0;

          &:last-child {
            font-family: $font-ibm-m;
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
    width: 100%;

    @include m.from($bp-md) {
      flex: 0 0 min(22rem, 32%);
      max-width: 26rem;
    }
  }

  .news-sidebar {
    background-color: $color-bg-nav;
    padding: $spacing-lg;
    border-radius: $radius-lg;
    box-shadow: $shadow-soft;
    border: 1px solid $color-border;
    text-align: center;

    @include m.from($bp-md) {
      text-align: left;
    }

    /* До 768px: список скрыт, одна кнопка; с 768px — список как раньше */
    &__mobile-only {
      display: block;

      @include m.from($bp-md) {
        display: none;
      }
    }

    &__list {
      display: none;

      @include m.from($bp-md) {
        display: block;
      }
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 700;
      font-family: $font-ibm-m;
      color: $color-darkBlue;
      margin: 0 0 $spacing-md;
      text-align: center;

      @include m.from($bp-md) {
        text-align: center;
      }
    }

    .sidebar-lead {
      margin: 0 0 $spacing-lg;
      font-size: $font-size-sm;
      line-height: $line-height-body;
      color: $color-text-muted;
      text-align: center;
    }

    .news-cta-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.75rem 1.25rem;
      border-radius: $radius-md;
      font-family: $font-ibm-m;
      font-weight: $font-weight-semibold;
      font-size: $font-size-base;
      text-decoration: none;
      color: $color-white;
      background: $color-darkBlue;
      transition:
        background-color $transition-base,
        transform $transition-fast;

      &:hover {
        background: $color-cta-hover;
        transform: translateY(-1px);
      }

      &:focus-visible {
        outline: 2px solid $color-darkBlue;
        outline-offset: 3px;
      }
    }

    .news-item {
      background: $color-white;
      padding: 16px;
      border-radius: $radius-md;
      margin-bottom: 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      transition: transform $transition-base;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        transform: translateY(-2px);
      }

      .news-date {
        font-size: $font-size-sm;
        color: $color-text-muted;
        margin-bottom: 8px;
      }

      .news-content {
        .news-category {
          display: block;
          font-size: $font-size-sm;
          color: $color-darkBlue;
          font-weight: $font-weight-semibold;
          margin-bottom: 4px;
        }

        .news-link {
          font-size: 0.9375rem;
          color: $color-text-body;
          text-decoration: none;
          line-height: 1.4;
          display: block;
          transition: color $transition-fast;

          &:hover {
            color: $color-darkBlue;
            text-decoration: underline;
          }
        }
      }
    }

    .all-news-link {
      display: none;
      text-align: center;
      font-weight: $font-weight-semibold;
      font-family: $font-ibm-m;
      color: $color-darkBlue;
      text-decoration: none;
      margin-top: 20px;
      padding: 8px 0;
      border-top: 1px solid #d0d0d0;
      transition: color $transition-fast;

      @include m.from($bp-md) {
        display: block;
      }

      &:hover {
        color: $color-cta-hover;
      }
    }
  }
}
</style>
