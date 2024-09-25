//載入define store
import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useWeatherStore = defineStore('weather', () => {
    const k = 'CWA-B65C5BEF-1C99-45AF-B409-7583A392C541';
    const fetchUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${k}`;

    const weatherData = ref(null);
    const error = ref(null);

    const fetchWeather = async () => {
        const response = await fetch(fetchUrl);

        if (response.ok) {
            const result = await response.json();
            weatherData.value = result.records.locations[0].location;
        } else {
            error.value = new Error(response.error.message || 'Failed to fetch weather data');
            throw error;
        }
    }

    const weatherFilter = (array = [], filter = 0) => {
        /** 
         *  filter parameter is a number from 0 to 8
         * 0: current day
         * 1: today
         * 2: tomorrow
         * 3: the day after tomorrow
         * ...
         **/

        if (!array.length || !weatherData.value || isNaN(filter) || filter > 8) return [];

        let filterArray = [];
        if (filter === 0) {
            filterArray = array.map((item) => {
                return {
                    elementName: item.elementName,
                    description: item.description,
                    time: item.time[0] //index 0 is current in the array 
                };
            });
        } else {
            const filterNum = filter - 1;
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + filterNum);

            filterArray = array.map((item) => {
                return {
                    elementName: item.elementName,
                    description: item.description,
                    time: item.time.filter((time) => {
                        return (
                            new Date(time.startTime).getTime() <= targetDate.getTime() // get from today to specific date
                        );
                    }),
                };
            });
        }

        return filterArray;
    }

    const unitsTransform = (unit) => {
        if (!unit) return '';
        let transformed = '';

        switch (unit) {
            case '百分比':
                transformed = '%';
                break;
            case '攝氏度':
                transformed = '°C';
                break;
            case '公尺/秒':
                transformed = 'm/s';
                break;
            default:
                transformed = unit;
        }

        return transformed;
    };

    return {
        weatherData,
        fetchWeather,
        weatherFilter,
        unitsTransform
    }
});