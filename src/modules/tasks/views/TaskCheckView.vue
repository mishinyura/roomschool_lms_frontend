<script setup>
import { ref, computed, watch } from 'vue';
// import { useRouter } from 'vue-router';
import { formatDateWithTime } from "@/utils/dateUtils.js";

// Инициализация роутера
// const router = useRouter();

// --- Состояние (Data) ---
const isOpenDescription = ref(false);
const score = ref(0);
// Ссылка на DOM-элемент описания (замена querySelector)
const descriptionRef = ref(null);

const task = ref({
  topic: "Квадратное уравнение",
  module: "Математика",
  description: "Тут какое-то описание в разметке markdown",
  passed: "2025-11-16T23:59:59Z",
  score: null,
  maxScore: 20,
  attachments: [
    {
      type: "file",
      name: "Проверка_корней_Иванов_иван.pdf",
      link: "http://yandex.ru",
    },
    {
      type: "link",
      name: "http://yandex.ru",
      link: "http://yandex.ru",
    },
  ],
});

// --- Вычисляемые свойства (Computed) ---
const getDate = computed(() => {
  return formatDateWithTime(task.value.passed);
});

// --- Наблюдатели (Watch) ---
watch(score, (newValue) => {
  if (newValue > 100) score.value = 100;
  if (newValue < 0) score.value = 0;
});

// --- Методы (Methods) ---
const openDescription = () => {
  // Обращаемся к элементу через ref.value
  const element = descriptionRef.value;
  
  if (!element) return; // Защита от отсутствия элемента

  if (isOpenDescription.value) {
    element.style.height = "0px";
  } else {
    element.style.height = element.scrollHeight + "px";
  }
  
  isOpenDescription.value = !isOpenDescription.value;
};

// const goBack = () => {
//   router.push({ name: "checks" });
// };
</script>

<template>
  <div class="main__container taskcheck">
    <div class="main__bullet breadcrumbs">
        <button class="breadcrumbs__btn" @click="this.$router.back()">Назад</button>
        <ul class="breadcrumbs__list">
          <li class="breadcrumbs__item">Проверка работы</li>
        </ul>
      </div>
    <h1 class="taskcheck__title">Проверка работы</h1>
    <div class="taskcheck__info about">
      <h3 class="about__title">Информация о работе</h3>
      <ul class="about__list">
        <li class="about__item">
          <span class="about__name"> Предмет </span>
          <span class="about__value"> {{ task.module }} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Название </span>
          <span class="about__value"> {{ task.topic }} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Дата сдачи </span>
          <span class="about__value"> {{getDate}} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Максимальный балл </span>
          <span class="about__value"> {{ task.maxScore }} </span>
        </li>
      </ul>
      <button :class="['about__btn about__btn_classic', isOpenDescription ? 'active' : '']" @click="openDescription">
        Показать описание задания
      </button>
      <div class="about__description description_md">
        {{ task.description }}
      </div>
    </div>
    <div class="taskcheck__info attachments">
      <h3 class="attachments__title">Приложения к заданию</h3>
      <ul class="attachments__list">
        <li
          class="attachments__item"
          v-for="(attach, index) in task.attachments"
          :key="index"
          :attach="attach"
        >
          <span class="attachments__type">
            {{ attach.type == "file" ? "Файл" : "Ссылка" }}
          </span>
          <span class="attachments__name">
            {{ attach.name }}
          </span>
          <a
            :href="attach.link"
            :class="[
              'attachments__btn attachments__btn_classic',
              attach.type == 'file'
                ? 'attachments__btn_download'
                : 'attachments__btn_link',
            ]"
            :target="attach.type != 'file' ? '_blank' : ''"
            :download="attach.type == 'file'"
          >
            {{ attach.type == "file" ? "Скачать" : "Перейти" }}
          </a>
        </li>
      </ul>
    </div>
    <div class="taskcheck__info scoring">
      <h3 class="scoring__title">Оценка за работу</h3>
      <span class="scoring__score">
        {{ score }}
      </span>
      <div class="scoring__control">
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          @change="score = $event.target.value"
          :value="score"
        />
        <div class="scoring__btns">
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="100"
            @click="score = $event.target.dataset.score"
          >
            100%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="75"
            @click="score = $event.target.dataset.score"
          >
            75%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="50"
            @click="score = $event.target.dataset.score"
          >
            50%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="25"
            @click="score = $event.target.dataset.score"
          >
            25%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="0"
            @click="score = $event.target.dataset.score"
          >
            0%
          </button>
        </div>
      </div>
    </div>
    <div class="taskcheck__info comment">
      <h3 class="comment__title">Комментарии</h3>
      <form action="" method="post" class="comment__form">
        <textarea
          class="comment__textarea"
          placeholder="Расскажите ученику о сильных и слабых сторонах..."
        ></textarea>
        <button class="comment__btn comment__btn_classic" type="submit">
          Добавить комментарий
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Миксин для маски иконки (используется во вложениях)
@mixin mask-icon($url, $size: 15px, $color: $color-text-white) {
  position: relative;
  
  &::before {
    width: $size;
    height: $size;
    content: '';
    mask-image: url($url);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    background-color: $color;
  }
}

// Блок навигации и заголовка
.taskcheck {
  &__back {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5em 0;
    margin-bottom: 20px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;

    // Стрелка назад
    &::before {
      width: 5px;
      height: 5px;
      content: '';
      border-bottom: 1px solid $color-text-black;
      border-left: 1px solid $color-text-black;
      transform: rotate(45deg);
    }
  }

  &__title {
    margin-bottom: $margin-bottom-title-desktop;
  }
}

// Блок с информацией о задании
.about {
  margin-bottom: 20px;
  padding: $padding-section;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__title {
    margin-bottom: $margin-bottom-title-desktop;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__list {
    margin-bottom: 20px;
  }

  &__item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__name {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-grey;
  }

  &__value {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__description {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;

    &.show {
      height: auto;
    }
  }

  &__btn {
    margin-bottom: 0;
    transition: margin-bottom 0.3s, background-color 0.3s;

    &.active {
      margin-bottom: 20px;
      background-color: $color-action-dark-blue;
    }
  }
}

// Блок с вложениями
.attachments {
  margin-bottom: $margin-card;
  padding: $padding-section;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__title {
    margin-bottom: $margin-bottom-title-desktop;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: $padding-item;
    border-radius: $radius-lg;
    background-color: $color-card-grey;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__type {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-grey;
  }

  &__name {
    flex-grow: 1;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-black; // Исправлена опечатка balck -> black
  }

  // Кнопки с использованием миксина
  &__btn {
    &_download {
      @include mask-icon('@/assets/media/icons/download.svg');
    }

    &_link {
      @include mask-icon('@/assets/media/icons/open.svg');
    }
  }
}

// Блок с оценкой
.scoring {
  margin-bottom: $margin-card;
  padding: $padding-section;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__title {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: $margin-bottom-title-desktop;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__score {
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__control {
    input {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

// Блок с комментарием
.comment {
  padding: $padding-section;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__title {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: $margin-bottom-title-desktop;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-sm;
    font-weight: 400;
    color: $color-text-black;
  }

  &__textarea {
    width: 100%;
    margin-bottom: 20px;
    padding: $padding-item;
    resize: none;
    outline: none;
    border: $border-blue;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 400;
    color: $color-text-black;
  }
}
</style>