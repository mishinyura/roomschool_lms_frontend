<script setup>
import { defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import { convertSecondsIntoTime } from "@/utils/dateUtils.js";

const props = defineProps({
  lessons: {
    type: Array,
    required: true,
  },
  currentLessonSlug: {
    type: String,
    default: null,
  },
});

const route = useRoute();

const emit = defineEmits(["selectLesson"]);

const classItem = (lesson) => {
  const mainClass = "lessons__item";
  let classLst = [mainClass];
  console.log(route.params)
  if (lesson.isViewed) {
    classLst.push("lessons__topic_end");
  }
  if (lesson.isLocked) {
    classLst.push("lessons__topic_block");
  }
  if (lesson.slug === route.params.lesson) {
    classLst.push("active");
  }
  return classLst;
};

const getDuration = (duration) => {
  return convertSecondsIntoTime(duration);
};

const openView = (lesson) => {
  if (lesson.isLocked) return;
  emit("selectLesson", lesson);
};

</script>

<template>
  <div class="lessons" v-if="props.lessons.length > 0">
    <span class="lessons__title"> Уроки темы {{ lessons.length }} </span>
    <ul class="lessons__list">
      <li
        v-for="lesson in props.lessons"
        :key="lesson.slug"
        @click="openView(lesson)"
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

    &.active {
      cursor: $cursor-select;
      background-color: $color-action-grey;

      &::before {
        opacity: 1;
      }
    }

    &:hover {
      background-color: $color-action-light-grey;
      border-color: $color-action-grey;
    }
  }

  &__name {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    &::before {
      position: absolute;
      top: 0;
      left: -25px;
      width: 15px;
      height: 15px;
      content: "";
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

.lessons__item_end .lessons__name::before {
  @include mini-icon;
  mask-image: url("@/assets/media/icons/checkmark.svg");
  background-color: $color-label-dark-green;
}

.lessons__item_block .lessons__name::before {
  @include mini-icon;
  mask-image: url("@/assets/media/icons/lock.svg");
  background-color: $color-label-dark-grey;
}
// .lessons {
 

//   &__item {
//     position: relative;
//     padding: 1em 1em 1em 2.5em;
//     cursor: $cursor-point;
//     border: 1px solid transparent;
//     transition: border-color 0.1s, background-color 0.1s;

//     &:last-child {
//       border-radius: 0 0 $radius-lg $radius-lg;
//     }

//     &::before {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 3px;
//       height: 100%;
//       content: "";
//       background-color: $color-action-blue;
//       opacity: 0;
//       transition: opacity 0.1s;
//     }

//     &.active {
//       cursor: $cursor-select;
//       background-color: $color-action-grey;

//       &::before {
//         opacity: 1;
//       }

//       &.active:hover {
//         background-color: $color-action-grey;
//       }
//     }

//     &:hover {
//       background-color: $color-action-light-grey;
//       border-color: $color-action-grey;
//     }
//   }
//   // --- Название темы ---
//   &__name {
//     position: relative;
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     margin-bottom: 5px;
//     font-family: $font-family-montserrat;
//     font-size: $font-size-title-xs;
//     font-weight: 500;

//     // Псевдоэлемент для иконки статуса
//     &::before {
//       position: absolute;
//       top: 0;
//       left: -25px;
//       flex-shrink: 0;
//       width: 15px;
//       height: 15px;
//       content: "";
//     }

//     // Контекст: Текущая тема
//     .lesson__topic_current &::before {
//       outline: 2px solid $color-label-grey;
//       border-radius: $radius-max;
//     }

//     // Контекст: Завершенная тема
//     .lesson__topic_end &::before {
//       @include mini-icon;
//       mask-image: url("@/assets/media/icons/checkmark.svg");
//       background-color: $color-label-dark-green;
//     }

//     // Контекст: Заблокированная тема
//     .lesson__topic_block &::before {
//       @include mini-icon;
//       mask-image: url("@/assets/media/icons/lock.svg");
//       background-color: $color-label-dark-grey;
//     }
//   }

  
// }
</style>