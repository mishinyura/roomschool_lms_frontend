<template>
  <aside class="main__aside sidebar">
    <div class="sidebar__control">
      <button class="sidebar__btn" @click="$emit('toggleSidebar')"></button>

      <TheSelect
        v-if="roles.length"
        v-model:activeAccount="activeAccount"
        :options="roles"
      />
    </div>
    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li v-for="link in links" :key="link.name" class="sidebar__item">
          <RouterLink
            :class="[
              'sidebar__link',
              link.class,
              { sidebar__link_active: $route.name === link.name },
            ]"
            :to="{ name: link.name }"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="sidebar__logo"></div>
  </aside>
</template>

<script>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheSelect from "@/components/ui/TheSelect.vue";
import { useRoleStore } from "@/stores/roleStore";

export default {
  name: "SideBar",
  components: {
    TheSelect,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const roleStore = useRoleStore();

    const roles = computed(() =>
      roleStore.state.availableRoles.map((roleName) => ({
        name: roleName,
        display: roleStore.getDisplayNameForRole(roleName),
      }))
    );

    const links = computed(() => {
      const roleName = roleStore.state.activeRole;
      return roleName ? roleStore.getNavigationForRole(roleName) : [];
    });

    const activeAccount = computed({
      get: () => roleStore.state.activeRole,
      set: (roleName) => roleStore.setActiveRole(roleName),
    });

    const ensureRouteAllowed = (roleName) => {
      if (!roleName || !route.name) {
        return;
      }

      if (roleStore.isRouteAllowed(route.name, roleName)) {
        return;
      }

      const fallback = roleStore.getDefaultRoute(roleName);

      if (fallback && fallback !== route.name) {
        router.replace({ name: fallback });
      }
    };

    watch(
      () => roleStore.state.activeRole,
      (roleName) => {
        ensureRouteAllowed(roleName);
      },
      { immediate: true }
    );

    watch(
      () => route.name,
      () => {
        ensureRouteAllowed(roleStore.state.activeRole);
      }
    );

    return {
      roles,
      links,
      activeAccount,
    };
  },
};
</script>


<style>
/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-classic);
  background-color: var(--color-bg-white);
}

.sidebar__control {
  display: flex;
  flex-direction: column;

  padding: 1em;
  border-bottom: var(--border-blue);
}
.main_collapsed .sidebar__control {
  /* gap: 8px; */
  /* justify-content: center; */
  align-items: center;
  padding: 1em 0.3em;
}
.sidebar__logo {
  width: 100%;
  height: 40px;
}
.sidebar__logo::before {
  display: block;
  content: "";
  mask: url("@/assets/media/icons/logo.svg") no-repeat center/contain;
  width: 100%;
  height: 100%;
  background-color: var(--color-icon-blue);
}

.sidebar__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
  border-radius: var(--radius-lg);
  transition: background-color 0.1s;
}

.sidebar__btn::before {
  width: 70%;
  height: 70%;
  background-color: #000000;
  mask: url("@/assets/media/icons/pin.svg") no-repeat center/contain;
  content: "";
  transition: background-color 0.1s;
}

.sidebar__btn:hover {
  background-color: var(--color-action-blue);
}

.sidebar__btn:hover::before {
  background-color: var(--color-action-white);
}

/* Nav */
.sidebar__nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  overflow: hidden;
}

.sidebar__menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__item {
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.sidebar__link {
  display: flex;
  flex-grow: 1;
  gap: 15px;
  padding: 0.5em 1.1em;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 400;
  transition: background-color 0.1s, color 0.1s, width 0.1s, padding 0.1s;
  cursor: var(--cursor-point);
}
.sidebar__link::before {
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  background-color: #262626;
  content: "";
  transition: background-color 0.1s;
}

.sidebar__link_study::before {
  mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
}

.sidebar__link_webinars::before {
  mask: url("@/assets/media/icons/schedule.svg") no-repeat center/contain;
}
.sidebar__link_analitics::before {
  mask: url("@/assets/media/icons/analitics.svg") no-repeat center/contain;
}
.sidebar__link_tasks::before {
  mask: url("@/assets/media/icons/tests.svg") no-repeat center/contain;
}
.sidebar__link_checks::before {
  mask: url("@/assets/media/icons/tests.svg") no-repeat center/contain;
}
.sidebar__link_messages::before {
  mask: url("@/assets/media/icons/messenger.svg") no-repeat center/contain;
}

.sidebar__link_profile::before {
  mask: url("@/assets/media/icons/profile.svg") no-repeat center/contain;
}
.sidebar__link_active {
  background-color: var(--color-action-blue);
  color: var(--color-action-white);
}
.sidebar__link_active::before {
  background-color: var(--color-action-white);
}
.sidebar__link:not(.sidebar__link_active):hover {
  background-color: var(--color-action-light-blue);
}
</style>