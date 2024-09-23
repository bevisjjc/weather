<script setup></script>
<template>
    <div class="my-2.5 skeleton skeleton-text"></div>
    <div class="my-2.5 skeleton skeleton-text skeleton-text-s"></div>
    <div class="my-2.5 skeleton skeleton-text"></div>
    <div class="grid grid-cols-4 gap-8 pt-6 pb-12">
        <div
            class="bg-white py-8 px-6 rounded-xl shadow-md skeleton skeleton-grid"
            v-for="item in 10"
            :key="item"
        ></div>
    </div>
</template>
