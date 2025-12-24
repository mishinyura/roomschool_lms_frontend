<template>
  <div :class="['tasks__item', { tasks__item_end: task.score }]">
    <div class="tasks__info">
      <h3 class="tasks__topic">{{ task.topic }}</h3>
      <span class="tasks__module">{{ task.module }}</span>
      <p class="tasks__description">{{ task.description }}</p>
      <span
        :class="[
          'tasks__deadline',
          {
            tasks__deadline_active: !task.score,
            tasks__deadline_end: task.score,
          },
        ]"
      >
        {{ datetime }}
      </span>
    </div>
    <div class="tasks__control">
      <div class="tasks__labels">
        <span
          :class="[
            'tasks__label',
            'tasks__label_deadline',
            {
              tasks__label_deadline:
                contverLabelDeadline(task.deadline)[0] >= 0,
              tasks__label_red:
                contverLabelDeadline(task.deadline)[0] < 2 &&
                contverLabelDeadline(task.deadline)[0] >= 0,
              tasks__label_overdue: contverLabelDeadline(task.deadline)[0] < 0,
            },
          ]"
          v-if="!task.score"
        >
          {{ contverLabelDeadline(task.deadline)[1] }}
        </span>
        <span
          :class="['tasks__label', { tasks__label_score: task.score }]"
          v-if="task.score"
        >
          5
        </span>
      </div>
      <button
        :class="[
          'tasks__btn',
          {
            tasks__btn_submit: !task.score,
            tasks__btn_view: task.score,
          },
        ]"
      >
        {{ task.score ? "Посмотреть" : "Сдать работу" }}
      </button>
    </div>
  </div>
</template>

<script>
import { pluralize } from "../../../utils/globalUtils.js";
import { formatDateWithTime } from "../../../utils/dateUtils.js";

export default {
  props: ["task"],
  data() {},
  methods: {
    contverLabelDeadline(deadline) {
      const now = new Date();
      const target = new Date(deadline);

      const diffMs = target.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return [-1, ""];
      } else if (diffDays === 0) {
        return [0, " сегодня"];
      } else if (diffDays === 1) {
        return [1, " завтра"];
      } else {
        return [2, ` ${pluralize(diffDays, "день", "дня", "дней")}`];
      }
    }
  },
  computed: {
    datetime() {
      return formatDateWithTime(this.task.deadline);
    }
  }
};
</script>