<script setup>
import TheNotification from "./TheNotification.vue";
import { inject } from "vue";

let errors = inject("errors");

const removeError = (errorToRemove) => {
  errors.value = errors.value.filter((item) => item !== errorToRemove);
};
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="notification-list">
      <TheNotification v-for="error in errors" :key="error" :error="error" @close="removeError(error)"/>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.3s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notifications {
  position: fixed;
  right: 5px;
  bottom: 5px;
  z-index: 100000;
  width: 300px;
  display: flex;
  flex-direction: column;
}
</style>