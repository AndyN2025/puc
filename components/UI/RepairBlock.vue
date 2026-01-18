<template>
    <div class="repair">
        <div class="repair__img">
            <img :src="Repair" alt="Техниеские работы на странице"/>
        </div>
        <div class="repair__text">
            <p>Страница в разработке</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Repair from '@/assets/img/repairImg.png'
</script>
<style lang="scss" scoped>
.repair{
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img{
        max-height: 320px;
        max-width: 320px;
        height: 100%;
        width: 100%;

        img{
            width: 100%;
            height: 100%;
        }
    }

    &__text{
        font-size: 60px;
        font-weight: 600;
        color: #123970;
    }
}
</style>
