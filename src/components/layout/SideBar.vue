<template>
  <aside class="main__aside sidebar">
    <div class="sidebar__control">
      <button class="sidebar__btn" @click="$emit('toggleSidebar')"></button>

      <template v-if="availableRolesOptions.length > 1">
        <TheSelect
          key="role-select"
          v-model:activeAccount="currentRole"
          :options="availableRolesOptions"
        />
      </template>
      
      <div 
        v-else-if="currentRole" 
        key="role-single" 
        class="sidebar__single-role"
      >
         {{ getRoleDisplayName(currentRole) }}
      </div>
    </div>

    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li v-for="link in currentLinks" :key="link.name" class="sidebar__item">
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

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoleStore } from "@/stores/roleStore";
import TheSelect from "@/components/ui/TheSelect.vue";

const router = useRouter();
const roleStore = useRoleStore();

const currentRole = ref(null); //Текущая выбранная роль
const availableRolesOptions = computed(() => roleStore.myRolesList); //Список достных ролей
const currentLinks = computed(() => {
  if (!currentRole.value) return [];
  return roleStore.getRoleMenu(currentRole.value);
}); //Список доступных вкладок в меню

watch(() => roleStore.activeRoles, (newRoles) => {
  if (newRoles.length > 0) {
      if (!currentRole.value || !newRoles.includes(currentRole.value)) {
          currentRole.value = newRoles[0];
      }
  }
}, { immediate: true });

watch(currentRole, (newRole, oldRole) => {
  if (newRole && oldRole && newRole !== oldRole) {
    const defaultRoute = roleStore.getRoleDefaultRoute(newRole);
    
    if (defaultRoute) {
      router.push({ name: defaultRoute });
    } else {
        const links = roleStore.getRoleMenu(newRole);
        if (links.length > 0) router.push({ name: links[0].name });
    }
  }
});
</script>


<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: $shadow-classic;
  background-color: $color-bg-white;

  &__control {
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-bottom: $border-blue;

    .main_collapsed & {
      align-items: center;
      padding: 1em 0.3em;
    }
  }

  &__logo {
    width: 100%;
    height: 40px;

    &::before {
      display: block;
      content: "";
      mask: url("@/assets/media/icons/logo.svg") no-repeat center/contain;
      width: 100%;
      height: 100%;
      background-color: $color-icon-blue;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    margin-bottom: 10px;
    border-radius: $radius-lg;
    transition: background-color 0.1s;

    &::before {
      width: 70%;
      height: 70%;
      background-color: #000000;
      mask: url("@/assets/media/icons/pin.svg") no-repeat center/contain;
      content: "";
      transition: background-color 0.1s;
    }

    &:hover {
      background-color: $color-action-blue;

      &::before {
        background-color: $color-action-white;
      }
    }
  }

  &__nav {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    overflow: hidden;
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
  }

  &__link {
    display: flex;
    flex-grow: 1;
    gap: 15px;
    padding: 0.5em 1.1em;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 400;
    transition: background-color 0.1s, color 0.1s, width 0.1s, padding 0.1s;
    cursor: $cursor-point;

    &::before {
      flex-shrink: 0;
      width: 15px;
      height: 15px;
      background-color: #262626;
      content: "";
      transition: background-color 0.1s;
    }

    &_study::before {
      mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
    }

    &_webinars::before {
      mask: url("@/assets/media/icons/schedule.svg") no-repeat center/contain;
    }

    &_analitics::before {
      mask: url("@/assets/media/icons/analitics.svg") no-repeat center/contain;
    }

    &_tasks::before,
    &_checks::before {
      mask: url("@/assets/media/icons/tests.svg") no-repeat center/contain;
    }

    &_messages::before {
      mask: url("@/assets/media/icons/messenger.svg") no-repeat center/contain;
    }

    &_profile::before {
      mask: url("@/assets/media/icons/profile.svg") no-repeat center/contain;
    }

    &_active {
      background-color: $color-action-blue;
      color: $color-action-white;

      &::before {
        background-color: $color-action-white;
      }
    }

    &:not(&_active):hover {
      background-color: $color-action-light-blue;
    }
  }
}
</style>