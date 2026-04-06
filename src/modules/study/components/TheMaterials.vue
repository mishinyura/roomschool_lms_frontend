<script setup>
import { defineProps } from "vue";
const props = defineProps({
  materials: Array,
});

const getSize = (size) => {
  return (size / 1024 / 1024).toFixed(1);
};
</script>

<template>
  <div class="materials" v-if="materials.length > 0">
    <span class="materials__title"> Материалы </span>
    <ul class="materials__list">
      <li
        class="materials__item"
        v-for="(material, index) in props.materials"
        :key="index"
        :material="material"
      >
        <div class="materials__data">
          <span class="materials__name"> {{ material.name }} </span>
          <span class="materials__size"> {{ getSize(material.size) }} MB</span>
        </div>
        <a :href="material.url" class="materials__btn" download></a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.materials {
  padding: 1em;

  &__title {
    @include player-title("@/assets/media/icons/tests.svg");
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 1em;
    border-radius: $radius-lg;
    background-color: $color-card-grey;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
  }

  &__size {
    color: $color-text-grey;
  }

  &__btn {
    @include mini-blue-btn("@/assets/media/icons/download.svg");
  }
}
</style>