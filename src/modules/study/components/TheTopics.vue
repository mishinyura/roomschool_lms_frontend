<template>
  <div :class="['topics__item', modClassName('topics__item')]">
    <div :class="['topics__info', modClassName('topics__info')]">
      <h4 class="topics__name topics__name_topic">
        {{ topic.title }}
      </h4>
      <span :class="['topics__status', modClassName('topics__status')]">
        {{
          topic.isBlock
            ? "Заблокировано"
            : topic.progress === topic.videos + topic.tests
            ? "Завершено"
            : "Текущая"
        }}
      </span>
      <span class="topics__amount-topics">
        Прогресс: {{ topic.progress }}/{{ topic.videos + topic.tests }}
      </span>
    </div>
    <div class="topics__control">
      <span class="topics__amount topics__amount_videos">
        {{ topic.videos }} видео
      </span>
      <span class="topics__amount topics__amount_tests">
        {{ amountTestsFormat(topic.tests) }}
      </span>
      <button
        :class="[
          'topics__btn topics__btn_classic',
          {
            topics__btn_current:
              !topic.isBlock && topic.progress !== topic.videos + topic.tests,
            topics__btn_end: topic.progress === topic.videos + topic.tests,
          },
        ]"
        v-if="!topic.isBlock"
        @click="openPlayer(topic.slug)"
      >
        {{
          topic.progress === topic.videos + topic.tests
            ? "Посмотреть"
            : "Продолжить"
        }}
      </button>
    </div>
  </div>
</template>

<script>
import { pluralize } from "@/utils/globalUtils.js";

export default {
  props: ["topic"],
  inject: ["programSlug", "moduleSlug"],
  provide() {
    return {
      topicSlug: this.topic.slug,
    };
  },
  data() {
    return {};
  },
  conmputed: {},
  methods: {
    amountTestsFormat(amount) {
      return pluralize(amount, "тест", "теста", "тестов");
    },
    amountTopicsFormat(amount) {
      return pluralize(amount, "тема", "темы", "тем");
    },
    openTopics(event) {
      const list = event.currentTarget.nextElementSibling; //Получает список с темами
      const fullHeight = list.scrollHeight; //Получаем высоту скролла списка с темами

      const isOpen = event.currentTarget.classList.toggle("open"); // Добавляем класс open и возвращаем статус head

      this.topicHeight = isOpen ? fullHeight : 0;

      this.$emit("update-module-height", fullHeight, isOpen);
    },
    openPlayer(slug) {
      this.$router.push({
        name: "player",
        params: {
          program: this.programSlug,
          module: this.moduleSlug,
          topic: slug,
          lesson: 1,
        },
      });
    },
    modClassName(prefix) {
      if (this.topic.isBlock) {
        return `${prefix}_block`;
      } else if (this.topic.progress === this.topic.videos + this.topic.tests) {
        return `${prefix}_end`;
      } else {
        return `${prefix}_current`;
      }
    },
  },
  components: {
    // ThePlayer
  },
};
</script>

<style>
/* Темы */
.topics {
  height: 0;
  overflow: hidden;
  padding: 0 0.5em;
  transition: height 0.2s ease;
}

.topics__item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-grey);
}

.topics__item_block {
  pointer-events: none;
  filter: opacity(0.5);
}

.topics__item::before {
  position: absolute;
  left: -8px;
  top: 0;
  bottom: 0;
  width: 20px;
  border-radius: var(--radius-lg);
  content: "";
}

.topics__item::after {
  position: absolute;
  left: -4px;
  top: 0;
  bottom: 0;
  width: 20px;
  border-radius: var(--radius-lg);
  content: "";
}

.topics__item::after {
  background-color: var(--color-bg-grey);
}

.topics__item_end::before {
  background-color: var(--color-label-dark-green);
}

.topics__item_current::before {
  background-color: var(--color-label-dark-blue);
}

.topics__item_block::before {
  background-color: rgb(189, 189, 189);
}

.topics__item:not(:last-child) {
  margin-bottom: var(--margin-item);
}

.topics__info {
  position: relative;
  user-select: none;
}

.topics__info::before {
  position: absolute;
  left: -30px;
  top: 30%;
  z-index: 2;
  width: 15px;
  height: 15px;
  border-radius: var(--radius-max);
  content: "";
}

.topics__info_current::before {
  background-color: var(--color-label-dark-blue);
}

.topics__info_end::before {
  border: 1px solid var(--color-label-dark-green);
}

.topics__info_block::before {
  border: 1px solid rgb(189, 189, 189);
}

.topics__info_end::after {
  position: absolute;
  left: -23px;
  top: 37%;
  bottom: 0;
  z-index: 2;
  width: 4px;
  height: 8px;
  border-bottom: 1px solid var(--color-label-dark-green);
  border-right: 1px solid var(--color-label-dark-green);
  content: "";
  transform: rotate(45deg);
}

.topics__name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.topics__name_topic::after {
  content: "Тема";
  display: inline-block;
  padding: 0.2em 0.5em;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-grey);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.topics__status {
  display: inline-block;
  margin-right: 10px;
  padding: 0.2em 0.5em;
  border-radius: var(--radius-max);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 300;
}

.topics__status_current {
  color: var(--color-text-white);
  background-color: var(--color-label-dark-blue);
}

.topics__status_end {
  color: var(--color-text-white);
  background-color: var(--color-label-dark-green);
}

.topics__status_block {
  color: var(--color-text-white);
  background-color: var(--color-label-dark-grey);
}

.topics__amount-topics {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 300;
}

.topics__amount {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 10px;
  padding: 0.2em 0.5em;
  user-select: none;
  border: var(--border-grey);
  border-radius: var(--radius-lg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 300;
}

.topics__amount::before {
  width: 10px;
  height: 10px;
  content: "";
  background-color: var(--color-icon-black);
}

.topics__amount_videos::before {
  mask: url("@/assets/media/icons/mini-play.svg") no-repeat center/contain;
}

.topics__amount_tests::before {
  mask: url("@/assets/media/icons/mini-test.svg") no-repeat center/contain;
}

.topics__btn_current {
  color: var(--color-text-white);
  background-color: var(--color-label-dark-blue);
}

.topics__btn_end {
  color: var(--color-text-white);
  background-color: var(--color-label-dark-green);
}
</style>