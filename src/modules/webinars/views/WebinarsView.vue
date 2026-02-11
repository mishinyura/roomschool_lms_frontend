<script setup>
import { ref } from 'vue';
import webinarsJson from "../../../mocks/webinars.json";
import { formatDateOnly } from "../../../utils/dateUtils.js";
import WebinarCard from "../components/WebinarsCard.vue";

// Реактивное состояние
const webinars = ref(webinarsJson);

// Метод для использования в шаблоне
const date = (d) => formatDateOnly(d);
</script>

<template>
  <div class="main__container webinars">
    <div class="webinars__head">
      <h1 class="webinars__title">Расписание онлайн занятий</h1>
      <div class="webinars__control">
        <button class="webinars__btn webinars__btn_prev"></button>
        <span class="webinars__date">Текущая неделя</span>
        <button class="webinars__btn webinars__btn_next"></button>
      </div>
    </div>
    <section class="webinars__section">
      <div class="webinars__content">
        <div class="webinars__period">
          {{ date("2025-11-02") }} - {{ date("2025-11-02") }}
        </div>
        <div class="webinars__days">
          <button class="webinars__day">27</button>
          <button class="webinars__day">28</button>
          <button class="webinars__day">29</button>
          <button class="webinars__day">30</button>
          <button class="webinars__day">31</button>
          <button class="webinars__day">1</button>
          <button class="webinars__day">2</button>
        </div>
        <div class="webinars__list">
          <WebinarCard
            v-for="(webinar, index) in webinars"
            :key="index"
            :webinar="webinar"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.webinars {
  &__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__title {
    font-size: $font-size-title-lg;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: $border-dark-blue;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;

    // Общие стили для стрелок внутри кнопок
    &_prev,
    &_next {
      &::before {
        width: 7px;
        height: 7px;
        content: "";
      }
    }

    &_prev::before {
      border-bottom: $border-black;
      border-left: $border-black;
      transform: rotate(45deg);
    }

    &_next::before {
      border-right: $border-black;
      border-bottom: $border-black;
      transform: rotate(-45deg);
    }
  }

  &__date {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 1em;
    border: $border-dark-blue;
    border-radius: $radius-lg;
  }

  &__section {
    padding: 1.5em;
    border-radius: $radius-lg;
    background-color: $color-bg-white;
  }

  &__period {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
    color: $color-text-grey;
  }

  &__days {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__day {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
    border-radius: $radius-md;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
    background-color: $color-btn-grey;

    $week-days: "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС";

    @each $day in $week-days {
      $i: index($week-days, $day);

      &:nth-child(#{$i})::before {
        content: $day;
      }
    }
  }
}
</style>