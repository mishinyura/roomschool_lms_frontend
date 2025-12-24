<template>
  <section class="main__section plan">
    <div class="plan__progressbar">
      <h2 class="plan__title">План обучения</h2>
      <div class="plan__counter">
        <span class="plan__count plan__count_total">12</span>
        <span class="plan__count plan__count_end">8</span>
        <span class="plan__count plan__count_percent">67</span>
      </div>
      <span class="plan__progress"></span>
      <span class="plan__remains">4</span>
    </div>
  </section>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
.plan {
  margin-bottom: 20px;
  border-radius: var(--radius-lg);
  background-color: var(--color-section-blue);
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
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 500;
  color: var(--color-text-blue);
}

.plan__count::before {
  position: absolute;
  top: 20px;
  color: var(--color-text-grey);
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
  border-radius: var(--radius-sm);
  background: linear-gradient(
    90deg,
    rgba(10, 166, 215, 1) 59%,
    rgba(222, 246, 255, 1) 59%
  );
}
.plan__remains {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 500;
}
.plan__remains::before {
  content: "До конца недели осталось:";
}
.plan__remains::after {
  content: "урока";
}
</style>