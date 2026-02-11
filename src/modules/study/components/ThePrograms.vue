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
        v-for="(module, index) in props.program.modules"
        :key="index"
        :module="module"
        @update-module-height="handleModuleHeight"
      />
    </div>
  </div>
</template>

<script setup>
import {defineProps, provide, computed, ref} from "vue";
import { pluralize } from "@/utils/globalUtils.js";
import TheModules from "./TheModules.vue";

const props = defineProps({
  program: {
    type: Object,
    required: true,
  },
});

let moduleHeight = ref(0);

provide('programContext', {
  programSlug: props.program.slug,
  programTitle: `${props.program.title} - ${props.program.block}`,
});



const progress = computed(() => {
  const percent = (props.program.completed / props.program.total) * 100;
  return `linear-gradient(90deg, rgba(10,166,215,1) ${percent}%, rgba(222,246,255,1) ${percent}%)`;
});

const amountModulesFormat = (amount) => {
  return pluralize(amount, "модуль", "модуля", "модулей");
};

const openModules = (event) => {
  const list = event.currentTarget.nextElementSibling;
  const fullHeight = list.scrollHeight;

  const isOpen = event.currentTarget.classList.toggle("open");
  moduleHeight.value = isOpen ? fullHeight : 0;
};

const handleModuleHeight = (heightChange, isOpen) => {
  const delta = isOpen ? heightChange : -heightChange;
  moduleHeight.value += delta;

  if (moduleHeight.value < 0) moduleHeight.value = 0;
};

</script>

<style lang="scss" scoped>
.program {
  @include no-select;
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
    @include title;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;

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