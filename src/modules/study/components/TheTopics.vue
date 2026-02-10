<template>
  <div :class="['topic', modClassName('topic')]">
    <div :class="['topic__info', modClassName('topic__info')]">
      <h4 class="topic__name topic__name_topic">
        {{ topic.title }}
      </h4>
      <span :class="['topic__status', modClassName('topic__status')]">
        {{
          topic.isBlock
            ? "Заблокировано"
            : topic.progress === topic.videos + topic.tests
            ? "Завершено"
            : "Текущая"
        }}
      </span>
      <span class="topic__amount-topic">
        Прогресс: {{ topic.progress }}/{{ topic.videos + topic.tests }}
      </span>
    </div>
    <div class="topic__control">
      <span class="topic__amount topic__amount_videos">
        {{ topic.videos }} видео
      </span>
      <span class="topic__amount topic__amount_tests">
        {{ amountTestsFormat(topic.tests) }}
      </span>
      <button
        :class="[
          'topic__btn topic__btn_classic',
          {
            topic__btn_current:
              !topic.isBlock && topic.progress !== topic.videos + topic.tests,
            topic__btn_end: topic.progress === topic.videos + topic.tests,
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

<style lang="scss" scoped>
.topic {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  border-radius: $radius-lg;
  background-color: $color-bg-grey;

  &:not(:last-child) {
    margin-bottom: $margin-item;
  }

  // Состояние блокировки
  &_block {
    pointer-events: none;
    filter: opacity(0.5);

    &::before {
      background-color: rgb(189, 189, 189);
    }
  }

  // Декоративные полосы слева
  &::before,
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    content: "";
    border-radius: $radius-lg;
  }

  // Цветная полоса (индикатор)
  &::before {
    left: -8px;
    width: 20px;
  }

  // Маска/Фон, перекрывающая часть индикатора
  &::after {
    left: -4px;
    width: 20px;
    background-color: $color-bg-grey;
  }

  // Цвета индикаторов в зависимости от статуса
  &_end::before {
    background-color: $color-label-dark-green;
  }

  &_current::before {
    background-color: $color-label-dark-blue;
  }

  &__info {
    position: relative;
    user-select: none;

    // Кружок чекбокса
    &::before {
      position: absolute;
      top: 30%;
      left: -30px;
      z-index: 2;
      width: 15px;
      height: 15px;
      content: "";
      border-radius: $radius-max;
    }

    &_current::before {
      background-color: $color-label-dark-blue;
    }

    &_end {
      &::before {
        border: 1px solid $color-label-dark-green;
      }

      // Галочка (только для завершенных)
      &::after {
        position: absolute;
        top: 37%;
        bottom: 0;
        left: -23px;
        z-index: 2;
        width: 4px;
        height: 8px;
        content: "";
        border-bottom: 1px solid $color-label-dark-green;
        border-right: 1px solid $color-label-dark-green;
        transform: rotate(45deg);
      }
    }

    &_block::before {
      border: 1px solid rgb(189, 189, 189);
    }
  }

  &__name {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    &_topic::after {
      display: inline-block;
      padding: 0.2em 0.5em;
      border-radius: $radius-lg;
      background-color: $color-label-grey;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-xs;
      font-weight: 400;
      content: "Тема";
    }
  }

  &__status {
    display: inline-block;
    margin-right: 10px;
    padding: 0.2em 0.5em;
    border-radius: $radius-max;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 300;

    &_current {
      color: $color-text-white;
      background-color: $color-label-dark-blue;
    }

    &_end {
      color: $color-text-white;
      background-color: $color-label-dark-green;
    }

    &_block {
      color: $color-text-white;
      background-color: $color-label-dark-grey;
    }
  }

  &__amount-topics {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 300;
  }

  &__amount {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-right: 10px;
    padding: 0.2em 0.5em;
    user-select: none;
    border: $border-grey;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 300;

    &::before {
      width: 10px;
      height: 10px;
      content: "";
      background-color: $color-icon-black;
    }

    &_videos::before {
      mask: url("@/assets/media/icons/mini-play.svg") no-repeat center/contain;
    }

    &_tests::before {
      mask: url("@/assets/media/icons/mini-test.svg") no-repeat center/contain;
    }
  }

  &__btn {
    @include btn-classic;
    &_current {
      color: $color-text-white;
      background-color: $color-label-dark-blue;
    }

    &_end {
      color: $color-text-white;
      background-color: $color-label-dark-green;
    }
  }
}
</style>