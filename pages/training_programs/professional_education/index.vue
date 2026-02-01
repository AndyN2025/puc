<template>
  <div class="p">
    <Breadcrumbs :items="breadCrumbs"/> 
    <NavBlock 
      :navItems="navCourseItems" 
      :activeIndex="7"
      :tabs="tabs"
     :modelValue="selectedTab"
      @update:modelValue="handleTabChange"/>
    <DotTitle :text="titleCommon" />
    <TitleCommon text="Профессиональная подготовка"/>

    <div class="content-block">
      <div class="content-block__row">
        <div class="block-item first">
          <div class="block-item__title">Грузоподъёмные и строительные механизмы</div>
          <ul class="block-item__list">
            <li class="block-item__item" v-for="item in FirstBlockList" :key="item.id">
              <img :src="checkIcon" class="block-item__img"/>
              <p class="block-item__text">{{ item.text }}</p>
            </li>
          </ul>
        </div>
        <div class="block-item second">
          <div class="block-item__title">Газовое оборудование и топливные системы</div>
          <ul class="block-item__list">
            <li class="block-item__item" v-for="item in SecondBlockList" :key="item.id">
              <img :src="checkIcon" class="block-item__img"/>
              <p class="block-item__text">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="content-block__row">
        <div class="block-item third">
          <div class="block-item__title">Бумажное и целлюлозно-бумажное производство</div>

          <div class="third-row">
            <div class="list-wrapper__list third-row__item">
              <p class="list-wrapper__title">Резка бумаги и картона:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList1" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>

            <div class="list-wrapper__list  third-row__item">
              <p class="list-wrapper__title">Автоматические линии по изготовлению тетрадей/альбомов:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList2" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="third-row">
            <div class="list-wrapper__list  third-row__item">
              <p class="list-wrapper__title">Сушка и прессование:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList3" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>

            <div class="list-wrapper__list  third-row__item">
              <p class="list-wrapper__title">Обучение персонала ХОПО:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList4" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="third-row">
            <div class="list-wrapper__list third-row__item">
              <p class="list-wrapper__title">Размол:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList5" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>

            <div class="list-wrapper__list third-row__item">
              <p class="list-wrapper__title">Эксплуатация бумагоделательных линий:</p>
              <ul class="block-item__list">
                <li class="block-item__item" v-for="item in FiveBlockList6" :key="item.id">
                  <img :src="checkIcon" class="block-item__img"/>
                  <p class="block-item__text">{{ item.text }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="content-block__row">
        <div class="content-block__column">
          <div class="block-item for">
            <div class="block-item__title">Химическое производство и лабораторный контроль</div>
            <ul class="block-item__list">
              <li class="block-item__item" v-for="item in ForBlockList" :key="item.id">
                <img :src="checkIcon" class="block-item__img"/>
                <p class="block-item__text">{{ item.text }}</p>
              </li>
            </ul>
          </div>

          <div class="block-item seven">
            <div class="block-item__title">Упаковочные процессы</div>
            <ul class="block-item__list">
              <li class="block-item__item" v-for="item in SevenBlockList" :key="item.id">
                <img :src="checkIcon" class="block-item__img"/>
                <p class="block-item__text">{{ item.text }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="content-block__column">
          <div class="block-item five">
            <div class="block-item__title">Пищевая и комбикормовая промышленность</div>
            <ul class="block-item__list">
              <li class="block-item__item" v-for="item in FiveBlockList" :key="item.id">
                <img :src="checkIcon" class="block-item__img"/>
                <p class="block-item__text">{{ item.text }}</p>
              </li>
            </ul>
          </div>
          <div class="block-item six">
            <div class="block-item__title">Транспорт и складская техника</div>
            <ul class="block-item__list">
              <li class="block-item__item" v-for="item in SixBlockList" :key="item.id">
                <img :src="checkIcon" class="block-item__img"/>
                <p class="block-item__text">{{ item.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import DotTitle from '@/components/UI/DotTitle.vue';
import TitleCommon from '@/components/UI/TitleCommon.vue';
import NavBlock from '@/components/UI/NavBlock.vue'
import checkIcon from '@/assets/img/checkIcon.svg'
import { navCourseItems } from '@/utils/svedenUtils'

const titleCommon = ref('Виды обучения')

const breadCrumbs = [
  { text: 'Главная', link: '/' },
  { text: titleCommon.value, link: '/training_programs/' },
  { text: `Профессиональная подготовка`, link: '/professional_education/' },
] 

const tabs = [
  { text: 'Все', value: 'all' },
  { text: 'Дистанционно', value: 'online' },
  { text: 'Очно', value: 'offline' }
]

const selectedTab = ref('all')
function handleTabChange(value: string) {
  selectedTab.value = value
}


const FirstBlockList = [
  { id: 1, text: 'Наладчик строительных машин' },
  { id: 2, text: 'Машинист крана автомобильного' },
  { id: 3, text: 'Машинист крана (крановщик)' },
  { id: 4, text: 'Машинист автовышки и автогидроподъемника' },
  { id: 5, text: 'Машинист подъемника строительного' },
  { id: 6, text: 'Слесарь по такелажу и грузозахватным приспособлениям' },
  { id: 7, text: 'Стропальщик' }
];

const SecondBlockList = [
  { id: 1, text: 'Машинист газораздаточной станции' },
  { id: 2, text: 'Слесарь по эксплуатации и ремонту газового оборудования' },
  { id: 3, text: 'Слесарь аварийно-восстановительных работ в газовом хозяйстве' },
  { id: 4, text: 'Оператор товарный' },
  { id: 5, text: 'Оператор заправочных станций' },
  { id: 6, text: 'Оператор котельной' }
];

const ForBlockList = [
  { id: 1, text: 'Аппаратчик химводоочистки' },
  { id: 2, text: 'Аппаратчик синтеза 4 разряда' },
  { id: 3, text: 'Аппаратчик электролиза' },
  { id: 4, text: 'Лаборант химического анализа' },
  { id: 5, text: 'Сливщик-разливщик' }
];

const FiveBlockList1 = [
  { id: 1, text: 'Аппаратчик комбикормового производства' },
  { id: 2, text: 'Аппаратчик мукомольного производства' },
  { id: 3, text: 'Варщик' }
];

const FiveBlockList2 = [
  { id: 1, text: 'Машинист линии по изготовлению тетрадей для нот и альбомов (3 разряд)' },
  { id: 2, text: 'Машинист линии по изготовлению тетрадей для нот и альбомов (4 разряд)' },
  { id: 3, text: 'Машинист линии по изготовлению тетрадей для нот и альбомов (5 разряд)' }
];

const FiveBlockList3 = [
  { id: 1, text: 'Сушильщик бумагоделательной (картоноделательной) машины (2 разряд)' },
  { id: 2, text: 'Сушильщик бумагоделательной (картоноделательной) машины (3 разряд)' },
  { id: 3, text: 'Сушильщик бумагоделательной (картоноделательной) машины (4 разряд)' }
];

const FiveBlockList4 = [
  { id: 1, text: `Обучение персонала, обслуживающего сосуды (газификаторы, баллоны), работающие под давлением для  хранения медицинского кислорода.` },
  { id: 2, text: `Обучение персонала ХОПО, на которых используются  и хранятся токсичные и высокотоксичные вещества.` },
  { id: 3, text: `Обучение персонала ХОПО, на которых хранятся и используются неорганические жидкие кислоты и щелочи.` }
];

const FiveBlockList5 = [
  { id: 1, text: 'Размольщик (3 разряд)' },
  { id: 2, text: 'Размольщик (4 разряд)' },
];

const FiveBlockList6 = [
  { id: 1, text: 'Машинист бумагоделательной (картоноделательной) машины  (сеточник) (5 разряд)' },
  { id: 2, text: 'Накатчик бумагоделательной (картоноделательной) машины (3 разряд)' },
];

const SixBlockList = [
  { id: 1, text: 'Водитель погрузчика' },
  { id: 2, text: 'Водитель электро- и авто-тележки' }
];

const SevenBlockList = [
  { id: 1, text: 'Машинист упаковочной машины' }
];

</script>

<style scoped lang="scss">

.content-block{
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;

  &__row{
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;

    .first,
    .second{
      flex: 1;
    }
  }

  &__column{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.block-item{
  background-color: #E9F4FF;
  border-radius: 12px;
  padding: 24px;

  &__title{
    font-family: 'Inter M', sans-serif;
    font-size: 24px;
    line-height: 1.4;
    color: #123970;
    margin-bottom: 24px;
  }

  &__list{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item{
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
}

.list-wrapper__title{
  font-family: 'Inter M', sans-serif;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 24px;
}

.third{
  width: 100%;

  &-row{
    display: flex;
    flex-direction: row;
    width: 100%;

    &__item{
      flex: 1;
      margin-bottom: 32px;
    }
  }

}

</style>
