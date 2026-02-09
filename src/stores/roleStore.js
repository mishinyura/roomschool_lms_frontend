import {
  getDefaultRouteForRole,
  getDisplayNameForRole,
  getNavigationForRole,
  ROLE_DEFINITIONS,
  ROUTE_ACCESS_MAP
} from '@/configs/roles.js';
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('roles', {
  state: () => ({
    activeRoles: [],
  }),

  getters: {
    myRolesList: (state) => {
      console.log('activeRoles', state.activeRoles)
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
        // Если передали имя роута (новый вариант, используя map)
        const allowedRoles = ROUTE_ACCESS_MAP[routeRolesOrName];
        if (!allowedRoles) return true; // Если роута нет в карте, считаем его публичным? Или наоборот закрытым.
        return state.activeRoles.some(r => allowedRoles.includes(r));
    }
  },

  actions: {
    assignRoles(rolesArray) {
      if (!Array.isArray(rolesArray)) return;
      if (rolesArray.length === 0) {
        this.activeRoles = [];
        return;
      }
      for (const role of rolesArray) {
        if (ROLE_DEFINITIONS[role]) {
          this.activeRoles.push(role);
        }
      }
    }
  }
});