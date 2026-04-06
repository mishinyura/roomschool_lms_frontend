<script setup>
import { defineProps } from "vue";

const props = defineProps({
  links: Array,
});
</script>

<template>
  <div class="links" v-if="props.links.length > 0">
    <span class="links__title"> Полезные ссылки </span>
    <ul class="links__list">
      <li
        class="links__item"
        v-for="(link, index) in props.links"
        :key="index"
        :link="link"
      >
        <div class="links__data">
          <span class="links__name"> {{ link.name }} </span>
          <span class="links__size"> {{ link.url }}</span>
        </div>
        <a :href="link.url" class="links__btn" target="_blank"></a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.links {
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
  }

  &__file {
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
    @include mini-blue-btn("@/assets/media/icons/open.svg");
  }
}
</style>