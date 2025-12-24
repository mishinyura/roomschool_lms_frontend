import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/main.css';
import '@/assets/styles/normalize.css';
import '@/assets/styles/reset.css';
import '@/assets/styles/variables.css';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');