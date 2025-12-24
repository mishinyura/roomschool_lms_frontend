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

<script>
import webinarsJson from "../../../mocks/webinars.json";
import { formatDateOnly } from "../../../utils/dateUtils.js";
import WebinarCard from "../components/WebinarsCard.vue";

export default {
  data() {
    return {
      webinars: webinarsJson,
    };
  },
  methods: {
    date(date) {
      return formatDateOnly(date);
    },
  },
  components: {
    WebinarCard,
  },
};
</script>

<style>
.webinars__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.webinars__title {
  font-size: var(--font-size-title-lg);
}
.webinars__control {
  display: flex;
  align-items: center;
  gap: 10px;
}
.webinars__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: var(--border-dark-blue);
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}
.webinars__btn_prev::before {
  content: "";
  width: 7px;
  height: 7px;
  border-left: var(--border-black);
  border-bottom: var(--border-black);
  transform: rotate(45deg);
}
.webinars__date {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 1em;
  border: var(--border-dark-blue);
  border-radius: var(--radius-lg);
}
.webinars__btn_next::before {
  content: "";
  width: 7px;
  height: 7px;
  border-right: var(--border-black);
  border-bottom: var(--border-black);
  transform: rotate(-45deg);
}
.webinars__section {
  padding: 1.5em;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-white);
}
.webinars__period {
  margin-bottom: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  color: var(--color-text-grey);
}
.webinars__days {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.webinars__day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  border-radius: var(--radius-md);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  background-color: var(--color-btn-grey);
}
.webinars__day:nth-child(1):before {
  content: "ПН";
}
.webinars__day:nth-child(2):before {
  content: "ВТ";
}
.webinars__day:nth-child(3):before {
  content: "СР";
}
.webinars__day:nth-child(4):before {
  content: "ЧТ";
}
.webinars__day:nth-child(5):before {
  content: "ПТ";
}
.webinars__day:nth-child(6):before {
  content: "СБ";
}
.webinars__day:nth-child(7):before {
  content: "ВС";
}
</style>