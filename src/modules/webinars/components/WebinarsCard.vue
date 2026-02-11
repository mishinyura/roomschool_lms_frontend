<script setup>
import {
  getAmountOfDays,
  formatDateWithTime,
} from "@/utils/dateUtils.js";

defineProps(['webinar']);

const datetime = (dt) => formatDateWithTime(dt);
const getAmountDays = (dt) => getAmountOfDays(dt);
</script>

<template>
  <div
    :class="[
      'webinars__card webinar',
      {
        webinar_now: getAmountDays(webinar.datetime) <= 0,
        webinar_soon:
          getAmountDays(webinar.datetime) > 0 &&
          getAmountDays(webinar.datetime) <= 1,
      },
    ]"
  >
    <div class="webinar__info">
      <h3 class="webinar__module">{{ webinar.module }}</h3>
      <p class="webinar__topic">{{ webinar.description }}</p>
      <div class="webinars__datetime">
        <span class="webinar__timing">{{ webinar.duration }} мин</span>
        <span class="webinar__start"> {{ datetime(webinar.datetime) }} </span>
      </div>
      <span class="webinar__teacher">{{ webinar.speaker }} </span>
    </div>
    <div class="webinar__control">
      <span
        :class="[
          'webinar__status',
          {
            webinar__status_now: getAmountDays(webinar.datetime) <= 0,
            webinar__status_soon:
              getAmountDays(webinar.datetime) > 0 &&
              getAmountDays(webinar.datetime) <= 1,
          },
        ]"
      >
        {{
          getAmountDays(webinar.datetime) <= 0
            ? "Сейчас"
            : getAmountDays(webinar.datetime) > 0 &&
              getAmountDays(webinar.datetime) <= 1
            ? "Скоро"
            : "Запланировано"
        }}
      </span>
      <a class="webinar__btn" :href="webinar.link">Войти</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Миксин для создания иконки через маску
@mixin icon-mask($url, $color, $size: 15px) {
  flex-shrink: 0;
  width: $size;
  height: $size;
  content: "";
  mask: url($url) no-repeat center/contain;
  background-color: $color;
}

.webinar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 1em;
  border: $border-blue;
  border-radius: $radius-lg;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  // Модификаторы состояния карточки
  &_now {
    background-color: $color-card-blue;
  }

  &_soon {
    background-color: $color-card-orange;
  }

  &__module {
    margin-bottom: 5px;
    font-size: $font-size-title-xs;
    font-weight: 400;
  }

  &__topic {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
  }

  &__datetime {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }

  // Группировка общих стилей для мета-данных
  &__timing,
  &__start,
  &__teacher {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: $font-family-montserrat;
    font-weight: 400;
    color: $color-text-grey;
  }

  &__timing {
    font-size: $font-size-text-min;

    &::before {
      @include icon-mask("@/assets/media/icons/clock.svg", $color-text-grey);
    }
  }

  &__start {
    font-size: $font-size-text-min;

    &::before {
      width: 5px;
      height: 5px;
      content: "";
      border-radius: 50px;
      background-color: $color-text-grey;
    }
  }

  &__teacher {
    font-size: $font-size-text-xs;

    &::before {
      @include icon-mask("@/assets/media/icons/profile.svg", $color-text-grey);
    }
  }

  &__control {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
  }

  &__status {
    padding: 0.5em 1em;
    border: $border-blue;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;

    &_now {
      background-color: $color-label-blue;
    }

    &_soon {
      background-color: $color-label-orange;
    }
  }

  &__btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    padding: 0.5em 1em;
    border: $border-blue;
    border-radius: $radius-lg;
    background-color: $color-btn-blue;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;

    &::before {
      @include icon-mask("@/assets/media/icons/camera.svg", $color-icon-black, 18px);
    }
  }
}
</style>