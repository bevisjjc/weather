<script setup>
const props = defineProps({
    circle: Boolean,
    text: String,
    icon: {
        type: [String, Boolean],
        default: false,
    },
});
</script>

<template>
    <button
        class="w-10 h-10 mx-4 bg-zinc-300 text-white inline-flex items-center justify-center hover:bg-white transition duration-300"
        :data-tips="props.text"
        :class="{ 'rounded-full': props.circle }"
    >
        <template v-if="props.icon">
            <unicon :name="props.icon" fill="#000"></unicon>
        </template>
        <template v-else>
            {{ props.text }}
        </template>
    </button>
</template>
