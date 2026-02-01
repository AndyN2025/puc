<template>
    <div class="acc__content">
        <div class="acc__content-item" v-if="props.diploma  || props.document  || props.specialty">
            <div class="acc__content-title" v-if="props.diploma">Диплом</div>
            <p class="acc__content-text" v-if="props.diploma ">
                {{ props.diploma }}
            </p>

            <div v-if="document">
                <div class="acc__content-title udostoveren">Удостоверение</div>
                <template v-if="Array.isArray(document)">
                    <p class="acc__content-text udostoveren-text" v-for="(doc, idx) in document" :key="idx">
                        {{ doc }}
                    </p>
                </template>
                <template v-else>
                    <p class="acc__content-text">
                        {{ typeof document === 'string' ? document : document?.text }}
                    </p>
                </template>
            </div>

            <div class="acc__content-title" v-if="props.specialty">
                Наименование направления подготовки и специальности педагогического работника</div>
            <p class="acc__content-text" v-if="props.specialty">{{ props.specialty }}</p>
        </div>

        <div class="acc__content-item">
            <div class="acc__content-title">Перечень преподаваемых программ:</div>
            <ul class="acc__content-list">
                <li v-for="(program, idx) in props.programs" :key="idx" class="acc__content-list-item">
                    <img :src="checkIcon" alt="" />
                    <span>{{ program }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup lang="ts">
import checkIcon from '@/assets/img/common/checkProgram.svg'

const props = defineProps({
    diploma: {
        type: [String, Object],
        default: null
    },
    document: {
        type: [String, Object, Array],
        default: null
    },
    specialty: {
        type: String,
        default: null
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

    &.udostoveren{
        margin-bottom: 20px;
    }
}



.acc__content-text {
    margin: 0;
    font-size: 16px;
    line-height: 1.3;
    color: #000000;
    font-family: 'IBM', sans-serif;

    &.udostoveren-text{
        margin-bottom: 10px;
    }
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