<template>
  <li
    :class="classItem"
    @click="$router.push({ name: 'player', params: { slug: lesson.slug } })"
  >
    <h4 class="lesson__name">{{ lesson.title }}</h4>
    <span class="lesson__timing"> {{ getDuration(lesson.duration) }} </span>
  </li>
</template>

<script>
import { convertSecondsIntoTime } from "@/utils/dateUtils.js";

export default {
  props: ["lesson"],
  computed: {
    classItem() {
      const mainClass = "lesson";
      let classLst = [mainClass];
      if (this.lesson.isViewed) {
        classLst.push("lesson__topic_end");
      }
      if (this.lesson.isLocked) {
        classLst.push("lesson__topic_block");
      }
      if (this.lesson.isCurrent) {
        classLst.push("active");
      }
      return classLst;
    },
  },
  methods: {
    getDuration(duration) {
      return convertSecondsIntoTime(duration);
    },
  },
};
</script>

<style lang="scss" scoped>
.lesson {
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