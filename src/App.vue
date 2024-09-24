<script setup>
import { RouterView } from 'vue-router';
</script>
<template>
    <main
        class="w-full min-h-screen relative flex flex-col xl:items-start xl:flex-row"
    >
        <RouterView />
    </main>
</template>
<style lang="scss">
.router-link {
    @apply text-gray-400;
    position: relative;

    &::after {
        content: '';
        width: 0;
        height: 2px;
        @apply bg-gray-500;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        transition: all 0.3s;
    }

    &:hover {
        @apply text-gray-800;

        &::after {
            width: 100%;
        }
    }

    &-active {
        @apply text-gray-800;
        &::after {
            width: 100%;
        }
    }
}
@keyframes skeletonLoading {
    0% {
        @apply bg-gray-200;
    }
    100% {
        @apply bg-gray-300;
    }
}

.skeleton {
    &:empty {
        animation: skeletonLoading 0.4s linear infinite alternate;
    }

    &-text {
        @apply w-4/5;
        height: 60px;
        @apply bg-gray-200;
        @apply rounded-md;

        &-s {
            height: 35px;
        }
    }

    &-grid {
        width: 100%;
        height: 150px;
        @apply rounded-md;

        &-h {
            height: 170px;
        }
    }
}
</style>
