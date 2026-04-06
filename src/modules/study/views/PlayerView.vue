<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
// import topicData from "@/mocks/topic.json";
import topicList from "@/mocks/topics.json";
import TheLessons from "../components/TheLessons.vue";
import TheMaterials from "../components/TheMaterials.vue";
import TheLinks from "../components/TheLinks.vue";
// import PlayerSection from "../components/PlayerSection.vue";
import MentorSection from "../components/MentorSection.vue";

import { print } from "@/utils/globalUtils.js";

const route = useRoute();
const topics = topicList;
const programSlug = route.params.program;
const moduleSlug = route.params.module;
const topicSlug = route.params.topic;
print("programSlug", programSlug, moduleSlug, topicSlug);

const getTopic = computed(() => {
  return topics.find((topic) => topic.slug === topicSlug);
});

const autoResizeTextarea = (event) => {
  event.currentTarget.style.height = "auto";
  event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
};

const sendReview = () => {
  getTopic.value.feedback.isSubmitted = true;
};

const inputRating = (event) => {
  getTopic.value.feedback.currentRating = event.target.dataset.score;
};
</script>

<template>
  <div class="main__container">
    <div class="main__bullet breadcrumbs">
      <button
        class="breadcrumbs__btn"
        @click="this.$router.push({ name: 'study' })"
      >
        Назад
      </button>
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">{{ programTitle }}</li>
        <li class="breadcrumbs__item">{{ moduleTitle }}</li>
      </ul>
    </div>

    <div class="main__progress progressbar">
      <h3 class="progressbar__title">Прогресс по теме</h3>
      <span class="progressbar__count">
        {{ getTopic.progress.completed }}/{{ getTopic.progress.total }}
      </span>
      <span class="progressbar__progress"></span>
    </div>

    <div class="main__window">
      <!-- <PlayerSection :typeView="'lesson'" :data="getTopic.current" /> -->
      <MentorSection />

      <div class="playbar">
        <TheLessons class="playbar__row" :lessons="getTopic.lessons" />
        <TheMaterials
          class="playbar__row"
          :materials="getTopic.attachments.materials"
        />
        <TheLinks class="playbar__row" :links="getTopic.attachments.links" />

        <div class="playbar__row test">
          <span class="test__title"> Проверка знаний </span>
          <div class="test__result" v-if="getTopic.quiz.userResult.isCompleted">
            <span class="test__status"> Тестирование завершено </span>
            <span class="test__score">
              Оценка: {{ getTopic.quiz.userResult.score }}
            </span>
            <button
              class="test__btn test__btn_repeat test__btn_mini"
              tabindex="0"
            >
              Повторить
            </button>
          </div>
          <div class="test__content" v-else>
            <span class="test__amount"> 10 вопросов </span>
            <p class="test__description">
              Проверьте свои знания по теме: "{{ getTopic.current.title }}"
            </p>
            <button
              class="test__btn test__btn_start test__btn_mini"
              tabindex="0"
            >
              Пройти тест
            </button>
          </div>
        </div>
        <div class="playbar__row callback">
          <span class="callback__title"> Оцените урок </span>
          <form action="" method="post" @submit.prevent="sendReview">
            <div class="callback__stars">
              <button
                :class="[
                  'callback__star',
                  {
                    callback__star_filled:
                      getTopic.feedback.isSubmitted &&
                      index <= getTopic.feedback.currentRating,
                  },
                ]"
                type="button"
                :data-score="index"
                tabindex="0"
                v-for="index in 5"
                :key="index"
                @click="inputRating"
              ></button>
            </div>
            <textarea
              class="callback__textarea"
              placeholder="Комментарий (Не обязательно)"
              tabindex="0"
              @input="autoResizeTextarea"
            ></textarea>
            <button class="callback__btn" data-submit="false" tabindex="0">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progressbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 1em;
  margin-bottom: 20px;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    &::before {
      width: 15px;
      height: 15px;
      content: "";
      mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
      background-color: $color-icon-blue;
    }
  }

  &__count {
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;
  }

  &__progress {
    display: block;
    flex-basis: 100%;
    height: 8px;
    border-radius: $radius-max;
    background: linear-gradient(
      90deg,
      rgba(10, 166, 215, 1) 59%,
      rgba(222, 246, 255, 1) 59%
    );
  }
}

// --- Video Player Section ---
.main__window {
  display: grid;
  grid-template-columns: 1fr 23em;
  gap: $margin-item;
  transition: grid-template-columns 0.3s ease;
}

// --- Right Sidebar Sections ---
.playbar__row {
  height: fit-content;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &:not(:last-child) {
    margin-bottom: $margin-item;
  }
}

// --- Test Section ---
.test {
  padding: 1em;

  &__title {
    @include player-title("@/assets/media/icons/tests.svg");
  }

  &__result {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    padding: 0.5em 1em;
    margin-bottom: 10px;
    border-radius: $radius-lg;
    background-color: $color-label-light-green;
  }

  &__status,
  &__score {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
    color: $color-text-green;
  }

  &__status {
    flex-basis: 100%;
  }

  &__btn {
    @include btn-blue-small;

    &_repeat {
      color: $color-text-black;
      background-color: $color-btn-grey;

      &:hover,
      &:focus-visible {
        color: $color-text-white;
        background-color: $color-action-dark-grey;
      }

      &:active {
        color: $color-action-white;
        background-color: $color-action-dark-grey;
      }
    }
  }

  &__amount {
    display: inline-block;
    padding: 0.2em 0.4em;
    margin-bottom: 10px;
    border: $border-blue;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
  }

  &__description {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    color: $color-text-grey;
  }
}

// --- Callback Section ---
.callback {
  padding: 1em;

  &__title {
    @include player-title("@/assets/media/icons/tests.svg");
    // Note: mask shorthand was used in CSS, replaced with mixin logic
  }

  &__stars {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 20px;
  }

  &__star {
    position: relative;
    width: 25px;
    height: 25px;
    transition: transform 0.2s ease;

    &::before,
    &::after {
      display: inline-block;
      width: 100%;
      height: 100%;
      content: "";
      mask: url("@/assets/media/icons/star-callback.svg") no-repeat
        center/contain;
      background-color: $color-icon-blue;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
    }

    &_filled::after {
      mask: url("@/assets/media/icons/star-callback-full.svg") no-repeat
        center/contain;
    }

    &:hover,
    &:focus-visible {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(1.2);
      background-color: $color-icon-blue;
    }
  }

  &__textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: 60px;
    padding: 0.5em;
    margin-bottom: 10px;
    overflow: hidden;
    resize: none;
    border: none;
    border-radius: $radius-sm;
    outline: $border-blue; // Using variable for outline-color if applicable, or fallback
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    transition: outline-color 0.1s ease;

    &::placeholder {
      color: $color-text-blue;
    }

    &:hover,
    &:focus-visible {
      outline-color: $color-btn-dark-blue;
    }
  }

  &__btn {
    padding: 0.5em 1em;
    border-radius: $radius-max;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    color: $color-text-black;
    background-color: $color-btn-blue;
    transition: background-color 0.1s ease, color 0.1s ease;

    &:hover,
    &:focus-visible {
      color: $color-text-white;
      background-color: $color-action-blue;
    }

    &:active {
      color: $color-text-white;
      background-color: $color-action-dark-blue;
    }
  }
}
</style>