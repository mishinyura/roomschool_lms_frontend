<script setup>
import { defineProps } from "vue";
import { convertSecondsIntoTime } from "@/utils/dateUtils.js";

const props = defineProps({
  lessons: {
    type: Array,
    required: true,
  },
});

const classItem = (lesson) => {
  const mainClass = "lessons__item";
  let classLst = [mainClass];
  if (lesson.isViewed) {
    classLst.push("lessons__topic_end");
  }
  if (lesson.isLocked) {
    classLst.push("lessons__topic_block");
  }
  if (lesson.isCurrent) {
    classLst.push("active");
  }
  return classLst;
};

const getDuration = (duration) => {
  return convertSecondsIntoTime(duration);
};
</script>

<template>
  <div class="lessons" v-if="props.lessons.length > 0">
    <span class="lessons__title"> Уроки темы {{ lessons.length }} </span>
    <ul class="lessons__list">
      <li
        v-for="(lesson, index) in props.lessons"
        :key="index"
        @click="openLesson(lesson.id)"
        :class="classItem(lesson)"
      >
        <h4 class="lessons__name">{{ lesson.title }}</h4>
        <span class="lessons__timing" v-if="lesson.duration">
          {{ getDuration(lesson.duration) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.lessons {
  &__title {
    @include player-title("@/assets/media/icons/study_topic.svg");
    padding: 1em;
    margin-bottom: 0;
  }

  &__item {
    position: relative;
    padding: 1em 1em 1em 2.5em;
    cursor: $cursor-point;
    border: 1px solid transparent;
    transition: border-color 0.1s, background-color 0.1s;

    &:last-child {
      border-radius: 0 0 $radius-lg $radius-lg;
    }

    // Синяя полоска слева (активный индикатор)
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      content: "";
      background-color: $color-action-blue;
      opacity: 0;
      transition: opacity 0.1s;
    }

    // Состояние: Активен (выбран)
    &.active {
      cursor: $cursor-select;
      background-color: $color-action-grey;

      &::before {
        opacity: 1;
      }

      // Состояние: Ховер
      &:not(.active):hover {
        background-color: $color-action-light-grey;
        border-color: $color-action-grey;
      }
    }
  }
  // --- Название темы ---
  &__name {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    // Псевдоэлемент для иконки статуса
    &::before {
      position: absolute;
      top: 0;
      left: -25px;
      flex-shrink: 0;
      width: 15px;
      height: 15px;
      content: "";
    }

    // Контекст: Текущая тема
    .lesson__topic_current &::before {
      outline: 2px solid $color-label-grey;
      border-radius: $radius-max;
    }

    // Контекст: Завершенная тема
    .lesson__topic_end &::before {
      @include mini-icon;
      mask-image: url("@/assets/media/icons/checkmark.svg");
      background-color: $color-label-dark-green;
    }

    // Контекст: Заблокированная тема
    .lesson__topic_block &::before {
      @include mini-icon;
      mask-image: url("@/assets/media/icons/lock.svg");
      background-color: $color-label-dark-grey;
    }
  }

  // --- Тайминг урока ---
  &__timing {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    color: $color-text-grey;

    &::before {
      width: 15px;
      height: 15px;
      content: "";
      mask: url("@/assets/media/icons/clock.svg") no-repeat center/contain;
      background-color: $color-text-grey;
    }
  }
}
</style>