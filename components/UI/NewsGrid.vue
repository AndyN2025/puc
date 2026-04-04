<template>
  <div class="news-grid">
    
    <h2 class="section-title">Новости</h2>

    
    <div class="grid-container">
      
      <NuxtLink
        v-if="news[0]"
        :to="news[0].link"
        class="news-item large"
      >
        <div class="news-image" :style="{ backgroundImage: `url(${news[0].image})` }"></div>
        <div class="news-content">
          <span class="news-date">{{ news[0].date }}</span>
          <h3 class="news-title">{{ news[0].title }}</h3>
        </div>
      </NuxtLink>

      
      <div v-for="(item, index) in news.slice(1, 3)" :key="index" class="news-item small">
        <NuxtLink :to="item.link" class="news-link">
          <span class="news-date">{{ item.date }}</span>
          <h3 class="news-title">{{ item.title }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  news: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      return items.every(item =>
        typeof item.title === 'string' &&
        typeof item.date === 'string' &&
        typeof item.link === 'string' &&
        typeof item.image === 'string'
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.news-grid {
  padding: 24px;
  background-color: #fff;

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #123970;
    margin-bottom: 24px;
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

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    .news-item {
      background-color: #eaf6ff;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      &.large {
        grid-row: span 2;

        .news-image {
          height: 280px;
          background-size: cover;
          background-position: center;
        }

        .news-content {
          padding: 16px;
          text-align: center;
        }
      }

      &.small {
        .news-link {
          display: block;
          padding: 16px;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;

          &:hover {
            color: #123970;
          }
        }
      }

      .news-date {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 8px;
      }

      .news-title {
        font-size: 0.9375rem;
        font-weight: 600;
        color: #333;
        line-height: 1.4;
        margin: 0;
      }
    }
  }
}
</style>