import { useAuthStore } from "@/stores/authStore";
import { useRoleStore } from "@/stores/roleStore";

import { print } from "@/utils/globalUtils";
import router from "./routes";

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const roleStore = useRoleStore();
  print('beforeEach', 'TO:\n', to, '\nFROM:\n', from);

  if (!authStore.isAuthenticated && !to.path.startsWith('/auth')) {
    await authStore.checkAuth(); 
  }

  const isAuth = authStore.isAuthenticated;

  if (to.path.startsWith('/auth')) {
    return isAuth ? next('/') : next();
  }

  if (!isAuth) {
    return next({ name: "auth" });
  }

  const requiredRoles = to.meta.roles;
  
  if (requiredRoles && !roleStore.hasAccess(requiredRoles)) {
     return next({ name: 'forbidden' });
  }

  next();
});

export default router;