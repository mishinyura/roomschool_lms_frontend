import { authApi } from '@/api/authApi.js';
import { useRoleStore } from '@/stores/roleStore.js';
import { print } from "@/utils/globalUtils";
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    processToken(token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          throw new Error('Token expired');
        }

        this.accessToken = token;
        localStorage.setItem('access_token', token);
        const roleStore = useRoleStore();
        const roles = decoded.roles || []; 
        roleStore.assignRoles(roles);
        
        this.user = {
            username: decoded.sub || decoded.username,
        };

        return true;
      } catch (error) {
        console.error('Ошибка парсинга токена:', error);
        this.logout(); // Если токен битый — выкидываем юзера
        return false;
      }
    },
    async checkAuth() {
      try {
        const response = await authApi.check();
        this.user = response.data;
        this.isAuthenticated = true;

        const roleStore = useRoleStore();
        roleStore.assignRoles(response.data.roles);
      } catch (e) {
        // this.logout();
        print('useAuthStore', e)
      }
    },
    async login(credentials) {
      const roleStore = useRoleStore();
      const response = await authApi.login(credentials);
      const token = response.access_token;
      
      if (!token) {
        console.error("Токен не пришел с бэкенда!", response);
        throw new Error("Ошибка входа: нет токена");
      }

      this.accessToken = token;
      const decoded = jwtDecode(token);
      localStorage.setItem('access_token', token);

      if (response.user) {
        this.user = response.user;
      }

      if (decoded.roles) {
         roleStore.assignRoles(decoded.roles);
      } else {
         roleStore.assignRoles([]);
      }
    },
    async refreshToken() {
      const response = await authApi.refreshToken();
      this.user = response.data;
      this.isAuthenticated = true;
    },
    async logout() {
      this.accessToken = null;
       this.user = null;
       useRoleStore().assignRoles([]);
       authApi.logout().catch(() => {});
    }
  }
});