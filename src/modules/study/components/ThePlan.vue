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

<style lang="scss" scoped>
.plan {
  margin-bottom: 20px;
  border-radius: $radius-lg;
  background-color: $color-section-blue;
}

.plan__progressbar {
  padding: 1em;
}

.plan__title {
  margin-bottom: 20px;
  font-weight: 400;
}

.plan__counter {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
}

.plan__count {
  position: relative;
  display: flex;
  justify-content: center;
  font-family: $font-family-montserrat;
  font-size: $font-size-text-xs;
  font-weight: 500;
  color: $color-text-blue;
}

.plan__count::before {
  position: absolute;
  top: 20px;
  color: $color-text-grey;
}

.plan__count_total::before {
  content: "Запланировано";
}

.plan__count_end::before {
  content: "Завершено";
}

.plan__count_percent::before {
  content: "Прогресс недели";
  white-space: nowrap;
}

.plan__count_percent::after {
  content: "%";
}
.plan__progress {
  display: block;
  height: 8px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: $radius-sm;
}
.plan__remains {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: $font-family-montserrat;
  font-size: $font-size-text-xs;
  font-weight: 500;
}
.plan__remains::before {
  content: "До конца недели осталось:";
}
</style>