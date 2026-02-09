<script setup>
import { provide, ref } from "vue";
import TheLoader from "@/components/ui/TheLoader.vue";
import TheNotifications from "@/components/ui/TheNotifications.vue";
let errors = ref([]);
let loading = ref(false);
provide("errors", errors);
provide("loading", loading);
</script>

<template>
  <TheLoader v-if="loading" />
  <RouterView />
  <TheNotifications v-if="errors.length > 0" v-model="errors" />
</template>

<style scoped></style>