<template>
  <div class="document-list">
    <div
      v-for="(doc, index) in documents"
      :key="index"
      class="document-item"
      @click="handleDocumentClick(doc.file)"
    >
      <span class="document-number">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="document-title">{{ doc.title }}</span>
      <span class="download-icon">
        <img :src="dwnlIcon" :alt="props.type === 'save' ? 'Скачать документ' : 'Открыть документ'" />
      </span>
    </div>
  </div>
</template>

<script setup>
import dwnlIcon from '@/assets/img/common/downLoadIcon.svg'

const props = defineProps({
  documents: {
    type: Array,
    required: true,
    default: () => [],
    validator: (items) => {
      return items.every(item =>
        typeof item.title === 'string' &&
        typeof item.file === 'string'
      )
    }
  },
  type: {
    type: String,
    default: 'read', // 'read' или 'save'
    validator: (value) => ['read', 'save'].includes(value)
  }
})

const handleDocumentClick = (url) => {
  if (props.type === 'read') {
    // Открыть в новой вкладке
    window.open(url, '_blank', 'noopener,noreferrer');
  } else if (props.type === 'save') {
    // Скачать файл
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // имя файла из URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
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

    &:last-child{
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
}
</style>