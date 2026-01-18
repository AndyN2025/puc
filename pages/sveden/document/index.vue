<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock :navItems="navSvedenItems" :activeIndex="2"/>
    <DotTitle text="Сведения об образовательной организации" />
    <TitleCommon :text="titleCommon"/>
    <DocumentList :documents="documents" type="read"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import DocumentList from '@/components/UI/DocumentList.vue';
import { navSvedenItems } from '@/utils/svedenUtils'
import Ustav from '@/assets/documents/documents/УСТАВ.pdf'
import License from '@/assets/documents/common/Лицензия на осуществление образовательной деятельности.pdf'
import AkkrOrg from '@/assets/documents/documents/1.3.Uvedomleniye_o_vnesenii_v_reyestr_akkreditovannykh_organizatsiy.pdf'
import SvidIFNS from '@/assets/documents/documents/1.3.Svidetelstvo_IFNS.pdf'
import SvidGosReg from '@/assets/documents/documents/1.3.Svidetelstvo_IFNS.pdf'

import samoObsl from '@/assets/documents/documents/otchet_o_samoobsl.pdf'
import predpis from '@/assets/documents/documents/predpisanie_2016.pdf'
import podtver from '@/assets/documents/documents/podtv_2334.pdf'
import vnutrTrud from '@/assets/documents/documents/local_act_trud_rasp.pdf'
import pedsovet from '@/assets/documents/documents/local_act_pedsovet.pdf'
import kurenie from '@/assets/documents/documents/local_act_kuren.pdf'
import personData from '@/assets/documents/documents/local_act_obr_pers_dann.pdf'
import spor from '@/assets/documents/documents/local_act_spor.pdf'
import slush from '@/assets/documents/documents/local_act_rasp_slush.pdf'
import profEtik from '@/assets/documents/documents/local_act_prof_etica.pdf'
import rulePriem from '@/assets/documents/documents/local_act_prav_priem.pdf'
import practic from '@/assets/documents/documents/local_act_pract_podg.pdf'

const titleCommon = ref('Документы')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: 'Сведения об организации', link: '/sveden/common/' },
  { text: titleCommon.value, link: '/sveden/vacant/' }
] 

const documents = [
  {
    title: 'Устав',
    file: Ustav
  },
  {
    title: 'Лицензия на право осуществления образовательной деятельности',
    file: License
  },
  {
    title: 'Свидетельство о государственной регистрации некоммерческой организации',
    file: SvidGosReg
  },
  {
    title: 'Свидетельство о постановке на учёт в налоговом органе',
    file: SvidIFNS
  },
  {
    title: 'Уведомление о внесении в реестр аккредитованных организаций, оказывающих услуги в области охраны труда',
    file: AkkrOrg
  },
  {
    title: 'Подтверждение соответствия требованиям постановления Правительства Российской Федерации от 16 декабря 2021 г. № 2334 по обучению',
    file: podtver
  },
  {
    title: 'Результаты последнего самообследования организации',
    file: samoObsl,
  },
  {
    title: 'Предписания, вынесенные по результатам последней проверки',
    file: predpis
  },
  {
    title: 'Правила внутреннего трудового распорядка',
    file: vnutrTrud
  },
  {
    title: 'Правила внутреннего распорядка слушателей',
    file: slush
  },
  {
    title: 'Положение о Педагогическом совете',
    file: pedsovet
  },
  {
    title: 'Положение о комиссии по урегулированию споров между участниками образовательных отношений',
    file: spor
  },
  {
    title: 'Положение о запрете курения',
    file: kurenie
  },
  {
    title: 'Политика в отношении обработки персональных данных',
    file: personData
  },
  {
    title: 'Положение о нормах профессиональной этики педагогических работников',
    file: profEtik
  },
  {
    title: 'Правила приема слушателей на обучение',
    file: rulePriem
  },
  {
    title: 'Положение о практической подготовке обучающихся',
    file: practic
  }
]
</script>

<style scoped>
/* Можно писать CSS, если нужно */
</style>
