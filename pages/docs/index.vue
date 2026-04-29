<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <DotTitle :text="titleCommon" />
    <TitleCommon :text="titleCommon"/>
    <DocumentList :documents="documents" type="save"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import DocumentList from '@/components/UI/DocumentList.vue';
import request1 from '@/assets/documents/request/1) Заявка Промышленная безопасность (ДПО).doc';
import request2 from '@/assets/documents/request/2) Заявка Промышленная безопасность (предаттестационная подготовка).doc';
import request3 from '@/assets/documents/request/3) Заявка ТЭУ.doc';
import request4 from '@/assets/documents/request/4) Заявка Общие вопросы охраны труда и функционирование системы  управления охраной труда (46а).doc';
import request5 from '@/assets/documents/request/5) Заявка Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов (46б).doc';
import request6 from '@/assets/documents/request/6) Заявка Обучение безопасным методам и приемам выполнения работ повышенной опасности (46в).doc';
import request7 from '@/assets/documents/request/7) Заявка Обучение по использованию (применению) средств индивидуальной защиты (СИЗ).doc';
import request8 from '@/assets/documents/request/8) Заявка Оказание первой помощи  пострадавшим.doc';
import request9 from '@/assets/documents/request/9) Заявка Обучение работников 3 группы по безопасности работ на высоте.doc';
import request10 from '@/assets/documents/request/10) Заявка Пожарная безопасность.doc';
import request11 from '@/assets/documents/request/11) Заявка Экологическая безопасность.doc';
import request12 from '@/assets/documents/request/12) Заявка Профессиональное обучение по профессии рабочего.doc';
import request13 from '@/assets/documents/request/13) Заявка Подготовка рабочего персонала.doc';
import request14 from '@/assets/documents/request/14) Заявка Программа профессиональной переподготовки «Специалист по охране труда».doc';
import request15 from '@/assets/documents/request/15) Заявка Профессиональная переподготовка в области промышленной безопасности.doc';
import request16 from '@/assets/documents/request/16) Заявка Профессиональная переподготовка по экологической безопасности.doc';
import request17 from '@/assets/documents/request/17) Заявка Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров.doc';
import request18 from '@/assets/documents/request/18) Заявка Госрегулирование НС ПВ медфарм.doc';

const titleCommon = ref('Бланки документов')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Бланки документов', link: '/docs' }
] 

const documents = [
  {
    title: 'Заявка Промышленная безопасность (ДПО)',
    file: request1
  },
  {
    title: 'Заявка Промышленная безопасность (предаттестационная подготовка)',
    file: request2
  },
  {
    title: 'Заявка ТЭУ',
    file: request3
  },
  {
    title: 'Заявка Общие вопросы охраны труда и функционирование системы управления охраной труда (46а)',
    file: request4
  },
  {
    title: 'Заявка Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов (46б)',
    file: request5
  },
  {
    title: 'Заявка Обучение безопасным методам и приемам выполнения работ повышенной опасности (46в)',
    file: request6
  },
  {
    title: 'Заявка Обучение по использованию (применению) средств индивидуальной защиты (СИЗ)',
    file: request7
  },
  {
    title: 'Заявка Оказание первой помощи пострадавшим',
    file: request8
  },
  {
    title: 'Заявка Обучение работников 3 группы по безопасности работ на высоте',
    file: request9
  },
  {
    title: 'Заявка Пожарная безопасность',
    file: request10
  },
  {
    title: 'Заявка Экологическая безопасность',
    file: request11
  },
  {
    title: 'Заявка Профессиональное обучение по профессии рабочего',
    file: request12
  },
  {
    title: 'Заявка Подготовка рабочего персонала',
    file: request13
  },
  {
    title: 'Заявка Программа профессиональной переподготовки "Специалист по охране труда"',
    file: request14
  },
  {
    title: 'Заявка Профессиональная переподготовка в области промышленной безопасности',
    file: request15
  },
  {
    title: 'Заявка Профессиональная переподготовка по экологической безопасности',
    file: request16
  },
  {
    title: 'Заявка Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров',
    file: request17
  },
  {
    title: 'Заявка Государственное регулирование в сфере оборота наркотических средств, психотропных веществ и их прекурсоров при осуществлении медицинской и фармацевтической деятельности',
    file: request18
  }
] 

</script>

<style scoped>

</style>
