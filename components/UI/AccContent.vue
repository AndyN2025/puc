<template>
    <div class="acc__content">
        <div class="acc__content-item" v-if="diploma && diploma.text || document && document.text || specialty">
            <div class="acc__content-title" v-if="diploma && diploma.text">Диплом</div>
            <p class="acc__content-text" v-if="diploma && diploma.text">
                {{ diploma.text }}
            </p>
            <div class="acc__content-title" v-if="document && document.text">Удостоверение</div>
            <p class="acc__content-text" v-if="document && document.text">
                {{ document.text }}
            </p>
            <div class="acc__content-title" v-if="specialty">
                Наименование направления подготовки и специальности педагогического работника</div>
            <p class="acc__content-text" v-if="specialty">{{ specialty }}</p>
        </div>

        <div class="acc__content-item">
            <div class="acc__content-title">Перечень преподаваемых программ:</div>
            <ul class="acc__content-list">
                <li v-for="(program, idx) in programs" :key="idx" class="acc__content-list-item">
                    <img :src="checkIcon" alt="" />
                    <span>{{ program }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import checkIcon from '@/assets/img/common/checkProgram.svg'

defineProps({
    diploma: {
        type: Object as () => { text: string },
    },
    document: {
        type: Object as () => { text: string },
    },
    specialty: {
        type: String,
        required: true
    },
    programs: {
        type: Array as () => string[],
        default: () => []
    }
})
</script>

<style scoped lang="scss">
.acc__content {
    display: flex;
    flex-direction: row;
    gap: 24px;
}

.acc__content-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

.acc__content-title {
    font-size: 24px;
    line-height: 1.05;
    color: #123970;
    font-family: 'IBM', sans-serif;
}

.acc__content-text {
    margin: 0;
    font-size: 16px;
    line-height: 1.3;
    color: #000000;
    font-family: 'IBM', sans-serif;
}

.acc__content-list {
    padding-left: 20px;
    margin: 0;
    list-style: disc;
}

.acc__content-list-item {
    margin: 4px 0;
    font-size: 1rem;
    line-height: 1.2;
    color: #4a4a4a;
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 8px;

    span{
        display: flex;
        align-items: center;
    }
}
</style>