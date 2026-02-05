import { defineStore } from 'pinia';
// Импортируем твои функции и константы
import {
  getDefaultRouteForRole,
  getDisplayNameForRole,
  getNavigationForRole,
  ROUTE_ACCESS_MAP
} from '@/configs/roles.js'; // <-- Проверь путь к файлу

export const useRoleStore = defineStore('roles', {
  state: () => ({
    activeRoles: [],
  }),

  getters: {
    // 1. Список доступных ролей для переключателя (Select)
    // Возвращает массив объектов { name: 'student', display: 'Ученик' }
    myRolesList: (state) => {
      return state.activeRoles.map(role => ({
        name: role,
        display: getDisplayNameForRole(role)
      }));
    },

    // 2. Получить меню для конкретной роли
    // Мы просто проксируем вызов к твоей функции getNavigationForRole
    getRoleMenu: () => (roleName) => {
      return getNavigationForRole(roleName);
    },

    // 3. Получить дефолтный роут (куда кидать при смене роли)
    getRoleDefaultRoute: () => (roleName) => {
      return getDefaultRouteForRole(roleName);
    },
    
    // 4. Проверка доступа (используем твой ROUTE_ACCESS_MAP)
    hasAccess: (state) => (routeRolesOrName) => {
        // Если передали массив ролей (старый вариант)
        if (Array.isArray(routeRolesOrName)) {
             if (routeRolesOrName.length === 0) return true;
             return state.activeRoles.some(r => routeRolesOrName.includes(r));
        }
        // Если передали имя роута (новый вариант, используя твою map)
        const allowedRoles = ROUTE_ACCESS_MAP[routeRolesOrName];
        if (!allowedRoles) return true; // Если роута нет в карте, считаем его публичным? Или наоборот закрытым.
        return state.activeRoles.some(r => allowedRoles.includes(r));
    }
  },

  actions: {
    assignRoles(rolesArray) {
      // Защита от дурака: если пришло null, делаем пустой массив
      this.activeRoles = Array.isArray(rolesArray) ? rolesArray : [];
    }
  }
});