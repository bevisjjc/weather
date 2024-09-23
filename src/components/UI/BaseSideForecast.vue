<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    fillColor: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    data2: {
        type: Object,
        required: false,
        default: null,
    },
    unit: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div class="flex items-center mb-3">
        <unicon
            :name="props.icon"
            :fill="props.fillColor"
            class="w-8 h-8"
        ></unicon>
        <p class="flex items-center text-xl font-bold text-gray-900 ml-6">
            {{ props.data }}
            <span class="text-lg ml-0.5">{{ props.unit }}</span>
            <template v-if="!!props.data2">
                &nbsp;-
                {{ props.data2 }}
                <span class="text-lg ml-0.5">{{ props.unit }}</span>
            </template>
        </p>
    </div>
</template>
<style lang="scss" scoped></style>
