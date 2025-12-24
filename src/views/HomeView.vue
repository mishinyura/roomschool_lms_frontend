<template>
  <main :class="['main', { main_collapsed: sidebarStatusCollapsed }]">
    <SideBar @toggle-sidebar="toggleSidebar" />
    <article class="main__content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </RouterView>
    </article>
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

<style>
.main {
  display: grid;
  grid-template-columns: 17em 1fr;
  width: 100%;
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
}

.main_collapsed {
  grid-template-columns: 3em 1fr;
}
.main__content {
  overflow-y: auto;
}

.main__container {
  max-width: 3500px;
  margin: 0 auto;
  padding: 1.5em;
}
.main__title {
  font-size: var(--font-size-title-lg);
  margin-bottom: 20px;
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