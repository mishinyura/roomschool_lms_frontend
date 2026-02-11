<template>
  <div class="module">
    <div class="module__head" @click="openTopics">
      <div class="module__info">
        <h4 class="module__name module__name_module">{{ module.title }}</h4>
        <span class="module__amount-topics">
          {{ amountTopicsFormat(props.module.topics.length) }}
        </span>
      </div>
      <div class="module__control">
        <span class="module__amount-videos"> 4/6 </span>
        <span class="module__progress" :style="{ background: progress }"></span>
      </div>
    </div>

    <div class="module__list" :style="{ height: topicHeight + 'px' }">
      <TheTopics
        v-for="(topic, index) in props.module.topics"
        :key="index"
        :topic="topic"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, provide, computed, ref } from "vue";
import { pluralize } from "@/utils/globalUtils.js";
import TheTopics from "./TheTopics.vue";

const props = defineProps({
  module: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-module-height"]);

let topicHeight = ref(0);

provide('moduleContext', {
  moduleSlug: props.module.slug,
  moduleTitle: props.module.title,
});

const progress = computed(() => {
  const percent = (props.module.completed / props.module.total) * 100;
  return `linear-gradient(90deg, rgba(10,166,215,1) ${percent}%, rgba(222,246,255,1) ${percent}%)`;
});

const amountTopicsFormat = (amount) => {
  return pluralize(amount, "тема", "темы", "тем");
};

const openTopics = (event) => {
  const list = event.currentTarget.nextElementSibling;
  const fullHeight = list.scrollHeight;

  const isOpen = event.currentTarget.classList.toggle("open");

  topicHeight.value = isOpen ? fullHeight : 0;

  emit("update-module-height", fullHeight, isOpen);
};
</script>

<style lang="scss" scoped>
.module {
  margin-bottom: $margin-item;
  padding: 1em;
  border: $border-blue;
  border-radius: $radius-lg;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    cursor: $cursor-point;
    transition: margin-bottom 0.2s ease;

    &.open {
      margin-bottom: 1em;

      .modules__control::after {
        transform: rotate(45deg);
      }
    }
  }

  &__info {
    user-select: none;
  }

  &__name {
    @include title;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;

    &_module::after {
      display: inline-block;
      padding: 0.2em 0.5em;
      border-radius: $radius-lg;
      background-color: $color-label-orange;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-xs;
      font-weight: 400;
      content: "Модуль";
    }
  }

  &__amount-topics {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    color: $color-text-grey;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;

    &::after {
      width: 10px;
      height: 10px;
      border-bottom: 1px solid grey;
      border-right: 1px solid grey;
      transform: rotate(225deg);
      transition: transform 0.2s ease;
      content: "";
    }
  }

  &__amount-videos {
    display: inline-block;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-sm;
    font-weight: 500;
    color: $color-text-blue;
  }

  &__progress {
    display: inline-block;
    width: 100px;
    height: 5px;
    border-radius: $radius-sm;
  }

  &__list {
    height: 0;
    overflow: hidden;
    padding: 0 0.5em;
    transition: height 0.2s ease;
  }
}
</style>