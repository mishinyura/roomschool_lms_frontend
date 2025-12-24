// import { reactive } from "vue";
// import {
//   ROLE_DEFINITIONS,
//   ROUTE_ACCESS_MAP,
//   getDefaultRouteForRole,
//   getDisplayNameForRole,
//   getNavigationForRole,
// } from "../configs/roles";

// const state = reactive({
//   availableRoles: [],
//   activeRole: null,
// });

// const normalizeRoles = (roleNames = []) => {
//   const seen = new Set();

//   return roleNames.filter((roleName) => {
//     if (!ROLE_DEFINITIONS[roleName]) {
//       return false;
//     }

//     if (seen.has(roleName)) {
//       return false;
//     }

//     seen.add(roleName);
//     return true;
//   });
// };

// function assignRoles(roleNames = []) {
//   const normalized = normalizeRoles(roleNames);

//   state.availableRoles.splice(0, state.availableRoles.length, ...normalized);

//   if (!normalized.length) {
//     state.activeRole = null;
//     return;
//   }

//   if (!normalized.includes(state.activeRole)) {
//     state.activeRole = normalized[0];
//   }
// }

// function setActiveRole(roleName) {
//   if (state.availableRoles.includes(roleName) && state.activeRole !== roleName) {
//     state.activeRole = roleName;
//   }
// }

// function getActiveRole() {
//   return state.activeRole;
// }

// function getDefaultRoute(roleName = state.activeRole) {
//   return getDefaultRouteForRole(roleName);
// }

// function isRouteAllowed(routeName, roleName = state.activeRole) {
//   if (!routeName || !roleName) {
//     return false;
//   }

//   const allowedRolesForRoute = ROUTE_ACCESS_MAP[routeName];

//   return allowedRolesForRoute ? allowedRolesForRoute.includes(roleName) : false;
// }

// export function useRoleStore() {
//   return {
//     state,
//     assignRoles,
//     setActiveRole,
//     getActiveRole,
//     getDefaultRoute,
//     isRouteAllowed,
//     getDisplayNameForRole,
//     getNavigationForRole,
//   };
// }


import { defineStore } from 'pinia';

export const useRoleStore = defineStore('roles', {
  state: () => ({
    activeRoles: [],
  }),
  
  getters: {
    // Хелпер: проверка на админа
    isAdmin: (state) => state.activeRoles.includes('admin'),
    
    // Хелпер: проверка прав
    hasRole: (state) => (roleName) => state.activeRoles.includes(roleName),
  },

  actions: {
    assignRoles(rolesArray) {
      // Записываем массив, который пришел из authStore
      this.activeRoles = rolesArray;
      console.log('Роли обновлены:', this.activeRoles);
    }
  }
});