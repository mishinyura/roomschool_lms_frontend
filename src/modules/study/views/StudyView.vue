<script setup>
import ThePlan from "../components/ThePlan.vue";
import TheCourses from "../components/TheCourses.vue";
</script>

<template>
  <article class="study">
    <h1 class="study__title">Обучение</h1>
    <ThePlan />
    <TheCourses />
  </article>
</template>

<style lang="scss" scoped>

.study__title {
  @include page-title;
}
</style>