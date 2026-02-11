<script setup>
import { computed } from 'vue';
import planData from "@/mocks/plan.json";
import {pluralize} from "@/utils/globalUtils.js";

const plan = planData;

const progress = computed(() => {
  //Рассчет прогресса в процентах
  return Math.floor(plan.completed / plan.total * 100);
})

const remains = computed(() => {
  //Рассчет оставшихся уроков
  return pluralize(plan.remains, "урок", "урока", "уроков");
})

const progressBarStyle = computed(() => {
  //Рассчитывает градиент програсс бара
  let fullProgress = plan.completed / plan.total * 100
  let style = `background: linear-gradient(90deg, rgba(10, 166, 215, 1) ${fullProgress}%, rgba(222, 246, 255, 1) ${fullProgress}%);`
  return style
})

</script>

<template>
  <section class="main__section plan" v-if="plan.total">
    <div class="plan__progressbar">
      <h2 class="plan__title">План обучения</h2>
      <div class="plan__counter">
        <span class="plan__count plan__count_total">{{plan.total}}</span>
        <span class="plan__count plan__count_end">{{plan.completed}}</span>
        <span class="plan__count plan__count_percent">{{progress}}</span>
      </div>
      <span class="plan__progress" :style="progressBarStyle"></span>
      <span class="plan__remains">{{remains}}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.plan {
  margin-bottom: 20px;
  border-radius: $radius-lg;
  background-color: $color-section-blue;

  &__progressbar {
    padding: 1em;
  }

  &__title {
    @include section-title;
  }

  &__counter {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
  }

  &__count {
    @include counter-blue;
    position: relative;
    display: flex;
    justify-content: center;

    &::before {
      @include note-title;
      position: absolute;
      top: 20px;
    }

    &_total::before {
      content: "Запланировано";
    }

    &_end::before {
      content: "Завершено";
    }

    &_percent {
      &::before {
        content: "Прогресс недели";
        white-space: nowrap;
      }

      &::after {
        content: "%";
      }
    }
  }

  &__progress {
    display: block;
    height: 8px;
    width: 100%;
    margin-bottom: 20px;
    border-radius: $radius-sm;
  }

  &__remains {
    @include note-title;
    display: flex;
    align-items: center;
    gap: 5px;

    &::before {
      content: "До конца недели осталось:";
    }
  }
}
</style>