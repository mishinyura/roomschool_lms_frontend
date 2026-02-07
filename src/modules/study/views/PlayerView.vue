<template>
  <div class="main__container">
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
          {{ topic.progress.completed }}/{{ topic.progress.total }}
        </span>
        <span class="progressbar__progress"></span>
      </div>
      <div class="main__main player">
        <div class="player__content">
          <div class="player__video">
            <video controls poster="@/assets/media/poster.png">
              <source src="@/assets/media/video.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
          <div class="player__info">
            <div class="player__head">
              <h2 class="player__title">{{ topic.current.title }}</h2>
              <span class="player__status"> Завершено </span>
            </div>
            <div
              class="player__description description_md"
              v-html="topic.current.description"
            ></div>
          </div>
          <div class="player__btns">
            <button class="player__btn player__btn_prev" @click="openLesson(topic.current.navigation.prev)">Предыдущий</button>
            <button class="player__btn player__btn_next" @click="openLesson(topic.current.navigation.next)">Следующий</button>
          </div>
        </div>
        <div class="player__bar playbar">
          <div class="playbar__row lessons">
            <span class="lessons__title"> Уроки темы </span>
            <ul class="lessons__list">
              <TheLesson
                v-for="(lesson, index) in topic.lessons"
                :key="index"
                :lesson="lesson"
                @click="openLesson(lesson.id)"
              />
            </ul>
          </div>
          <div
            class="playbar__row materials"
            v-if="topic.attachments.materials.length > 0"
          >
            <span class="materials__title"> Материалы </span>
            <ul class="materials__list">
              <TheMaterial
                v-for="(material, index) in topic.attachments.materials"
                :key="index"
                :material="material"
              />
            </ul>
          </div>
          <div
            class="playbar__row links"
            v-if="topic.attachments.links.length > 0"
          >
            <span class="links__title"> Полезные ссылки </span>
            <ul class="links__list">
              <TheLink
                v-for="(link, index) in topic.attachments.links"
                :key="index"
                :link="link"
              />
            </ul>
          </div>
          <div class="playbar__row test">
            <span class="test__title"> Проверка знаний </span>
            <div class="test__result" v-if="topic.quiz.userResult.isCompleted">
              <span class="test__status"> Тестирование завершено </span>
              <span class="test__score">
                Оценка: {{ topic.quiz.userResult.score }}
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
                Проверьте свои знания по теме: "{{ topic.current.title }}"
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
                        topic.feedback.isSubmitted &&
                        index <= topic.feedback.currentRating,
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
  </div>
</template>


<script>
import topicData from "@/mocks/topic.json";
import TheLesson from "../components/TheLesson.vue";
import TheMaterial from "../components/TheMaterial.vue";
import TheLink from "../components/TheLink.vue";

export default {
  inject: ["programSlug", "moduleSlug", "topicSlug", "programTitle", "moduleTitle"],
  data() {
    return {
      topic: topicData,
      // programTitle: this.programTitle,
    };
  },
  methods: {
    openLesson(id) {
      this.$router.push({
        name: "player",
        params: {
          program: this.programSlug,
          module: this.moduleSlug,
          topic: this.topicSlug,
          lesson: id,
        },
      });
    },
    autoResizeTextarea(event) {
      event.currentTarget.style.height = "auto";
      event.currentTarget.style.height =
        event.currentTarget.scrollHeight + "px";
    },
    sendReview() {
      this.topic.feedback.isSubmitted = true;
    },
    inputRating(event) {
      this.topic.feedback.currentRating = event.target.dataset.score;
    },
  },
  components: {
    TheLesson,
    TheMaterial,
    TheLink,
  },
};
</script>

<style>
.progressbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 1em;
  margin-bottom: 20px;
  border-radius: var(--radius-lg);
  background-color: var(--color-section-white);
}

.progressbar__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.progressbar__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/my-courses.svg") no-repeat center/contain;
  background-color: var(--color-icon-blue);
}

.progressbar__count {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.progressbar__progress {
  flex-basis: 100%;
  display: block;
  height: 8px;
  border-radius: var(--radius-max);
  background: linear-gradient(
    90deg,
    rgba(10, 166, 215, 1) 59%,
    rgba(222, 246, 255, 1) 59%
  );
}

.player {
  display: grid;
  grid-template-columns: 1fr 23em;
  gap: var(--margin-item);
  transition: grid-template-columns 0.3s ease;
}
/* Левая секция с плеером */
.player__content {
  height: fit-content;
  border-radius: var(--radius-lg);
  background-color: var(--color-section-white);
}

.player__video {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-classic);
  background-color: var(--color-section-black);
}

.player__video::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  pointer-events: none;
}

.player__video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  outline: none;
  display: block;
}

.player__info {
  padding: 0 2em;
}

.player__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em 0;
  border-bottom: var(--border-grey);
}

.player__title {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-md);
  font-weight: 500;
}

.player__status {
  padding: 0.5em 1.5em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
  background-color: var(--color-label-dark-green);
  color: var(--color-text-white);
}

.player__description {
  padding: 2em 0;
  border-bottom: var(--border-grey);
  font-weight: 400;
}

.player__btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 1.5em 0;
}

.player__btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5em 2em;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.player__btn_prev::before {
  display: inline-block;
  width: 5px;
  height: 5px;
  content: "";
  border-bottom: 1px solid var(--color-text-black);
  border-left: 1px solid var(--color-text-black);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}
