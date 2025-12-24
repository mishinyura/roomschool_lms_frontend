<template>
  <div class="main__container">
    <h1 class="main__title">Задания</h1>
    <section class="main__section tasks">
      <TheTask v-for="(task, index) in tasks" :key="index" :task="task" />
    </section>
  </div>
</template>

<script>
import TheTask from "../components/TheTask.vue";

import tasksJson from "@/mocks/tasks.json";

export default {
  data() {
    return {
      tasks: tasksJson.tasks,
    };
  },
  components: {
    TheTask,
  },
};
</script>

<style>
.main__title {
  font-size: var(--font-size-title-lg);
}
.tasks__item {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 1em;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-white);
}
.tasks__item_end::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-dark-green);
  content: "";
}
.tasks__item_end::after {
  position: absolute;
  top: 0;
  left: 5px;
  width: 10px;
  height: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-white);
  content: "";
}
.tasks__item:not(:last-child) {
  margin-bottom: 10px;
}
.tasks__topic {
  margin-bottom: 30px;
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}
.tasks__module {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sms);
  font-weight: 400;
  color: var(--color-text-grey);
}
.tasks__module::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
  background-color: var(--color-text-grey);
}
.tasks__description {
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}
.tasks__deadline {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
  color: var(--color-text-grey);
}
.tasks__deadline_active::before {
  content: "Срок сдачи:";
}
.tasks__deadline_end::before {
  content: "Сдано:";
}
.tasks__control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.tasks__labels {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tasks__label {
  padding: 0.3em 0.6em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}
.tasks__label_end {
  background-color: var(--color-label-green);
  color: var(--color-text-white);
}
.tasks__label_score {
  border: var(--border-blue);
}
.tasks__label_score::before {
  content: "Оценка:";
}
.tasks__label_end::before {
  content: "Сдано";
}
.tasks__label_deadline {
  background-color: var(--color-label-orange);
}
.tasks__label_deadline::before {
  content: "Срок:";
}
.tasks__label_overdue {
  background-color: var(--color-label-dark-red);
  color: var(--color-text-white);
}
.tasks__label_overdue::before {
  content: "Просрочено";
}
.tasks__label_red {
  background-color: var(--color-label-red);
  color: var(--color-text-white);
}
.tasks__btn {
  padding: 0.5em 1em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}
.tasks__btn_submit {
  background-color: var(--color-btn-dark-blue);
  color: var(--color-text-white);
}
.tasks__btn_view {
  background-color: var(--color-btn-blue);
}
</style>