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

<script>
import {
  getAmountOfDays,
  formatDateWithTime,
} from "@/utils/dateUtils.js";
export default {
  props: ["webinar"],
  methods: {
    datetime(datetime) {
      return formatDateWithTime(datetime);
    },
    getAmountDays(datetime) {
      return getAmountOfDays(datetime);
    },
  },
};
</script>

<style>
.webinar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 1em;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
}
.webinar:not(:last-child) {
  margin-bottom: 10px;
}
.webinar_now {
  background-color: var(--color-card-blue);
}

.webinar_soon {
  background-color: var(--color-card-orange);
}

.webinar__module {
  margin-bottom: 5px;
  font-size: var(--font-size-title-xs);
  font-weight: 400;
}

.webinar__topic {
  margin-bottom: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.webinars__datetime {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.webinar__timing {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}

.webinar__timing::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/clock.svg") no-repeat center/contain;
  background-color: var(--color-text-grey);
}

.webinar__start {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}

.webinar__start::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50px;
  background-color: var(--color-text-grey);
}

.webinar__teacher {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  color: var(--color-text-grey);
}

.webinar__teacher::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/profile.svg") no-repeat center/contain;
  background-color: var(--color-text-grey);
}

.webinar__control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
}

.webinar__status {
  padding: 0.5em 1em;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.webinar__status_now {
  background-color: var(--color-label-blue);
}

.webinar__status_soon {
  background-color: var(--color-label-orange);
}

.webinar__btn {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  padding: 0.5em 1em;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  background-color: var(--color-btn-blue);
}

.webinar__btn::before {
  content: "";
  width: 18px;
  height: 18px;
  mask: url("@/assets/media/icons/camera.svg") no-repeat center/contain;
  background-color: var(--color-icon-black);
}
</style>