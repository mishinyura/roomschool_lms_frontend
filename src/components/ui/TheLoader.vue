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

<template>
  <div class="backdrop">
    <div class="loader">
    <div class="loader_cube loader_cube--color"></div>
    <div class="loader_cube loader_cube--glowing"></div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: auto;

  // Элемент куба
  &_cube {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 30px;

    // Модификатор: свечение
    &--glowing {
      z-index: 2;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background-color: rgba(255, 255, 255, 0.2);
    }

    // Модификатор: цвет и анимация
    &--color {
      z-index: 1;
      background: linear-gradient(135deg, #1afbf0, #da00ff);
      filter: blur(2px);
      animation: loadtwo 2.5s ease-in-out infinite;
    }
  }
}

// Фон-затемнение
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

// Анимация вращения
@keyframes loadtwo {
  50% {
    transform: rotate(-80deg);
  }
}
</style>