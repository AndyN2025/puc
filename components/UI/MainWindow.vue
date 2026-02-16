<template>
    <div class="main" :style="{ backgroundImage: `url(${mainPic})` }">
        <div class="main__content">
            <h1 class="main__title">Дополнительное профессиональное образование<br/>Очно, заочно, онлайн</h1>
            <p class="main__text">Более 20 лет мы занимаемся профессиональным обучением, дополнительным профессиональным образованием в области промышленной, экологической, энергетической, пожарнойбезопасности, охраны труда.</p>
            <div class="main__buttons">
                <button class="main__buttons-item dark">Заказать звонок</button>
                <NuxtLink to="/training_programs" class="main__buttons-item light">Наши курсы</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import mainPic from '@/assets/img/MainIMG.png'

</script>

<style lang="scss" scoped>
.main{
    position: relative;
    max-height: 700px;
    min-height: 600px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 80px;
    border-radius: 8px;

    &__content{
        max-width: 720px;
        color: white;
    }

    &__title{
        font-size: 42px;
        line-height: 42px;
        text-transform: uppercase;
        margin-bottom: 16px;
        font-family: 'Beb-B';
    }

    &__text{
        font-size: 16px;
        line-height: 1.3;
        font-family: 'IBM';
        margin-bottom: 54px;
    }

    &__buttons{
        display: flex;
        flex-direction: row;
        gap: 16px;

        &-item{
            width: 216px;
            height: 56px;
            border-radius: 8px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: 'IBM M';


            &.dark{
                background-color: #123970;
            }

            &.light{
                background-color: white;
                color: black;
            }
        }
    }
}
</style>