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
        type: String,
        required: true,
    },
    data2: {
        type: String,
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
    <div class="flex items-center w-1/2 mb-3 sm:w-full sm:px-0">
        <unicon
            :name="props.icon"
            :fill="props.fillColor"
            class="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
        ></unicon>
        <p
            class="flex items-center text-lg xl:text-xl font-bold text-gray-900 ml-1.5 sm:ml-4 xl:ml-6"
        >
            {{ props.data }}
            <span class="text-lg ml-0.5">{{ props.unit }}</span>
            <template v-if="!!props.data2">
                &nbsp;-
                {{ props.data2 }}
                <span class="text-base sm:text-lg ml-0.5">
                    {{ props.unit }}
                </span>
            </template>
        </p>
    </div>
</template>
<style lang="scss" scoped></style>
