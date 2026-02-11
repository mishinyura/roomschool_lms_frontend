<template>
  <article class="main__content">
    <h1 class="main__title">Обучение</h1>
    <ThePlan />
    <TheCourses />
  </article>
</template>

<script setup>
import ThePlan from "../components/ThePlan.vue";
import TheCourses from "../components/TheCourses.vue";
</script>

<style lang="scss" scoped>

.main__title {
  @include page-title;
}
</style>