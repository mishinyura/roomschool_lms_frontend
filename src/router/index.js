
import { useAuthStore } from "../stores/authStore.js";

import router from "./routes";

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // const roleStore = useRoleStore();
  // const allowedRoles = to.meta?.roles;

  if (to.path.startsWith('/auth')) {
    return next();
  }

  console.log('allowedRoles', authStore.accessToken);

  if (!authStore.accessToken) {
    return next({ name: "auth" });
  }


  

  // if (!allowedRoles || allowedRoles.length === 0) {
  //   return next();
  // }

  // const activeRole = roleStore.state.activeRole;

  // if (activeRole && allowedRoles.includes(activeRole)) {
  //   return next();
  // }

  // if (!activeRole) {
  //   const fallback = roleStore.getDefaultRoute();

  //   if (fallback && fallback !== to.name) {
  //     return next({ name: fallback });
  //   }

  //   return next(false);
  // }

  // const fallback = roleStore.getDefaultRoute(activeRole);

  // if (fallback && fallback !== to.name) {
  //   return next({ name: fallback });
  // }

  // return next(false);

  // return next(true);
});

export default router;