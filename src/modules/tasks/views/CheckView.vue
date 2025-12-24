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

<script>
import TheCheck from "../components/TheCheck.vue";

import checksJson from "../../../mocks/check.json";

export default {
  data() {
    return {
      checks: checksJson.tasks,
      selectedModule: "all",
      selectedStatus: "all",
    };
  },
  components: {
    TheCheck,
  },

  computed: {
    modules() {
      // уникальные названия предметов
      const all = this.checks.map((c) => c.module);
      return [...new Set(all)];
    },

    filteredChecks() {
      return this.checks.filter((check) => {
        const byModule =
          this.selectedModule === "all" || check.module === this.selectedModule;

        const byStatus =
          this.selectedStatus === "all" ||
          (this.selectedStatus === "checked" && check.score !== null) ||
          (this.selectedStatus === "unchecked" && check.score === null);

        return byModule && byStatus;
      });
    },
  },
};
</script>

<style>
.checks__title {
  margin-bottom: 20px;
  font-size: var(--font-size-title-lg);
}

.checks__filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}
.checks__filters select {
  padding: 0.5em 1em;
  border-radius: var(--radius-lg);
}
.checks__not-found {
  text-align: center;
  font-size: var(--font-size-text-lg);
}
</style>