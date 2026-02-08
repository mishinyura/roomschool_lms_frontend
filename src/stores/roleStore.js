import {
  getDefaultRouteForRole,
  getDisplayNameForRole,
  getNavigationForRole,
  ROUTE_ACCESS_MAP
} from '@/configs/roles.js';
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('roles', {
  state: () => ({
    activeRoles: [],
  }),

  getters: {
    myRolesList: (state) => {
      return state.activeRoles.map(role => ({
        name: role,
        display: getDisplayNameForRole(role)
      }));
    },

    getRoleMenu: () => (roleName) => {
      return getNavigationForRole(roleName);
    },

    getRoleDefaultRoute: () => (roleName) => {
      return getDefaultRouteForRole(roleName);
    },
    
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
      this.activeRoles = Array.isArray(rolesArray) ? rolesArray : [];
    }
  }
});