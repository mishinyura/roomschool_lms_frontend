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

<style scoped>
.loader{
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  opacity: 0;
}
.loader span {
  position: absolute;
  left: 42%;
  top: 42%;
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background: linear-gradient(135deg, #6a5acd, #1e90ff);
  animation: whirlpool 3s infinite;
}

/* размещаем круги по окружности */
.loader span:nth-child(1) {
  animation: whirlpool1 3s ease-in-out infinite;
  animation-delay: 0s;
}

.loader span:nth-child(2) {
  animation: whirlpool2 3s ease-in-out infinite;
  animation-delay: 0.1s;
}

.loader span:nth-child(3) {
  animation: whirlpool3 3s ease-in-out infinite;
  animation-delay: 0.2s;
}

.loader span:nth-child(4) {
  animation: whirlpool4 3s ease-in-out infinite;
  animation-delay: 0.3s;
}

.loader span:nth-child(5) {
  animation: whirlpool5 3s ease-in-out infinite;
  animation-delay: 0.4s;
}

.loader span:nth-child(6) {
  animation: whirlpool6 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

.loader span:nth-child(7) {
  animation: whirlpool7 3s ease-in-out infinite;
  animation-delay: 0.6s;
}

.loader span:nth-child(8) {
  animation: whirlpool8 3s ease-in-out infinite;
  animation-delay: 0.7s;
}

.loader span:nth-child(9) {
  animation: whirlpool9 3s ease-in-out infinite;
  animation-delay: 0.8s;
}

.loader span:nth-child(10) {
  animation: whirlpool10 3s ease-in-out infinite;
  animation-delay: 0.9s;
}

.loader span:nth-child(11) {
  animation: whirlpool11 3s ease-in-out infinite;
  animation-delay: 1s;
}

.loader span:nth-child(12) {
  animation: whirlpool12 3s ease-in-out infinite;
  animation-delay: 1.1s;
}

@keyframes whirlpool1 {
  0% {
    transform: scale(1) translate(30px, 0);
    opacity: 1;
  }

  50% {
    transform: scale(1) translate(0, 0);
    opacity: 0.2;
  }

  100% {
    transform: scale(1) translate(30px, 0);
    opacity: 1;
  }
}

@keyframes whirlpool2 {
  0% {
    transform: translate(26px, 15px);
    opacity: 1;
  }

  50% {
    transform: translate(0, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(26px, 15px);
    opacity: 1;
  }
}

@keyframes whirlpool3 {
  0% {
    transform: translate(15px, 26px);
    opacity: 1;
  }

  50% {
    transform: translate(0, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(15px, 26px);
    opacity: 1;
  }
}

@keyframes whirlpool4 {
  0% {
    transform: translate(0px, 30px);
    opacity: 1;
  }

  50% {
    transform: translate(0, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(0px, 30px);
    opacity: 1;
  }
}

@keyframes whirlpool5 {
  0% {
    transform: translate(-15px, 26px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(-15px, 26px);
    opacity: 1;
  }
}

@keyframes whirlpool6 {
  0% {
    transform: translate(-26px, 15px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(-26px, 15px);
    opacity: 1;
  }
}

@keyframes whirlpool7 {
  0% {
    transform: translate(-30px, 0px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(-30px, 0px);
    opacity: 1;
  }
}

@keyframes whirlpool8 {
  0% {
    transform: translate(-26px, -15px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(-26px, -15px);
    opacity: 1;
  }
}

@keyframes whirlpool9 {
  0% {
    transform: translate(-15px, -26px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(-15px, -26px);
    opacity: 1;
  }
}

@keyframes whirlpool10 {
  0% {
    transform: translate(0, -30px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(0, -30px);
    opacity: 1;
  }
}

@keyframes whirlpool11 {
  0% {
    transform: translate(15px, -26px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(15px, -26px);
    opacity: 1;
  }
}

@keyframes whirlpool12 {
  0% {
    transform: translate(26px, -15px);
    opacity: 1;
  }

  50% {
    transform: translate(0%, 0);
    opacity: 0.2;
  }

  100% {
    transform: translate(26px, -15px);
    opacity: 1;
  }
}

@keyframes morphing {
  0% {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  25% {
    width: 100%;
    height: 10px;
    border-radius: 40px;
  }

  75% {
    width: 10px;
    height: 100%;
    border-radius: 40px;
  }

  100% {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>