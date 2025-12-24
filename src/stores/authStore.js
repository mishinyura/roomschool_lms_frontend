import { authApi } from '@/api/authApi.js';
import { useRoleStore } from '@/stores/roleStore.js';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage;
const writeToStorage = (key, value) => {
  if (!canUseStorage()) return;
  value ? window.localStorage.setItem(key, value) : window.localStorage.removeItem(key);
};
const readFromStorage = (key) => canUseStorage() ? window.localStorage.getItem(key) : null;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: readFromStorage('access_token'),
    refreshToken: null,
    roles: [],
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async checkAuth() {
      const token = readFromStorage('access_token');
      console.log('CHECK', token)

      if (!token) {
        return await this.refreshAccessToken();
      }

      try {
        const { exp } = jwtDecode(token);
        const now = Date.now() / 1000;

        if (exp && exp < now) {
          console.log('Access token протух, пробуем обновить...');
          return await this.refreshAccessToken();
        }

        this.accessToken = token;
        this.decodeAndSetUser(token)
        return true;

      } catch (e) {
        console.error('Ошибка чтения токена', e);
        return await this.refreshAccessToken();
      }
    },

    async refreshAccessToken() {
      try {
        const response = await authApi.refreshToken();
        this.setToken(response.access_token);
        return true;
      } catch (error) {
        return false;
      }
    },
    async login(credentials) {
      try {
        const response = await authApi.login(credentials);

        this.setToken(response.access_token);
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    setToken(token) {
      this.accessToken = token;
      writeToStorage('access_token', token);
      if (token) {
        this.decodeAndSetUser(token)
      }
    },

    decodeAndSetUser(token) {
      try {
        const decoded = jwtDecode(token);
        this.user = decoded;
        console.log('decoded', decoded);

        const roleStore = useRoleStore();
        if (decoded.roles) {
          roleStore.assignRoles(decoded.roles);
        }
      } catch (e) {
        console.error('Token decode error', e);
        this.logout();
      }
    },

    logout() {
      this.accessToken = null;
      this.user = null;
      writeToStorage('access_token', null);
      const roleStore = useRoleStore();
      roleStore.assignRoles([]);

      // TODO: отправить запрос на бэк
      // authApi.logout().catch(() => {}); 
    }
  }
});