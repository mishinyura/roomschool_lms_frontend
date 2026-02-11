<template>
  <li class="link">
    <div class="link__data">
      <span class="link__name"> {{ link.name }} </span>
      <span class="link__size"> {{ link.url }}</span>
    </div>
    <a :href="link.url" class="link__btn" target="_blanck"></a>
  </li>
</template>

<script>
export default {
  props: {
    link: Object,
  }
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  border-radius: $radius-lg;
  background-color: $color-card-grey;

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
    @include mini-blue-btn("@/assets/media/icons/open.svg")
  }
}
</style>