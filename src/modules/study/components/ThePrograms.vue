<template>
  <div class="programs__item program">
    <div class="program__head" @click="openModules">
      <div class="program__info">
        <h4
          class="program__name program__name_program"
          :data-block="program.block"
        >
          {{ program.title }}
        </h4>
        <span class="program__amount-module">
          {{ amountModulesFormat(program.modules.length) }}
        </span>
      </div>
      <div class="program__control">
        <span class="program__amount-topics">
          {{ program.completed }}/{{ program.total }}
        </span>
        <span
          class="program__progress"
          :style="{ background: progress }"
        ></span>
      </div>
    </div>

    <div class="program__list modules" :style="{ height: moduleHeight + 'px' }">
      <TheModules
        v-for="(module, index) in program.modules"
        :key="index"
        :module="module"
        @update-module-height="handleModuleHeight"
      />
    </div>
  </div>
</template>

<script>
import { pluralize } from "@/utils/globalUtils.js";
import TheModules from "./TheModules.vue";

export default {
  props: ["program"],
  provide() {
    return {
      programSlug: this.program.slug,
      programTitle: `${this.program.title} - ${this.program.block}`,
    }
  },
  components: { TheModules },
  data() {
    return { moduleHeight: 0 };
  },
  computed: {
    progress() {
      const percent = (this.program.completed / this.program.total) * 100;
      return `linear-gradient(90deg, rgba(10,166,215,1) ${percent}%, rgba(222,246,255,1) ${percent}%)`;
    },
  },
  methods: {
    amountModulesFormat(amount) {
      return pluralize(amount, "модуль", "модуля", "модулей");
    },

    openModules(event) {
      const list = event.currentTarget.nextElementSibling; //Получает список с модулями
      const fullHeight = list.scrollHeight; //Получаем высоту скролла списка с модулями

      const isOpen = event.currentTarget.classList.toggle("open"); // Добавляем класс open и возвращаем статус head
      this.moduleHeight = isOpen ? fullHeight : 0;
    },
    handleModuleHeight(heightChange, isOpen) {
      const delta = isOpen ? heightChange : -heightChange;
      this.moduleHeight += delta;

      if (this.moduleHeight < 0) this.moduleHeight = 0;
    },
  },
};
</script>

<style>
/* Программы */
.program {
  padding: 1em;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-classic);
  background-color: var(--color-section-white);
}
.program:not(:last-child) {
  margin-bottom: 1em;
}
.program__head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  cursor: var(--cursor-point);
  transition: margin-bottom 0.2s ease;
}
.program__head.open {
  margin-bottom: 1em;
}
.program__info {
  user-select: none;
}
.program__name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-xs);
  font-weight: 500;
}
.program__name_program::after {
  content: attr(data-block);
  display: inline-block;
  padding: 0.2em 0.5em;
  border-radius: var(--radius-lg);
  background-color: var(--color-label-blue);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}
.program__amount-module {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}
.program__control {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}
.program__control::after {
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  transform: rotate(225deg);
  transition: transform 0.2s ease;
}
.program__head.open .program__control::after {
  transform: rotate(45deg);
}
.program__amount-topics {
  display: inline-block;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 500;
  color: var(--color-text-blue);
}
.program__progress {
  display: inline-block;
  height: 5px;
  width: 100px;
  border-radius: var(--radius-sm);
}
</style>