<script setup>
import { ref, computed } from 'vue';
const currentTime = new Date().getHours();
const props = defineProps({
    data: Array,
    latitude: String,
    longitude: String,
    selectedCity: String,
});

// console.log('props', props);

const weatherElement = props.data;

// const weatherOverview = computed(() => {
//     const overView = weatherElement.find(
//         (element) => element.elementName === 'Wx',
//     );

//     const time = overView.time.map((time) => {
//         return {
//             startTime: new Date(time.startTime).getHours(),
//             endTime: new Date(time.endTime).getHours(),
//         };
//     });

//     return time;
// });
</script>
<template>
    <div>
        <!-- {{ locationName + ' 當前天氣' }}

        {{ weatherOverview }} -->

        <!-- <ul>
            <li v-for="weather in data.weatherElement">
                <template v-for="(value, index) in weather.time" :key="index">
                    <span
                        v-if="
                            currentTime >=
                                new Date(value.startTime).getHours() &&
                            currentTime <= new Date(value.endTime).getHours()
                        "
                    >
                        {{
                            weather.elementName === 'Wx'
                                ? '天氣狀況'
                                : weather.elementName === 'PoP'
                                ? '降雨機率'
                                : weather.elementName === 'MinT'
                                ? '最低溫度'
                                : weather.elementName === 'CI'
                                ? '舒適度'
                                : weather.elementName === 'MaxT'
                                ? '最高溫度'
                                : ''
                        }}
                        {{ value.parameter.parameterName }}
                    </span>
                </template>
            </li>
        </ul> -->
    </div>
</template>
