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
import Ustav from '@/assets/documents/documents/Ustav.pdf'

import License from '@/assets/documents/common/Лицензия на осуществление образовательной деятельности.pdf'

import samoObsl from '@/assets/documents/Отчет о самообследовании 2025.pdf'
import podtver from '@/assets/documents/documents/podtv_2334.pdf'
import vnutrTrud from '@/assets/documents/documents/local_act_trud_rasp.pdf'
import pedsovet from '@/assets/documents/documents/local_act_pedsovet.pdf'
import kurenie from '@/assets/documents/documents/local_act_kuren.pdf'
import spor from '@/assets/documents/documents/local_act_spor.pdf'
import slush from '@/assets/documents/documents/local_act_rasp_slush.pdf'
import profEtik from '@/assets/documents/documents/local_act_prof_etica.pdf'
import rulePriem from '@/assets/documents/documents/local_act_prav_priem.pdf'
import practic from '@/assets/documents/documents/local_act_pract_podg.pdf'

import reestrOT from '@/assets/documents/documents/local_vypiska_reestr_ot.pdf'
import perevodOtch from '@/assets/documents/documents/local_perevod_otchislenie.pdf'
import uspevaemost from '@/assets/documents/documents/local_uspevaemost.pdf'
import obuchenie from '@/assets/documents/documents/local_obuchenie.pdf'

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
    title: 'Выписка из реестра организаций, оказывающих услуги в области охраны труда',
    file: reestrOT
  }, 
  {
    title: 'Правила внутреннего распорядка обучающихся',
    file: slush
  },
  {
    title: 'Правила внутреннего трудового распорядка',
    file: vnutrTrud
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
  },
  {
    title: 'Положение о порядке перевода, отчисления и восстановления обучающихся',
    file: perevodOtch
  },
  {
    title: 'Положение о формах, периодичности и порядке текущего контроля успеваемости, промежуточной и итоговой аттестации',
    file: uspevaemost
  },
  {
    title: 'Положение об организации и осуществлении образовательной деятельности по дополнительным общеобразовательным общеразвивающим программам',
    file: obuchenie
  },
  {
    title: 'Результаты последнего самообследования организации',
    file: samoObsl,
  },
]
</script>

<style scoped>

</style>
