<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    cityList: Array,
    selectedCity: String,
});

console.log('route', route.query.city);

const emit = defineEmits(['changeLocation']);

const changeLocation = (event) => {
    emit('changeLocation', event.target.value);
};
</script>

<template>
    <div class="selectBox flex items-center w-full xl:max-w-96 min-w-24">
        <unicon
            name="map-marker"
            fill="#222"
            class="bg-zinc-200 rounded-full mt-1 p-2 w-10 h-10"
        ></unicon>
        <select
            :value="props.selectedCity"
            @change="changeLocation"
            class="w-full block bg-zinc-50 text-gray-900 text-lg font-bold appearance-none outline-0 border-solid border-b-2 border-gray-250 cursor-pointer p-2.5 ml-2"
        >
            <template v-for="city in props.cityList" :key="city">
                <option :value="city" :selected="city === route.query.city">
                    {{ city }}
                </option>
            </template>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.selectBox {
    position: relative;

    &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-right: 2px solid #1a1a1a;
        border-bottom: 2px solid #1a1a1a;
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%) rotate(45deg);
    }
}
</style>
