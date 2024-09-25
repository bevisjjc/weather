<script setup>
import TheHeader from '@/components/TheHeader.vue';
import SideForecast from '@/components/SideForecast.vue';
import WeekList from '@/components/WeekList.vue';
import skeletonList from '@/components/skeletonList.vue';
import skeletonSide from '@/components/skeletonSide.vue';
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

import { useWeatherStore } from '@/stores/weather';

const store = useWeatherStore();
const weatherFilter = store.weatherFilter;
const fetchLoading = ref(false);

const cityList = ref([]);
const selectedCity = ref('');
const dataList = ref([]);

const getWeather = async () => {
    try {
        fetchLoading.value = true;
        await store.fetchWeather();

        cityList.value = store.weatherData.map((data) => data.locationName);
        dataList.value = store.weatherData[0].weatherElement;

        //檢查是否有縣市參數，有的話就設定為該縣市，沒有的話就設定為第一筆資料
        selectedCity.value =
            route.query.city && cityList.value.includes(route.query.city)
                ? route.query.city
                : store.weatherData[0].locationName;
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            fetchLoading.value = false;
        }, 1000);
    }
};

getWeather();

// import { useGeolocation } from '@vueuse/core';
// const { coords, locatedAt, error, resume, pause } = useGeolocation();

const changeLocation = (emitData) => {
    selectedCity.value = emitData.target.value;
};

const showData = computed(() =>
    !fetchLoading.value && !!dataList.value.length ? true : false,
);

watch(
    () => selectedCity.value,
    (value) => {
        const selectedData = store.weatherData.find(
            (data) => data.locationName === value,
        );

        router.push({
            query: {
                city: selectedCity.value,
            },
        });

        fetchLoading.value = true;
        setTimeout(() => {
            dataList.value = selectedData.weatherElement;
            fetchLoading.value = false;
        }, 500);
    },
);
</script>
<template>
    <section
        class="xl:min-w-80 xl:w-1/5 p-5 lg:p-10 xl:sticky xl:top-0 bg-gray-50"
    >
        <template v-if="showData">
            <SideForecast
                :selectedCity="selectedCity"
                :cityList="cityList"
                :dataList="weatherFilter(dataList, 0)"
                @change="changeLocation"
            />
        </template>
        <template v-else>
            <div><skeletonSide /></div>
        </template>
    </section>
    <section class="xl:w-4/5 p-5 lg:p-10 bg-gray-100">
        <TheHeader />
        <template v-if="showData">
            <WeekList :dataList="weatherFilter(dataList, 7)" />
        </template>
        <template v-else>
            <div><skeletonList /></div>
        </template>
    </section>
</template>
<style lang="scss" scoped></style>
