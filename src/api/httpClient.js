import router from '@/router'; // Нужен для редиректа при полном вылете
import { useAuthStore } from '@/stores/authStore.js';
import axios from 'axios';

// 1. Создаем инстанс
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://api.roomschool.ru', // Лучше брать из .env
  withCredentials: true, // ВАЖНО: разрешает куки (для Refresh Token)
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Request Interceptor (Вставка токена)
// Его задача только одна: если есть ключик - вставь в замок.
apiClient.interceptors.request.use(config => {
  // ВАЖНО: вызываем стор ВНУТРИ интерцептора, чтобы не было ошибки инициализации Pinia
  const authStore = useAuthStore();

  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  
  // УБРАЛИ else { checkAuth() } - это была ошибка!
  // Если токена нет, мы просто шлем запрос анонимно. 
  // Если бэкенду это не понравится, он вернет 401, и мы разберемся в response interceptor.
  
  return config;
}, error => {
  return Promise.reject(error);
});



// 1. Вставка токена (если есть)
apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
}, error => Promise.reject(error));

// 2. Обработка ошибок (Refresh Token)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshUrl = (process.env.VUE_APP_API_URL || 'http://api.roomschool.ru') + '/auth/refresh';
        
        // --- ИСПРАВЛЕНИЕ: БЫЛО POST, СТАЛО GET ---
        const { data } = await axios.get(
            refreshUrl, 
            { withCredentials: true } 
        );

        const newAccessToken = data.accessToken || data.access_token;
        
        const authStore = useAuthStore();
        authStore.accessToken = newAccessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error('Сессия истекла:', refreshError);
        const authStore = useAuthStore();
        authStore.logout();
        router.push({ name: 'auth' }); // Редирект на логин
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;