<template>
  <section class="card">
    <div class="card__head">
      <h3 :class="['card__title', 'card__title_' + card.type]">
        {{ card.title }}
      </h3>
      <button class="card__edit"></button>
    </div>
    <ul class="card__info">
      <li class="card__item" v-for="(item, index) in card.inputs" :key="index">
        <span class="card__label">
          {{ item.label }}
        </span>
        <input type="text" class="card__input" :value="item.value" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["card"],
  data() {
    return {};
  },
};
</script>

<style>
.card {
  padding: 1.5em;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-white);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.card__title {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}
.card__title::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: var(--color-icon-blue);
}
.card__title_personal::before {
  /* Личная информация */
  mask: url("@/assets/media/icons/profile.svg") no-repeat center/contain;
}
.card__title_study::before {
  /* Учебная информация */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__title_contacts::before {
  /* Контактная информация */
  mask: url("@/assets/media/icons/mail.svg") no-repeat center/contain;
}
.card__title_statistic::before {
  /* Статистика обучения */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__title_parent::before {
  /* Родитель / Законный представитель */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__title_subjects::before {
  /* Предметы */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__title_education::before {
  /* Образоание и квалификация */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__title_official::before {
  /* Служебная информация */
  mask: url("@/assets/media/icons/badge.svg") no-repeat center/contain;
}
.card__title_work::before {
  /* Место работы */
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
}
.card__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}
.card__edit::before {
  content: "";
  width: 100%;
  height: 100%;
  mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
  background-color: var(--color-icon-grey);
}
.card__item:not(:last-child) {
  margin-bottom: 10px;
}
.card__label {
  display: block;
  margin-bottom: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 500;
}
.card__input {
  width: 100%;
  padding: 0.5em 1em;
  box-sizing: border-box;
  border-radius: var(--radius-md);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  background-color: var(--color-bg-grey);
}
</style>