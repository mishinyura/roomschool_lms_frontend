<script setup>
import { defineProps, ref } from "vue";
// import { useRoute } from "vue-router";
// import { educationApi } from "@/api/educationApi.js";

let isActivePlayer = ref(false);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// const videoUrl = `${process.env.BASE_URL}media/` + props.data.video.src;
const videoUrl = `/media/`;

console.log("videoUrl", videoUrl);

const handlePlay = (event) => {
  isActivePlayer.value = true;
  const videoElement = event.target;

  console.log("Видео запущено!");

  console.log("Текущее время:", videoElement.currentTime);
  console.log("Длительность:", videoElement.duration);
};

const handlePause = () => {
  console.log("Видео на паузе");
};
</script>

<template>
  <section class="player">
    <div :class="['player__video', isActivePlayer ? 'play' : '']">
      <video
        controls
        poster="@/assets/media/poster.png"
        @play="handlePlay"
        @pause="handlePause"
      >
        <source :src="videoUrl" :type="props.data.video.mimeType" v-if="props.data"/>
        Ваш браузер не поддерживает видео.
      </video>
    </div>
    <div class="player__info">
      <div class="player__head">
        <h2 class="player__title">{{ props.data?.title }}</h2>
        <span class="player__status"> Завершено </span>
      </div>
      <div
        class="player__description description_md"
        v-html="props.data?.description"
      ></div>
    </div>
    <div class="player__btns">
      <button
        class="player__btn player__btn_prev"
        @click="openLesson(props.navigation.prev)"
      >
        Предыдущий
      </button>
      <button
        class="player__btn player__btn_next"
        @click="openLesson(props.navigation.next)"
      >
        Следующий
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.player {
  height: fit-content;
  border-radius: $radius-lg;
  background-color: $color-section-white;

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
      display: none;
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
</style>