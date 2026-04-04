<template>
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <ul class="breadcrumbs-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-active': index === items.length - 1 }"
      >
        <span
          v-if="index === items.length - 1"
          class="breadcrumb-text"
          :title="item.text"
        >
          {{ item.text }}
        </span>
        <NuxtLink
          v-else
          :to="item.link"
          class="breadcrumb-link"
          :title="item.text.length > 48 ? item.text : undefined"
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
@use '@/assets/styles/vars' as *;
@use '@/assets/styles/mixins' as m;

.breadcrumbs {
  padding-top: clamp(0.75rem, 2vw, 1.25rem);
  padding-bottom: $spacing-sm;
  font-size: 0.9375rem;
  margin-bottom: $spacing-lg;
  max-width: 100%;
  min-width: 0;

  .breadcrumbs-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 0;
    width: 100%;
    max-width: 100%;
    row-gap: 0.35rem;
    column-gap: 0;

    @include m.from($bp-lg) {
      flex-wrap: nowrap;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;

      &:not(.is-active) {
        flex-shrink: 1;

        @include m.from($bp-lg) {
          flex-shrink: 0;
        }
      }

      &.is-active {
        flex: 1 1 100%;
        min-width: 0;
        overflow: hidden;

        @include m.from($bp-lg) {
          flex: 1 1 0;
        }
      }

      .breadcrumb-link {
        color: #123970;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.2s ease;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @include m.until($bp-lg) {
          display: block;
          max-width: 100%;
        }

        &:hover {
          color: #004494;
          text-decoration: underline;
        }
      }

      .breadcrumb-text {
        color: #333;
        font-weight: 600;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        max-width: 100%;
      }

      .breadcrumb-separator {
        color: #888;
        margin: 0 6px;
        font-weight: 600;
        flex-shrink: 0;

        @include m.from($bp-lg) {
          margin: 0 8px;
        }
      }

      &.is-active .breadcrumb-text {
        color: #333;
        font-weight: 700;
      }
    }
  }
}
</style>