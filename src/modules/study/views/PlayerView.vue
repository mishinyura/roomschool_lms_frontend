<script setup>
import { ref, watch, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheLessons from "../components/TheLessons.vue";
import TheMaterials from "../components/TheMaterials.vue";
import TheLinks from "../components/TheLinks.vue";
import PlayerSection from "../components/PlayerSection.vue";
import MentorSection from "../components/MentorSection.vue";
import { educationApi } from "@/api/educationApi.js";

const isPractice = ref(false);

const route = useRoute();
const router = useRouter();

const playbar = ref(null);
const currentLesson = ref(null);

provide("currentLesson", currentLesson);

const isPlaybarLoading = ref(false);
const isLessonLoading = ref(false);

const playbarError = ref(null);
const lessonError = ref(null);

const setLessonMode = (lesson) => {
  isPractice.value = lesson?.type === "aimentor";
};

const loadPlaybar = async (topicSlug) => {
  if (!topicSlug) return;

  try {
    isPlaybarLoading.value = true;
    playbarError.value = null;

    const playbarData = await educationApi.getTopicPlaybar(topicSlug);
    playbar.value = playbarData;

    if (!route.params.lesson && playbarData?.lessons?.length) {
      const fallbackLessonSlug =
        playbarData.lessons.find((lesson) => lesson.isCurrent)?.slug ||
        playbarData.lessons[0]?.slug;

      if (fallbackLessonSlug) {
        await router.replace({
          name: "player",
          params: {
            ...route.params,
            lesson: fallbackLessonSlug,
          },
        });
      }
    }
  } catch (error) {
    playbarError.value = error;
    console.error(error);
  } finally {
    isPlaybarLoading.value = false;
  }
};

const loadLesson = async (lessonSlug) => {
  if (!lessonSlug) return;

  try {
    isLessonLoading.value = true;
    lessonError.value = null;

    const lessonData = await educationApi.getLesson(lessonSlug);
    currentLesson.value = lessonData;
    setLessonMode(lessonData);
  } catch (error) {
    lessonError.value = error;
    console.error(error);
  } finally {
    isLessonLoading.value = false;
  }
};

watch(
  () => route.params.topic,
  async (newTopicSlug) => {
    currentLesson.value = null;
    await loadPlaybar(newTopicSlug);
  },
  { immediate: true }
);

watch(
  () => route.params.lesson,
  async (newLessonSlug) => {
    await loadLesson(newLessonSlug);
  },
  { immediate: true }
);

const handleSelectLesson = async (lesson) => {
  await router.push({
    name: "player",
    params: {
      program: route.params.program,
      module: route.params.module,
      topic: route.params.topic,
      lesson: lesson.slug,
    },
  });
};

const autoResizeTextarea = (event) => {
  event.currentTarget.style.height = "auto";
  event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
};

const sendReview = () => {
  currentLesson.value.feedback.isSubmitted = true;
};

const inputRating = (event) => {
  currentLesson.value.feedback.currentRating = event.target.dataset.score;
};
</script>

<template>
  <div class="main__container">
    <button class="main__btn" @click="router.back()">Назад</button>

    <div class="main__progress progressbar">
      <h3 class="progressbar__title">Прогресс по теме</h3>
      <span class="progressbar__count" v-if="currentLesson">
        {{ currentLesson.progress.completed }}/{{ currentLesson.progress.total }}
      </span>
      <span class="progressbar__progress"></span>
    </div>

    <div class="main__window">
      <PlayerSection v-if="!isPractice" :data="currentLesson" />

      <MentorSection v-else :lesson="currentLesson" />

      <div class="playbar">
        <TheLessons
          class="playbar__row"
          :lessons="playbar.lessons"
          @selectLesson="handleSelectLesson"
          v-if="playbar"
        />
        <TheMaterials
          class="playbar__row"
          :materials="playbar.attachments.materials"
          v-if="playbar"
        />
        <TheLinks
          class="playbar__row"
          :links="playbar.attachments.links"
          v-if="playbar"
        />

        <div class="playbar__row test" v-if="playbar">
          <span class="test__title"> Проверка знаний </span>
          <div class="test__result" v-if="playbar.quiz.userResult.isCompleted">
            <span class="test__status"> Тестирование завершено </span>
            <span class="test__score">
              Оценка: {{ playbar.quiz.userResult.score }}
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
              Проверьте свои знания по теме: "{{ currentLesson?.title }}"
            </p>
            <button class="test__btn test__btn_start test__btn_mini" tabindex="0">
              Пройти тест
            </button>
          </div>
        </div>
        <div class="playbar__row callback" v-if="playbar">
          <span class="callback__title"> Оцените урок </span>
          <form action="" method="post" @submit.prevent="sendReview">
            <div class="callback__stars">
              <button
                :class="[
                  'callback__star',
                  {
                    callback__star_filled:
                      playbar.feedback.isSubmitted &&
                      index <= playbar.feedback.currentRating,
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
.main {
  &__btn {
    @include btn-blue-small;
    margin-bottom: 10px;
  }
}
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
</style>
