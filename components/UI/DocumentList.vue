<template>
  <div class="document-list">
    <a
      v-for="(doc, index) in safeDocuments"
      :key="index"
      class="document-item"
      :href="doc.safeFile"
      :target="type === 'read' ? '_blank' : undefined"
      :rel="type === 'read' ? 'noopener noreferrer' : undefined"
      :download="type === 'save' ? '' : undefined"
      v-bind="doc.micro ? { itemprop: doc.micro } : {}"
    >
      <span class="document-number">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="document-title">{{ doc.title }}</span>
      <span class="download-icon">
        <img :src="dwnlIcon" :alt="type === 'save' ? SITE_TEXT.documentList.saveAlt : SITE_TEXT.documentList.readAlt" />
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import dwnlIcon from '@/assets/img/common/downLoadIcon.svg'
import { SITE_TEXT } from '@/utils/siteText'
import { getSafeDocumentHref } from '@/utils/documentLinks'

export interface DocumentListItem {
  title: string
  file: string
  /** Атрибут микроразметки (методические рекомендации Рособрнадзора и др.) */
  micro?: string
}

const props = defineProps({
  documents: {
    type: Array as PropType<DocumentListItem[]>,
    required: true
  },
  type: {
    type: String,
    default: 'read',
    validator: (value: string) => ['read', 'save'].includes(value)
  }
})

const safeDocuments = computed(() =>
  props.documents
    .map((doc) => ({
      ...doc,
      safeFile: getSafeDocumentHref(doc.file)
    }))
    .filter((doc): doc is DocumentListItem & { safeFile: string } => Boolean(doc.safeFile))
)
</script>

<style lang="scss" scoped>
.document-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;

  .document-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: white;
    border-top: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    color: #666;
    text-decoration: none;

    &:last-child {
      border-bottom: 1px solid #e0e0e0;
    }

    &:hover {
      background-color: #123970;
      color: white;
    }

    &:active {
      background-color: #eaf6ff;
      border-color: #123970;
    }

    .document-number {
      font-size: 0.875rem;
      min-width: 32px;
      text-align: center;
      margin-right: 12px;
      font-weight: 500;
    }

    .document-title {
      flex-grow: 1;
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .download-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #888;
      opacity: 0.8;

      svg {
        width: 16px;
        height: 16px;
      }

      &:hover {
        color: #123970;
        opacity: 1;
      }
    }
  }

  .document-item:hover .download-icon {
    color: inherit;
    opacity: 1;
  }
}
</style>
