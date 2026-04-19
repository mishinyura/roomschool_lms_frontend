// Базовый axios-клиент с настройками перехватчиклв
import axios from 'axios';

import { API_URL } from '@/configs/api.endpoints';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore.js';


const apiClient = axios.create({
  baseURL: API_URL || 'https://api.roomschool.ru',
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "X-Client-App": "roomschool-web"
  }
});


apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
}, error => Promise.reject(error));



apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshUrl = (process.env.VUE_APP_API_URL || 'http://api.roomschool.ru') + '/auth/refresh';
        
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
        router.push({ name: 'auth' });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;