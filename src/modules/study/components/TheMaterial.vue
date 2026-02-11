<template>
  <li class="material">
    <div class="material__data">
      <span class="material__name"> {{ material.name }} </span>
      <span class="material__size"> {{ size }} MB</span>
    </div>
    <a :href="material.url" class="material__btn" download></a>
  </li>
</template>

<script>
export default {
  props: {
    material: Object,
  },
  computed: {
    size() {
      return (this.material.size / 1024 / 1024).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.material {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  border-radius: $radius-lg;
  background-color: $color-card-grey;

  &:not(:last-child) {
    margin-bottom: 10px;
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
    @include mini-blue-btn("@/assets/media/icons/download.svg")
  }
}
</style>