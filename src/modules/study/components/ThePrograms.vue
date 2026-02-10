<template>
  <div class="program">
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

    <div class="program__list" :style="{ height: moduleHeight + 'px' }">
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
    };
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
      const list = event.currentTarget.nextElementSibling;
      const fullHeight = list.scrollHeight;

      const isOpen = event.currentTarget.classList.toggle("open");
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

<style lang="scss" scoped>
.program {
  padding: 1em;
  border-radius: $radius-lg;
  background-color: $color-section-white;
  box-shadow: $shadow-classic;

  &:not(:last-child) {
    margin-bottom: 1em;
  }

  &__head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    cursor: $cursor-point;
    transition: margin-bottom 0.2s ease;

    &.open {
      margin-bottom: 1em;

      .program__control::after {
        transform: rotate(45deg);
      }
    }
  }

  &__info {
    user-select: none;
  }

  &__name {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;

    &_program::after {
      display: inline-block;
      padding: 0.2em 0.5em;
      border-radius: $radius-lg;
      background-color: $color-label-blue;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-xs;
      font-weight: 400;
      content: attr(data-block);
    }
  }

  &__amount-module {
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

  &__amount-topics {
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
    transition: height 0.2s ease;
  }
}
</style>