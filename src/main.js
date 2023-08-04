import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apiService from '@/services/apiService'; // Import your axios instance

const app = createApp(App);
app.config.globalProperties.$apiService = apiService;


app
    .use(store)
    .use(router)
    .mount('#app');
