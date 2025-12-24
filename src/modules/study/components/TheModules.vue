<template>
  <div class="modules__item">
    <div class="modules__head" @click="openTopics">
      <div class="modules__info">
        <h4 class="modules__name modules__name_module">{{ module.title }}</h4>
        <span class="modules__amount-topics">
          {{ amountTopicsFormat(module.topics.length) }}
        </span>
      </div>
      <div class="modules__control">
        <span class="modules__amount-videos"> 4/6 </span>
        <span
          class="modules__progress"
          :style="{ background: progress }"
        ></span>
      </div>
    </div>

    <div class="modules__list topics" :style="{ height: topicHeight + 'px' }">
      <TheTopics
        v-for="(topic, index) in module.topics"
        :key="index"
        :topic="topic"
      />
    </div>
  </div>
</template>

<script>
import { pluralize } from "@/utils/globalUtils.js";
import TheTopics from "./TheTopics.vue";

export default {
  props: ["module"],
  emits: ["update-module-height"],
  provide() {
    return {
      moduleSlug: this.module.slug,
      moduleTitle: this.module.title,
    }
  },
  components: { TheTopics },
  data() {
    return { topicHeight: 0 };
  },
  computed: {
    progress() {
      const percent = (this.module.completed / this.module.total) * 100;
      return `linear-gradient(90deg, rgba(10,166,215,1) ${percent}%, rgba(222,246,255,1) ${percent}%)`;
    },
  },
  methods: {
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
  },
};
</script>

<style>
/* Модули */
.modules {
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease;
}

.modules__item {
  margin-bottom: var(--margin-item);
  padding: 1em;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
}

.modules__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  cursor: var(--cursor-point);
  transition: margin-bottom 0.2s ease;
}

.modules__head.open {
  margin-bottom: 1em;
}

.modules__info {
  user-select: none;
}

.modules__name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}

.modules__name_module::after {
  content: "Модуль";
  display: inline-block;
  padding: 0.2em 0.5em;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-orange);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}
.modules__amount-topics {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}
.modules__control {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}
.modules__control::after {
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  transform: rotate(225deg);
  transition: transform 0.2s ease;
}
.modules__head.open .modules__control::after {
  transform: rotate(45deg);
}
.modules__amount-videos {
  display: inline-block;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 500;
  color: var(--color-text-blue);
}
.modules__progress {
  display: inline-block;
  height: 5px;
  width: 100px;
  border-radius: var(--radius-sm);
}
</style>