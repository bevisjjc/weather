<script setup>
import { computed } from 'vue';
const props = defineProps({
    dataList: {
        type: Array,
        required: true,
    },
});

import { useWeatherStore } from '@/stores/weather';
const { unitsTransform } = useWeatherStore();

//get current time array in props.dataList
const currentTimeArray = computed(() => {
    let timeKey = [];
    if (!props.dataList[0].time.length) {
        const timeKeyTemp = Object.entries(props.dataList[0].time).filter(
            (item, index) => {
                if (index < 2) {
                    //avoid to get elementValue
                    return {
                        startTime: index === 0 ? item[1] : null,
                        endTime: index === 1 ? item[1] : null,
                    };
                }
            },
        );

        timeKey = [Object.fromEntries(timeKeyTemp)];
    } else {
        timeKey = Object.values(props.dataList[0].time).map((item) => {
            return {
                startTime: item.startTime,
                endTime: item.endTime,
            };
        });
    }

    return timeKey;
});

//get weatherDescription from props.dataList
const weatherDescriptionList = computed(() => {
    let weather = props.dataList.find(
        (item) => item.elementName === 'WeatherDescription',
    );

    weather = Array.isArray(weather) ? weather : [weather];

    weather.forEach((item) => {
        item.time = Array.isArray(item.time) ? item.time : [item.time];
    });

    return weather;
});

//filterout weatherDescription from props.dataList
const dataList = computed(() => {
    const data = props.dataList.filter(
        (item) => item.elementName !== 'WeatherDescription',
    );

    data.forEach((item) => {
        item.time = Array.isArray(item.time) ? item.time : [item.time];
    });

    return data;
});

console.log('props.dataList', props.dataList);
</script>
<template>
    <div
        v-for="(currentTime, index) in currentTimeArray"
        :key="index"
        class="pb-4"
    >
        <h3 class="text-gray-900 text-3xl font-bold">
            {{ weatherDescriptionList[0].description }}
        </h3>
        <div class="py-2">
            <p class="text-gray-900 text-2xl font-bold mb-2">
                {{
                    `${new Date(currentTime.startTime).getMonth() + 1} / ${new Date(
                        currentTime.startTime,
                    ).getDate()}
                ${currentTime.startTime.slice(11, 16)} -
                ${currentTime.endTime.slice(11, 16)}`
                }}
            </p>
            <p
                class="w-3/5 text-gray-800 text-xl font-bold mb-4"
                v-for="(weatherTime, index) in weatherDescriptionList[0].time"
                :key="index"
            >
                <template
                    v-if="weatherTime.startTime === currentTime.startTime"
                >
                    {{ weatherTime.elementValue[0].value }}
                </template>
            </p>
        </div>
        <div class="grid grid-cols-4 gap-8 pt-6 pb-12">
            <template v-for="data in dataList" :key="data.elementName">
                <template v-if="!!data.time.length">
                    <div class="bg-white py-8 px-6 rounded-xl shadow-md">
                        <p class="text-gray-900 text-xl font-bold mb-4">
                            {{ data.description }}
                        </p>
                        <p
                            class="flex items-center text-gray-800 text-xl font-medium"
                            v-for="time in data.time"
                            :key="time.startTime"
                        >
                            <template
                                v-if="time.startTime === currentTime.startTime"
                            >
                                {{ time.elementValue[0].value }}
                                <span class="text-lg ml-0.5">
                                    <template
                                        v-if="
                                            data.elementName === 'MinCI' ||
                                            data.elementName === 'MaxCI' ||
                                            data.elementName === 'UVI'
                                        "
                                    >
                                        {{
                                            unitsTransform(
                                                time.elementValue[1].value,
                                            )
                                        }}
                                    </template>
                                    <template
                                        v-else-if="data.elementName === 'Wx'"
                                    >
                                        {{ unitsTransform('') }}
                                    </template>
                                    <template v-else>
                                        {{
                                            unitsTransform(
                                                time.elementValue[0].measures,
                                            )
                                        }}
                                    </template>
                                </span>
                            </template>
                        </p>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
