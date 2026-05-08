<template>
  <div class="document-accordion">
    <div
      v-for="(doc, index) in documents"
      :key="index"
      class="document-item"
      :class="{ 'is-expanded': expandedIndex === index }"
      @click="toggleExpand(index)"
    >
      
      <div class="document-header" :class="{ 'open': expandedIndex === index }">
        <span class="document-number">({{ String(index + 1).padStart(2, '0') }})</span>
        <span class="document-title">{{ doc.title }}</span>
        <span class="document-size" v-if="doc.size">{{ doc.size }}</span>
        <div class="toggle-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="expandedIndex === index" d="M18 15l-6-6-6 6" /> 
            <path v-else d="M6 9l6 6 6-6" /> 
          </svg>
        </div>
      </div>

      
      <div class="document-content">
        <div class="pdf-preview-wrapper">
          <embed
            :src="`${doc.file}#page=1`"
            type="application/pdf"
            class="pdf-preview"
          />
          <a
            :href="doc.file"
            target="_blank"
            rel="noopener noreferrer"
            class="download-overlay"
            :itemprop="doc.micro"
            @click.stop
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  documents: {
    type: Array,
    required: true
  }
})

const expandedIndex = ref(null)
const toggleExpand = (index) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = null
  } else {
    expandedIndex.value = index
  }
}
</script>

<style lang="scss" scoped>
.document-accordion {
  max-width: 100%;
  margin: 0 auto;
  border-top: 1px solid #e0e0e0; 
  border-bottom: 1px solid #e0e0e0;
}

.document-item {
  border-top: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  position: relative;

  &:first-child {
    border-top: none; 
  }

  &:last-child {
    border-bottom: none;
  }

  &.is-expanded {
    .document-header {
      background-color: white;
      border-top: 2px solid #003366;
      padding: 16px 24px;
      position: relative;
      z-index: 2; 

      &.open{
        background-color: #003366;
        color: white;

        .document-title,
        .document-number,
        .toggle-icon{
            color: white;
        }
      }
    }

    .document-content {
      min-height: 290px; 
      opacity: 1;
      padding: 0;
      background-color: #003366; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .pdf-preview-wrapper {
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 10px 10px 10px auto;
      position: absolute;
      top: 20px;
      right: 60px;
      z-index: 2;
    }
  }
}

.document-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  background-color: white;
  position: relative;
  transition: background-color 0.2s ease;

  .document-number {
    font-weight: bold;
    color: #123970;
    margin-right: 12px;
    min-width: 36px;
    text-align: center;
  }

  .document-title {
    flex-grow: 1;
    color: #123970;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .document-size {
    font-size: 0.875rem;
    color: #777;
    margin-left: 12px;
    white-space: nowrap;
  }

  .toggle-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    color: #123970;
  }
}

.document-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  padding: 0;
  transition: all 0.3s ease;
  background-color: transparent;
}

.pdf-preview-wrapper {
  position: relative;
  width: 220px;
  height: 285px;
  overflow: hidden; 
  margin-left: auto;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.pdf-preview {
  width: 109%;
  height: 100%;
  border: none;
  display: block;
  background: #fff;
  object-fit: contain; 
}

.download-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 6px;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }

  svg {
    stroke: white;
  }
}
</style>