<script setup>
import {defineProps, computed} from "vue";
import { pluralize } from "@/utils/globalUtils.js";

const props = defineProps({
  check: {
    type: Object,
    required: true,
  },
});

// const deadlineClass = computed(() => {
//   if (!props.check.score) return "check__deadline check__deadline_active";
//   if (props.check.score && !props.check.edit_datetime)
//     return "check__deadline check__deadline_end";
//   return "check__deadline check__deadline_edit";
// });

// const deadlineText = computed(() => {
//   if (!props.check.score) return props.convertDeadline(props.check.deadline);
//   if (!props.check.edit_datetime)
//     return props.convertDeadline(props.check.check_datetime);
//   return props.convertDeadline(props.check.edit_datetime);
// });

const labelData = computed(() => {
  const now = new Date();
  const target = new Date(props.check.deadline);
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
    cls: "check__label_deadline",
    text: `${pluralize(diffDays, "день", "дня", "дней")}`,
  };
});

const labelClass = computed(() => labelData.value.cls);
const labelText = computed(() => labelData.value.text);

const convertDeadline = (deadline, timeZone = "Europe/Moscow") => {
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
};

const openTaskCheck = () => {
  console.log(props.task);
  this.$router.push({ name: "taskcheck", params: { id: props.check.id } });
};
</script>

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

<style lang="scss" scoped>
.check {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 1em;
  border-radius: $radius-lg;
  background-color: $color-card-white;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  // Модификатор завершенного задания (зеленая полоса слева)
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

    // Маска, перекрывающая часть полосы для скругления
    &::after {
      left: 5px;
      width: 10px;
      background-color: $color-card-white;
    }
  }

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

    // --- Варианты контента (Content Modifiers) ---
    &_end {
      // Совмещает цвет и текст
      color: $color-text-white;
      background-color: $color-label-green;

      &::before {
        content: "Сдано";
      }
    }

    &_score {
      border: $border-blue;

      &::before {
        content: "Оценка: ";
      }
    }

    &_deadline::before {
      content: "Срок: ";
    }

    &_overdue::before {
      content: "Просрочено";
    }

    // --- Цветовые модификаторы (Color Modifiers) ---
    &_dark-red {
      color: $color-text-white;
      background-color: $color-label-dark-red;
    }

    &_red {
      color: $color-text-white;
      background-color: $color-label-red;
    }

    &_orange {
      color: $color-text-black;
      background-color: $color-label-orange;
    }

    &_classic {
      color: $color-text-black;
      background-color: $color-label-grey;
    }
  }

  &__btn {
    padding: 0.5em 1em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;

    &_submit {
      color: $color-text-white;
      background-color: $color-btn-dark-blue;
    }

    &_view {
      background-color: $color-btn-blue;
    }
  }
}
</style>