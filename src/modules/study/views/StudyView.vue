<template>
  <div class="main__container">
    <h1 class="main__title">Обучение</h1>
    <ThePlan />
    <TheCourses />
  </div>
</template>

<script setup>
import ThePlan from "../components/ThePlan.vue";
import TheCourses from "../components/TheCourses.vue";
</script>

<style lang="scss" scoped>
.main__title {
  @include page-title
}
</style>