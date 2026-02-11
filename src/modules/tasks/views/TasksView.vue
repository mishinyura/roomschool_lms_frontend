<script setup>
import { ref } from 'vue';
import TheTask from "../components/TheTask.vue";
import tasksJson from "@/mocks/tasks.json";

const tasks = ref(tasksJson.tasks);
</script>

<template>
  <div class="main__container">
    <h1 class="main__title">Задания</h1>
    <section class="main__section tasks">
      <TheTask v-for="(task, index) in tasks" :key="index" :task="task" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main__title {
  font-size: $font-size-title-lg;
}
</style>