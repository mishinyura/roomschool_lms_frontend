<template>
  <div class="main__container">
    <h1 class="main__title">Обучение</h1>
    <ThePlan />
    <TheCourses />
  </div>
</template>

<script>
import ThePlan from "../components/ThePlan.vue";
import TheCourses from "../components/TheCourses.vue";

export default {
  components: { ThePlan, TheCourses },
};
</script>

<style>
.main__title {
  font-size: var(--font-size-title-lg);
  margin-bottom: 20px;
}</style>