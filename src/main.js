/** style **/
import '@fontsource-variable/noto-sans-tc';
import './assets/css/style.css';

/** vue **/
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

/** vue-unicons **/
import Unicon from 'vue-unicons'
import { uniSetting, uniMoon, uniDraggabledots, uniMapMarker, uniUmbrella, uniCelsius, uniTear, uniTemperature, uniWater, uniSun, uniCloud, uniClouds, uniCloudSun, uniCloudMoon, uniCloudRain, uniCloudSunRain, uniCloudMoonRain, uniCloudRainSun, uniThunderstorm } from 'vue-unicons/dist/icons'

Unicon.add([uniSetting, uniMoon, uniDraggabledots, uniMapMarker, uniUmbrella, uniCelsius, uniTear, uniTemperature, uniWater, uniSun, uniCloud, uniClouds, uniCloudSun, uniCloudMoon, uniCloudRain, uniCloudSunRain, uniCloudMoonRain, uniCloudRainSun, uniThunderstorm])
app.use(Unicon);

/** pinia **/
import { createPinia } from 'pinia'
app.use(createPinia());

/** router **/
import router from './router/index.js';
app.use(router);

app.mount('#app');

/** test **/