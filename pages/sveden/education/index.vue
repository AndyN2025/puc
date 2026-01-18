<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="4"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>
    <CardSlider :dotShow="false" style="margin-bottom: 40px;"/>
    <DotTitle text="программы и формы обучения" />
    <TitleCommon text="Образовательные программы и подготовка специалистов"/>

    <div class="accessibility-grid">
      <!-- Карточка 1 -->
      <div class="accessibility-grid__card">
        <div class="accessibility-grid__icon">
          <img :src="eduIcon1" alt="Иконка лифт"  />
        </div>
        
        <h3 class="accessibility-grid__title">Реализуемые виды образования</h3>
        <ul class="accessibility-grid__text">
          <li>1. Профессиональное обучение,</li>
          <li>2. Дополнительное профессиональное образование.</li>
        </ul>
      </div>

      <!-- Картинка (блок 2) -->
      <div class="accessibility-grid__image">
        <img :src="build" alt="Фото здания" />
      </div>

      <!-- Карточка 3 -->
      <div class="accessibility-grid__card">
        <div class="accessibility-grid__icon">
          <img :src="eduIcon2" alt="Иконка кран"  />
        </div>
        <h3 class="accessibility-grid__title">Предаттестационная подготовка</h3>
        <p class="accessibility-grid__text">Предаттестационная подготовка руководителей и специалистов организаций, поднадзорных Федеральной службе по экологическому и технологическому надзору</p>
      </div>

      <!-- Карточка 4 -->
      <div class="accessibility-grid__card">
        <div class="accessibility-grid__icon">
          <img :src="eduIcon3" alt="Иконка обучение"  />
        </div>
        <h3 class="accessibility-grid__title">Формы обучения</h3>
        <ul class="accessibility-grid__text">
          <li>1. Очная,</li>
          <li>2. Очно-заочная,</li>
          <li>3. Заочная.</li>
        </ul>
      </div>

      <!-- Карточка 5 -->
      <div class="accessibility-grid__card">
        <div class="accessibility-grid__icon">
          <img :src="eduIcon4" alt="Иконка завод"  />
        </div>
        <h3 class="accessibility-grid__title">Язык обучения</h3>
        <p class="accessibility-grid__text">Русский</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import CardSlider from '@/components/UI/CardSlider.vue'
import { navSvedenItems } from '@/utils/svedenUtils'
import eduIcon1 from '@/assets/img/common/educ1.svg'
import eduIcon2 from '@/assets/img/common/educ2.svg'
import eduIcon3 from '@/assets/img/common/educ3.svg'
import eduIcon4 from '@/assets/img/common/educ4.svg'
import build from '@/assets/img/common/building.webp'


const titleCommon = ref('Образование')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
] 

</script>

<style scoped lang="scss">
.accessibility-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 20px;
  margin: 40px 0 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.accessibility-grid__card {
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #123970;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    grid-column: 1;
  }
}

.accessibility-grid__icon {
  width: 60px;
  height: 60px;
  margin-bottom: 14px;
  background-color: #E9F4FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    object-fit: contain;
  }
}

.accessibility-grid__title {
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 24px;
  color: #123970;
  margin-bottom: 8px;
}

.accessibility-grid__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.accessibility-grid__image {
  grid-row: span 2; /* ← занимает 2 строки */
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    aspect-ratio: 3 / 4;


  }

  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(18, 57, 112, 0.7);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    grid-row: span 1;
    aspect-ratio: 16 / 9;
  }
}
</style>
