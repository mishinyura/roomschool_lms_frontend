<template>
  <div class="backdrop">
    <div class="loader">
    <div class="loader_cube loader_cube--color"></div>
    <div class="loader_cube loader_cube--glowing"></div>
  </div>
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

<style scoped>
.loader {
  width: 100px;
  height: 100px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.backdrop {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.loader_cube {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}

.loader_cube--glowing {
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.loader_cube--color {
  z-index: 1;
  filter: blur(2px);
  background: linear-gradient(135deg, #1afbf0, #da00ff);
  animation: loadtwo 2.5s ease-in-out infinite;
}

@keyframes loadtwo {
  50% {
    transform: rotate(-80deg);
  }
}
</style>