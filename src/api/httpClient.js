import { API_ENDPOINTS } from "@/configs/api.config.js";
import { Config } from '@/configs/base.js';
import { useAuthStore } from '@/stores/authStore.js';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'x-api-key': Config.API_KEY
  },
  withCredentials: true,
  // validateStatus: status => status < 500
})

apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore();

  console.log(authStore)
  
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  } else {
    authStore.checkAuth()
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + API_ENDPOINTS.AUTH,
            {}, // Тело запроса (обычно пустое, если refresh token в куках)
            { withCredentials: true }
        );

        const newAccessToken = response.data.access_token;

        // 1. Сохраняем новый токен в Store
        const authStore = useAuthStore();
        authStore.setToken(newAccessToken);

        // 2. Меняем заголовок в старом (упавшем) запросе
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 3. Повторяем старый запрос с новым токеном
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Если даже обновить токен не вышло (например, refresh token протух)
        console.error('Refresh token failed', refreshError);
        const authStore = useAuthStore();
        authStore.logout(); // Полный выход
        return Promise.reject(refreshError);
      }
    }

    // Если ошибка не 401 или уже пробовали — просто выкидываем её дальше
    return Promise.reject(error);
  }
);

export default apiClient;