<template>
  <div :class="['main', { main_collapsed: sidebarStatusCollapsed }]">
    <SideBar @toggle-sidebar="toggleSidebar" />
    <main class="main__content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </RouterView>
    </main>
  </div>
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
}

.main__content {
  @include content-view;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>