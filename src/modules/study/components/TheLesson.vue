<template>
  <li :class="classItem" @click="$router.push({ name: 'player', params: { slug: lesson.slug } })">
    <h4 class="lessons__name">{{ lesson.title }}</h4>
    <span class="lessons__timing"> {{ getDuration(lesson.duration) }} </span>
  </li>
</template>

<script>
import { convertSecondsIntoTime } from "@/utils/dateUtils.js";

export default {
  props: ["lesson"],
  computed: {
    classItem() {
      const mainClass = "lessons__topic";
      let classLst = [mainClass];
      if (this.lesson.isViewed) {
        classLst.push("lessons__topic_end");
      }
      if (this.lesson.isLocked) {
        classLst.push("lessons__topic_block");
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

<style>
.lessons__topic {
  position: relative;
  padding: 1em 1em 1em 2.5em;
  border: 1px solid transparent;
  transition: border-color 0.1s, background-color 0.1s;
  cursor: var(--cursor-point);
}

.lessons__topic:last-child {
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

.lessons__topic.active {
  background-color: var(--color-action-grey);
  cursor: var(--cursor-classic);
}

.lessons__topic::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 3px;
  height: 100%;
  background-color: blue;
  opacity: 0;
}

.lessons__topic.active::before {
  opacity: 1;
}

.lessons__topic:not(.active):hover {
  border-color: var(--color-action-grey);
  background-color: var(--color-action-light-grey);
}

.lessons__name {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.lessons__name::before {
  position: absolute;
  top: 0;
  left: -25px;
  flex-shrink: 0;
  content: "";
  width: 15px;
  height: 15px;
}

.lessons__topic_current .lessons__name::before {
  outline: 2px solid var(--color-label-grey);
  border-radius: var(--radius-max);
}

.lessons__topic_end .lessons__name::before {
  background-color: var(--color-label-dark-green);
  mask: url("@/assets/media/icons/checkmark.svg") no-repeat center/contain;
}

.lessons__topic_block .lessons__name::before {
  background-color: var(--color-label-dark-grey);
  mask: url("@/assets/media/icons/lock.svg") no-repeat center/contain;
}

.lessons__timing {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}

.lessons__timing::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/clock.svg") no-repeat center/contain;
  background-color: var(--color-text-grey);
}
</style>