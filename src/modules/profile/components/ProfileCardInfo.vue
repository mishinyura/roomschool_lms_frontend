<script setup>
import { defineProps } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="card">
    <div class="card__head">
      <h3 :class="['card__title', 'card__title_' + props.card.type]">
        {{ props.card.title }}
      </h3>
      <button class="card__edit"></button>
    </div>
    <ul class="card__info">
      <li class="card__item" v-for="(item, index) in props.card.inputs" :key="index">
        <span class="card__label">
          {{ item.label }}
        </span>
        <input type="text" class="card__input" :value="item.value" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.card {
  padding: 1.5em;
  border-radius: $radius-lg;
  background-color: $color-bg-white;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }

  &__title {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    // Базовые стили иконки
    &::before {
      width: 20px;
      height: 20px;
      content: "";
      background-color: $color-icon-blue;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }

    // Карта иконок: "имя модификатора" : "имя файла"
    $icons: (
      "personal": "profile.svg",
      "study": "pen.svg",
      "contacts": "mail.svg",
      "statistic": "pen.svg",
      "parent": "pen.svg",
      "subjects": "pen.svg",
      "education": "pen.svg",
      "official": "badge.svg",
      "work": "pen.svg",
    );

    // Генерация модификаторов через цикл
    @each $name, $file in $icons {
      &_#{$name}::before {
        mask-image: url("@/assets/media/icons/#{$file}");
      }
    }
  }

  &__edit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;

    &::before {
      width: 100%;
      height: 100%;
      content: "";
      mask: url("@/assets/media/icons/pen.svg") no-repeat center/contain;
      background-color: $color-icon-grey;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__label {
    display: block;
    margin-bottom: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 500;
  }

  &__input {
    width: 100%;
    padding: 0.5em 1em;
    box-sizing: border-box;
    border-radius: $radius-md;
    background-color: $color-bg-grey;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
  }
}
</style>