<template>
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <ul class="breadcrumbs-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-active': index === items.length - 1 }"
      >
        <span v-if="index === items.length - 1" class="breadcrumb-text">
          {{ item.text }}
        </span>
        <NuxtLink
          v-else
          :to="item.link"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </NuxtLink>


        <span v-if="index < items.length - 1" class="breadcrumb-separator">
          →
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      return items.every(item => typeof item.text === 'string' && (typeof item.link === 'string' || item.link === undefined))
    }
  }
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  padding: 8px 0;
  font-size: 0.9375rem;
  margin-bottom: 30px;

  .breadcrumbs-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 8px;

      .breadcrumb-link {
        color: #123970;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.2s ease;

        &:hover {
          color: #004494;
          text-decoration: underline;
        }
      }

      .breadcrumb-text {
        color: #333;
        font-weight: 600;
      }

      .breadcrumb-separator {
        color: #888;
        margin: 0 8px;
        font-weight: 600;
      }

      &.is-active .breadcrumb-text {
        color: #333;
        font-weight: 700;
      }
    }
  }
}
</style>