.player__btn_prev:hover::before {
  transform: rotate(45deg) translate(-10px, 10px);
}
.player__btn_prev:focus-visible::before {
  transform: rotate(45deg) translate(-10px, 10px);
}
.player__btn_prev:active::before {
  transform: rotate(45deg) translate(-10px, 10px) scale(0.8);
}
.player__btn_prev {
  border: var(--border-blue);
  background-color: var(--color-btn-blue);
  color: var(--color-text-black);
}

.player__btn_next {
  background-color: var(--color-btn-dark-blue);
  color: var(--color-text-white);
}
.player__btn_next::after {
  display: inline-block;
  width: 5px;
  height: 5px;
  content: "";
  border-bottom: 1px solid var(--color-text-white);
  border-right: 1px solid var(--color-text-white);
  transform: rotate(-45deg);
  transition: transform 0.2s ease;
}
.player__btn_next:hover::after {
  transform: rotate(-45deg) translate(10px, 10px);
}
.player__btn_next:focus-visible::after {
  transform: rotate(-45deg) translate(10px, 10px);
}
.player__btn_next:active::after {
  transform: rotate(-45deg) translate(10px, 10px) scale(0.8);
}

/* правая секция с информацией */
.playbar__row {
  height: fit-content;
  border-radius: var(--radius-lg);
  background-color: var(--color-section-white);
}

.playbar__row:not(:last-child) {
  margin-bottom: var(--margin-item);
}

/* Список уроков */
.lessons__title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1em;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-sm);
  font-weight: 600;
}

.lessons__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask-image: url("@/assets/media/icons/study_topic.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
}

/* Список материалов */
.materials {
  padding: 1em;
}

.materials__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-sm);
  font-weight: 600;
}

.materials__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask-image: url("@/assets/media/icons/tests.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
}

/* Список ссылками */
.links {
  padding: 1em;
}

.links__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-sm);
  font-weight: 600;
}

.links__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask-image: url("@/assets/media/icons/tests.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
}

/* Блок с тестированием */
.test {
  padding: 1em;
}

.test__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-sm);
  font-weight: 600;
}

.test__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask-image: url("@/assets/media/icons/tests.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
}

.test__result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0.5em 1em;
  margin-bottom: 10px;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-light-green);
}

.test__status {
  flex-basis: 100%;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  color: var(--color-text-green);
}

.test__score {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
  color: var(--color-text-green);
}

.test__btn {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-min);
  font-weight: 500;
}

.test__btn_repeat {
  background-color: var(--color-btn-grey);
  color: var(--color-text-black);
}
.test__btn_repeat:hover {
  background-color: var(--color-action-dark-grey);
  color: var(--color-text-white);
}
.test__btn_repeat:focus-visible {
  background-color: var(--color-action-dark-grey);
  color: var(--color-text-white);
}
.test__btn_repeat:active {
  background-color: var(--color-action-dark-grey);
  color: var(--color-action-white);
}
.test__amount {
  display: inline-block;
  padding: 0.2em 0.4em;
  margin-bottom: 10px;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
}

.test__description {
  margin-bottom: 10px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}

/* Блок с тестированием */
.callback {
  padding: 1em;
}

.callback__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-sm);
  font-weight: 600;
}

.callback__title::before {
  content: "";
  width: 15px;
  height: 15px;
  mask: url("@/assets/media/icons/tests.svg") no-repeat center/contain;
  background-color: var(--color-icon-blue);
}

.callback__stars {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 20px;
}

.callback__star {
  position: relative;
  width: 25px;
  height: 25px;
  transition: transform 0.2s ease;
}
.callback__star:hover {
  transform: scale(1.2);
}
.callback__star:focus-visible {
  transform: scale(1.2);
}
.callback__star:active {
  transform: scale(1.2);
  background-color: var(--color-icon-blue);
}
.callback__star::before {
  display: inline-block;
  content: "";
  width: 100%;
  height: 100%;
  mask: url("@/assets/media/icons/star-callback.svg") no-repeat center/contain;
  background-color: var(--color-icon-blue);
}
.callback__star::after {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  content: "";
  width: 100%;
  height: 100%;
  mask: url("@/assets/media/icons/star-callback.svg") no-repeat center/contain;
  background-color: var(--color-icon-blue);
}
.callback__star_filled::after {
  mask: url("@/assets/media/icons/star-callback-full.svg") no-repeat
    center/contain;
  background-color: var(--color-icon-blue);
}
.callback__textarea {
  display: block;
  width: 100%;
  min-height: 60px;
  margin-bottom: 10px;
  padding: 0.5em;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  outline: var(--border-blue);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  transition: outline-color 0.1s ease;
}
.callback__textarea::placeholder {
  color: var(--color-text-blue);
}
.callback__textarea:hover {
  outline-color: var(--color-btn-dark-blue);
}
.callback__textarea:focus-visible {
  outline-color: var(--color-btn-dark-blue);
}
.callback__btn {
  padding: 0.5em 1em;
  border-radius: var(--radius-max);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  background-color: var(--color-btn-blue);
  color: var(--color-text-black);
  transition: background-color 0.1s ease, color 0.1s ease;
}
.callback__btn:hover {
  background-color: var(--color-action-blue);
  color: var(--color-text-white);
}
.callback__btn:focus-visible {
  background-color: var(--color-action-blue);
  color: var(--color-text-white);
}
.callback__btn:active {
  background-color: var(--color-action-dark-blue);
  color: var(--color-text-white);
}

@media screen {
}
</style>