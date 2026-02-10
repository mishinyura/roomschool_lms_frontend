import { useAuthStore } from '@/stores/authStore';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import '@/assets/styles/main.css';
import '@/assets/styles/normalize.css';
import "@/assets/styles/reset.scss";
// import '@/assets/styles/reset.css';
// import '@/assets/styles/variables.css';



const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
const tokenFromStorage = localStorage.getItem('access_token');

if (tokenFromStorage) {
  authStore.processToken(tokenFromStorage);
}

app.mount('#app');