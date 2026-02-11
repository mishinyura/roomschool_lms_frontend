<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
// import topicData from "@/mocks/topic.json";
import topicList from "@/mocks/topics.json";
import TheLesson from "../components/TheLesson.vue";
import TheMaterial from "../components/TheMaterial.vue";
import TheLink from "../components/TheLink.vue";

import { print } from "@/utils/globalUtils.js";

let isActivePlayer = ref(false);

const route = useRoute();
const topics = topicList;
const programSlug = route.params.program;
const moduleSlug = route.params.module;
const topicSlug = route.params.topic;
print("programSlug", programSlug, moduleSlug, topicSlug);


const getTopic = computed(() => {
  return topics.find((topic) => topic.slug === topicSlug);
});





// const openLesson = (id) => {
//   router.push({
//     name: "player",
//     params: {
//       program: 'programSlug',
//       module: 'moduleSlug',
//       topic: topicSlug,
//       lesson: id,
//     },
//   });
// };

const handlePlay = (event) => {
  isActivePlayer.value = true;
  const videoElement = event.target;

  console.log("Видео запущено!");
  
  console.log("Текущее время:", videoElement.currentTime);
  console.log("Длительность:", videoElement.duration);
};

// Обработка паузы (опционально)
const handlePause = () => {
  console.log("Видео на паузе");
};

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
  <section class="main__section">
    <div class="main__bullet breadcrumbs">
      <button
        class="breadcrumbs__btn"
        @click="this.$router.push({ name: 'study' })"
      >
        Назад
      </button>
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">{{programTitle}}</li>
        <li class="breadcrumbs__item">{{moduleTitle}}</li>
      </ul>
    </div>
    <div class="main__progress progressbar">
      <h3 class="progressbar__title">Прогресс по теме</h3>
      <span class="progressbar__count">
        {{ getTopic.progress.completed }}/{{ getTopic.progress.total }}
      </span>
      <span class="progressbar__progress"></span>
    </div>
    <div class="main__main player">
      <div class="player__content">
        <div :class="['player__video', isActivePlayer ? 'play' : '']">
          <video
            controls
            poster="@/assets/media/poster.png"
            @play="handlePlay"
            @pause="handlePause"
          >
            <source src="@/assets/media/video.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
        <div class="player__info">
          <div class="player__head">
            <h2 class="player__title">{{ getTopic.current.title }}</h2>
            <span class="player__status"> Завершено </span>
          </div>
          <div
            class="player__description description_md"
            v-html="getTopic.current.description"
          ></div>
        </div>
        <div class="player__btns">
          <button
            class="player__btn player__btn_prev"
            @click="openLesson(getTopic.current.navigation.prev)"
          >
            Предыдущий
          </button>
          <button
            class="player__btn player__btn_next"
            @click="openLesson(getTopic.current.navigation.next)"
          >
            Следующий
          </button>
        </div>
      </div>
      <div class="player__bar playbar">
        <div class="playbar__row lessons" v-if="getTopic.lessons.length > 0">
          <span class="lessons__title"> Уроки темы </span>
          <ul class="lessons__list">
            <TheLesson
              v-for="(lesson, index) in getTopic.lessons"
              :key="index"
              :lesson="lesson"
              @click="openLesson(lesson.id)"
            />
          </ul>
        </div>
        <div
          class="playbar__row materials"
          v-if="getTopic.attachments.materials.length > 0"
        >
          <span class="materials__title"> Материалы </span>
          <ul class="materials__list">
            <TheMaterial
              v-for="(material, index) in getTopic.attachments.materials"
              :key="index"
              :material="material"
            />
          </ul>
        </div>
        <div
          class="playbar__row links"
          v-if="getTopic.attachments.links.length > 0"
        >
          <span class="links__title"> Полезные ссылки </span>
          <ul class="links__list">
            <TheLink
              v-for="(link, index) in getTopic.attachments.links"
              :key="index"
              :link="link"
            />
          </ul>
        </div>
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
  </section>
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
.player {
  display: grid;
  grid-template-columns: 1fr 23em;
  gap: $margin-item;
  transition: grid-template-columns 0.3s ease;

  &__content {
    height: fit-content;
    border-radius: $radius-lg;
    background-color: $color-section-white;
  }

  &__video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: $radius-lg;
    box-shadow: $shadow-classic;

    &::before {
      position: absolute;
      inset: 0;
      pointer-events: none;
      content: "";
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
      );
    }

    &.play::before {
      background: none
    }

    video {
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      object-fit: cover;
    }
  }

  &__info {
    padding: 0 2em;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5em 0;
    border-bottom: $border-grey;
  }

  &__title {
    font-family: $font-family-montserrat;
    font-size: $font-size-title-md;
    font-weight: 500;
  }

  &__status {
    padding: 0.5em 1.5em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;
    color: $color-text-white;
    background-color: $color-label-dark-green;
  }

  &__description {
    padding: 2em 0;
    border-bottom: $border-grey;
    font-weight: 400;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 1.5em 0;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.5em 2em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    // Previous Button
    &_prev {
      color: $color-text-black;
      border: $border-blue;
      background-color: $color-btn-blue;

      &::before {
        display: inline-block;
        width: 5px;
        height: 5px;
        content: "";
        border-bottom: 1px solid $color-text-black;
        border-left: 1px solid $color-text-black;
        transform: rotate(45deg);
        transition: transform 0.2s ease;
      }

      &:hover,
      &:focus-visible {
        &::before {
          transform: rotate(45deg) translate(-10px, 10px);
        }
      }

      &:active::before {
        transform: rotate(45deg) translate(-10px, 10px) scale(0.8);
      }
    }

    // Next Button
    &_next {
      color: $color-text-white;
      background-color: $color-btn-dark-blue;

      &::after {
        display: inline-block;
        width: 5px;
        height: 5px;
        content: "";
        border-bottom: 1px solid $color-text-white;
        border-right: 1px solid $color-text-white;
        transform: rotate(-45deg);
        transition: transform 0.2s ease;
      }

      &:hover,
      &:focus-visible {
        &::after {
          transform: rotate(-45deg) translate(10px, 10px);
        }
      }

      &:active::after {
        transform: rotate(-45deg) translate(10px, 10px) scale(0.8);
      }
    }
  }
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

.lessons__title {
  @include player-title("@/assets/media/icons/study_topic.svg");
  padding: 1em;
  margin-bottom: 0;
}

.materials {
  padding: 1em;

  &__title {
    @include player-title("@/assets/media/icons/tests.svg");
  }
}

.links {
  padding: 1em;

  &__title {
    @include player-title("@/assets/media/icons/tests.svg");
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