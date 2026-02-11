<script setup>
import {ref, computed} from "vue"
import TheCheck from "../components/TheCheck.vue";
import checksJson from "../../../mocks/check.json";

const checks = ref(checksJson.tasks);
const selectedModule = ref("all");
const selectedStatus = ref("all");

const modules = computed(() => {
  // уникальные названия предметов
  const all = checks.value.map((c) => c.module);
  return [...new Set(all)];
});

const filteredChecks = computed(() => {
  return checks.value.filter((check) => {
    const byModule =
      selectedModule.value === "all" || check.module === selectedModule.value;

    const byStatus =
      selectedStatus.value === "all" ||
      (selectedStatus.value === "checked" && check.score !== null) ||
      (selectedStatus.value === "unchecked" && check.score === null);

    return byModule && byStatus;
  });
});
</script>

<template>
  <div class="main__container checks">
    <h1 class="checks__title">Проверка работ</h1>
    <div class="checks__filters">
      <select v-model="selectedStatus">
        <option value="all">Все</option>
        <option value="checked">Проверенные</option>
        <option value="unchecked">Не проверенные</option>
      </select>
      <select v-model="selectedModule">
        <option value="all">Все предметы</option>
        <option v-for="(mod, i) in modules" :key="i" :value="mod">
          {{ mod }}
        </option>
      </select>
    </div>
    <div class="checks__list" v-if="filteredChecks.length != 0">
      <TheCheck
        v-for="(check, index) in filteredChecks"
        :key="index"
        :check="check"
      />
    </div>
    <p class="checks__not-found" v-else>Нет работ для проверки</p>
  </div>
</template>

<style lang="scss" scoped>
.checks {
  &__title {
    margin-bottom: 20px;
    font-size: $font-size-title-lg;
  }

  &__filters {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;

    select {
      padding: 0.5em 1em;
      border-radius: $radius-lg;
    }
  }

  &__not-found {
    text-align: center;
    font-size: $font-size-text-lg;
  }
}
</style>