<script setup>
import {defineProps, computed} from "vue";
import { pluralize } from "../../../utils/globalUtils.js";
import { formatDateWithTime } from "../../../utils/dateUtils.js";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const contverLabelDeadline = (deadline) => {
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
};

const getDatetime = computed(() => {
  return formatDateWithTime(props.task.deadline);
});
</script>

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
        {{ getDatetime }}
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

<style lang="scss" scoped>
.tasks {
  // --- Элемент списка ---
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 1.5em 1em;
    border-radius: $radius-lg;
    background-color: $color-bg-white;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    // Модификатор: завершенная задача (декоративная полоса)
    &_end {
      &::before,
      &::after {
        position: absolute;
        top: 0;
        height: 100%;
        content: "";
        border-radius: $radius-lg;
      }

      // Цветная полоса
      &::before {
        left: 0;
        width: 10px;
        background-color: $color-label-dark-green;
      }

      // Маска для формы полосы
      &::after {
        left: 5px;
        width: 10px;
        background-color: $color-bg-white;
      }
    }
  }

  // --- Контент задачи ---
  &__topic {
    margin-bottom: 30px;
    font-size: $font-size-title-xs;
    font-weight: 500;
  }

  &__module {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-grey;

    &::before {
      width: 15px;
      height: 15px;
      content: "";
      mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
      background-color: $color-text-grey;
    }
  }

  &__description {
    margin-bottom: 20px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
  }

  &__deadline {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-grey;

    &_active::before {
      content: "Срок сдачи:";
    }

    &_end::before {
      content: "Сдано:";
    }
  }

  // --- Управление и метки ---
  &__control {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__labels {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__label {
    padding: 0.3em 0.6em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;

    // Статусы и цвета
    &_end {
      background-color: $color-label-green;
      color: $color-text-white;

      &::before {
        content: "Сдано";
      }
    }

    &_score {
      border: $border-blue;

      &::before {
        content: "Оценка:";
      }
    }

    &_deadline {
      background-color: $color-label-orange;

      &::before {
        content: "Срок:";
      }
    }

    &_overdue {
      background-color: $color-label-dark-red;
      color: $color-text-white;

      &::before {
        content: "Просрочено";
      }
    }

    &_red {
      background-color: $color-label-red;
      color: $color-text-white;
    }
  }

  // --- Кнопки ---
  &__btn {
    padding: 0.5em 1em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;

    &_submit {
      background-color: $color-btn-dark-blue;
      color: $color-text-white;
    }

    &_view {
      background-color: $color-btn-blue;
    }
  }
}
</style>