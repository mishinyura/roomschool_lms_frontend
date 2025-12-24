<template>
  <div class="loader-wrapper">
    <span class="loader-letter">П</span>
    <span class="loader-letter">о</span>
    <span class="loader-letter">д</span>
    <span class="loader-letter">о</span>
    <span class="loader-letter">ж</span>
    <span class="loader-letter">д</span>
    <span class="loader-letter">и</span>
    <span class="loader-letter">т</span>
    <span class="loader-letter">е</span>

    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>