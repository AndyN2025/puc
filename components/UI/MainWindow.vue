<template>
    <div class="main" :style="{ backgroundImage: `url(${mainPic})` }">
        <div class="main__content">
            <h1 class="main__title">Дополнительное профессиональное образование<br/>Очно, заочно, онлайн</h1>
            <p class="main__text">Более 20 лет мы занимаемся профессиональным обучением, дополнительным профессиональным образованием в области промышленной, экологической, энергетической, пожарнойбезопасности, охраны труда.</p>
            <div class="main__buttons">
                <button class="main__buttons-item dark">Заказать звонок</button>
                <NuxtLink to="/training_programs" class="main__buttons-item light">Наши курсы</NuxtLink>
                <a :href="'tel:' + telNumber" class="main__buttons-item number" >+7 (4842) 56-21-83</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//import mainPic from '@/assets/img/MainIMG.webp'
import mainPic from '@/assets/img/mainTest1.png'
const telNumber = ref('84842562183')

</script>

<style lang="scss" scoped>
.main{
    position: relative;
    height: 90vh;
    min-height: 600px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;
    border-radius: 0 0 8px 8px;

    &__content{
        max-width: 780px;
        color: white;
    }

    &__title{
        font-size: 68px;
        line-height: 78px;
        text-transform: uppercase;
        margin-top: 80px;
        margin-bottom: 28px;
        font-family: 'Beb-B';
    }

    &__text{
        font-size: 18px;
        line-height: 1.7;
        font-family: 'IBM';
        margin-bottom: 60px;
    }

    &__buttons{
        display: flex;
        flex-direction: row;
        gap: 16px;

        &-item{
            width: 256px;
            height: 56px;
            border-radius: 8px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-family: 'IBM M';


            &.dark{
                background-color: #123970;
            }

            &.light{
                background-color: white;
                color: black;
            }

            &.number{
                color: white;
                font-size: 24px;
            }
        }
    }
}
</style>