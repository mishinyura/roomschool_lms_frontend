<template>
  <div :class="['checks__item check', { check_end: check.score }]">
    <div class="check__info">
      <h3 class="check__topic">{{ check.topic }}</h3>
      <span class="check__module">{{ check.module }}</span>
      <p class="check__description">{{ check.description }}</p>
      <span
        :class="[
          'check__deadline',
          {
            check__deadline_active: !check.score,
            check__deadline_end: check.score,
          },
        ]"
      >
        {{ convertDeadline(check.deadline) }}
      </span>
    </div>
    <div class="check__control">
      <div class="check__labels">
        <span :class="['check__label', labelClass]" v-if="!check.score">
          {{ labelText }}
        </span>
        <span
          :class="['check__label', { check__label_score: check.score }]"
          v-if="check.score"
        >
          {{ check.score }}
        </span>
      </div>
      <button
        @click="openTaskCheck"
        :class="[
          'check__btn',
          {
            check__btn_submit: !check.score,
            check__btn_view: check.score,
          },
        ]"
      >
        {{ check.score ? "Исправить" : "Проверить" }}
      </button>
    </div>
  </div>
</template>

<script>
import { pluralize } from "@/utils/globalUtils.js";

export default {
  props: ["check"],
  data() {},
  computed: {
    deadlineClass() {
      if (!this.check.score) return "check__deadline check__deadline_active";
      if (this.check.score && !this.check.edit_datetime)
        return "check__deadline check__deadline_end";
      return "check__deadline check__deadline_edit";
    },

    deadlineText() {
      if (!this.check.score) return this.convertDeadline(this.check.deadline);
      if (!this.check.edit_datetime)
        return this.convertDeadline(this.check.check_datetime);
      return this.convertDeadline(this.check.edit_datetime);
    },

    labelData() {
      const now = new Date();
      const target = new Date(this.check.deadline);
      const diffDays = Math.floor((target - now) / 86400000); // 1000*60*60*24

      if (diffDays < 0)
        return {
          cls: "check__label_overdue check__label_dark-red",
          text: "",
        };

      if (diffDays === 0)
        return {
          cls: "check__label_deadline check__label_red",
          text: "сегодня",
        };

      if (diffDays === 1)
        return {
          cls: "check__label_deadline check__label_orange",
          text: "завтра",
        };

      return {
        cls: "check__label_deadline check__label_classic",
        text: `${pluralize(diffDays, "день", "дня", "дней")}`,
      };
    },

    labelClass() {
      return this.labelData.cls;
    },

    labelText() {
      return this.labelData.text;
    },
  },
  methods: {
    convertDeadline(deadline, timeZone = "Europe/Moscow") {
      const date = new Date(deadline);

      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      };

      const formatted = new Intl.DateTimeFormat("ru-RU", options).format(date);

      return formatted.replace(" г.", "").replace(" в", ",");
    },
    openTaskCheck() {
      console.log(this.task);
      this.$router.push({ name: "taskcheck", params: { id: this.check.id } });
    },
  },
};
</script>

<style>
.check {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 1em;
  border-radius: var(--radius-lg);
  background-color: var(--color-card-white);
}
.check_end::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-dark-green);
  content: "";
}
.check_end::after {
  position: absolute;
  top: 0;
  left: 5px;
  width: 10px;
  height: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-card-white);
  content: "";
}
.check:not(:last-child) {
  margin-bottom: 10px;
}
.check__topic {
  margin-bottom: 30px;
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}
.check__module {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sms);
  font-weight: 400;
  color: var(--color-text-grey);
}
.check__module::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
  background-color: var(--color-text-grey);
}
.check__description {
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}
.check__deadline {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
  color: var(--color-text-grey);
}
.check__deadline_active::before {
  content: "Срок сдачи:";
}
.check__deadline_end::before {
  content: "Сдано:";
}
.check__control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.check__labels {
  display: flex;
  align-items: center;
  gap: 10px;
}
.check__label {
  padding: 0.3em 0.6em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}
.check__label_end {
  background-color: var(--color-label-green);
  color: var(--color-text-white);
}
.check__label_score {
  border: var(--border-blue);
}
.check__label_score::before {
  content: "Оценка: ";
}
.check__label_end::before {
  content: "Сдано";
}
.check__label_deadline::before {
  content: "Срок: ";
}
.check__label_overdue::before {
  content: "Просрочено";
}
.check__label_dark-red {
  background-color: var(--color-label-dark-red);
  color: var(--color-text-white);
}
.check__label_red {
  background-color: var(--color-label-red);
  color: var(--color-text-white);
}
.check__label_orange {
  background-color: var(--color-label-orange);
  color: var(--color-text-black);
}
.check__label_classic {
  background-color: var(--color-label-grey);
  color: var(--color-text-black);
}

.check__btn {
  padding: 0.5em 1em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}
.check__btn_submit {
  background-color: var(--color-btn-dark-blue);
  color: var(--color-text-white);
}
.check__btn_view {
  background-color: var(--color-btn-blue);
}
</style>