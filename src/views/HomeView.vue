<template>
  <main :class="['main', { main_collapsed: sidebarStatusCollapsed }]">
    <SideBar @toggle-sidebar="toggleSidebar" />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </RouterView>
  </main>
</template>

<script>
import SideBar from "@/components/layout/SideBar.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      sidebarStatusCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarStatusCollapsed = !this.sidebarStatusCollapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 17em 1fr;
  width: 100%;
  height: 100vh;
  transition: grid-template-columns 0.3s ease;

  &_collapsed {
    grid-template-columns: 3em 1fr;
  }

  &__container {
    max-width: 3500px;
    margin: 0 auto;
    padding: 1.5em;
  }
}

// .main .main__content {
//   overflow-y: auto;
// }

// .main .main__title {
//   font-size: var(--font-size-title-lg);
//   margin-bottom: 20px;
// }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>