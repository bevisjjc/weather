<script setup>
import BaseSelect from '@/components/UI/BaseSelect.vue';
import BaseSideForecast from '@/components/UI/BaseSideForecast.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    dataList: {
        type: Array,
        required: true,
    },
    cityList: {
        type: Array,
        required: true,
    },
    selectedCity: {
        type: String,
        required: true,
    },
});

import { useWeatherStore } from '@/stores/weather';
const { unitsTransform } = useWeatherStore();

//get current time
const currentTime = ref('');
const updateTime = () => {
    const daysOfWeek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
    const date = new Date();
    const day = daysOfWeek[new Date().getDay()].toUpperCase();
    const hours = date.getHours();
    const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    currentTime.value = `<span class="pr-4">${day}</span> ${hours}:${minutes}:${seconds}`;
};

setInterval(updateTime, 1000);

const PoP12h = computed(() => {
    return props.dataList.find((item) => item.elementName === 'PoP12h');
});

const T = computed(() => {
    return props.dataList.find((item) => item.elementName === 'T');
});

const RH = computed(() => {
    return props.dataList.find((item) => item.elementName === 'RH');
});

const Wx = computed(() => {
    return props.dataList.find((item) => item.elementName === 'Wx');
});

const WxIcon = computed(() => {
    const dayorNight =
        new Date().getHours() > 6 && new Date().getHours() < 18
            ? 'day'
            : 'night';
    let icon = '';
    switch (Wx.value.time.elementValue[0].value) {
        case '晴時多雲':
            icon = dayorNight == 'day' ? 'cloud-sun' : 'cloud-moon';
            break;
        case '多雲時晴':
            icon = dayorNight == 'day' ? 'cloud-sun' : 'cloud-moon';
            break;
        case '陰天':
            icon = 'clouds';
            break;
        case '多雲':
            icon = 'cloud';
            break;
        case '多雲時陰':
            icon = 'clouds';
            break;
        case '雨天':
            icon = 'rain';
            break;
        case '陰陣雨或雷雨':
            icon = 'thunderstorm';
            break;
        case '陰短暫陣雨或雷雨':
            icon = 'thunderstorm';
            break;
        case '陰時多雲陣雨或雷雨':
            icon = 'thunderstorm';
            break;
        case '多雲午後短暫雷陣雨':
            icon = dayorNight == 'day' ? 'cloud-sun-rain' : 'cloud-moon-rain';
            break;
        case '多雲短暫陣雨或雷雨':
            icon = dayorNight == 'day' ? 'cloud-sun-rain' : 'cloud-moon-rain';
            break;
        case '多雲時陰短暫陣雨或雷雨':
            icon = dayorNight == 'day' ? 'cloud-sun-rain' : 'cloud-moon-rain';
            break;
        default:
            icon = 'unknown';
            break;
    }
    return icon;
});

const MaxT = computed(() => {
    return props.dataList.find((item) => item.elementName === 'MaxT');
});

const MinT = computed(() => {
    return props.dataList.find((item) => item.elementName === 'MinT');
});

const UVI = computed(() => {
    return props.dataList.find((item) => item.elementName === 'UVI');
});

// const MinAT = computed(() => {
//     return props.dataList.find((item) => item.elementName === 'MinAT');
// });

// const MaxAT = computed(() => {
//     return props.dataList.find((item) => item.elementName === 'MaxAT');
// });

const emit = defineEmits(['changeLocation']);

const changeLocation = (emitData) => {
    emit('changeLocation', emitData);
};
</script>
<template>
    <div class="flex flex-row flex-wrap xl:flex-col h-full">
        <BaseSelect
            :cityList="props.cityList"
            :selectedCity="props.selectedCity"
            @changeLocation="changeLocation"
        />

        <div
            class="pt-4 pb-2 sm:pt-6 sm:pb-6 xl:pt-10 xl:pb-10 xl:border-solid xl:border-b-2 xl:border-gray-250 flex xl:block"
        >
            <unicon
                :name="WxIcon"
                fill="#222"
                class="w-20 h-20 sm:w-32 sm:h-32 xl:w-48 xl:h-48 2xl:w-60 2xl:h-60"
            ></unicon>

            <div class="ml-6 sm:ml-8 xl:ml-0">
                <p
                    class="text-4xl sm:text-5xl font-bold text-gray-900 pt-2 xl:pt-6 pb-2"
                >
                    {{ T.time.elementValue[0].value }}
                    <unicon
                        name="celsius"
                        fill="#222"
                        class="w-5 h-5 sm:w-10 sm:h-10"
                    ></unicon>
                </p>
                <p class="text-xl sm:text-2xl font-bold text-gray-900 py-1">
                    {{ Wx.time.elementValue[0].value }}
                </p>
                <p class="text-xl sm:text-2xl font-bold text-gray-900 py-1">
                    <span class="text-xl" v-html="currentTime"></span>
                </p>
            </div>
        </div>

        <div
            class="w-full sm:w-auto flex flex-wrap sm:block sm:ml-10 xl:ml-0 pt-2 pb-2 sm:pt-6 sm:pb-6 xl:pt-10 xl:pb-10"
        >
            <BaseSideForecast
                icon="umbrella"
                fillColor="#222"
                :unit="unitsTransform(PoP12h.time.elementValue[0].measures)"
                :data="PoP12h.time.elementValue[0].value"
            />
            <BaseSideForecast
                icon="temperature"
                fillColor="#222"
                :unit="unitsTransform(MinT.time.elementValue[0].measures)"
                :data="MinT.time.elementValue[0].value"
                :data2="MaxT.time.elementValue[0].value"
            />
            <BaseSideForecast
                icon="water"
                fillColor="#222"
                :unit="unitsTransform(RH.time.elementValue[0].measures)"
                :data="RH.time.elementValue[0].value"
            />
            <BaseSideForecast
                icon="sun"
                fillColor="#222"
                :unit="unitsTransform(UVI.time.elementValue[1].value)"
                :data="UVI.time.elementValue[0].value"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
