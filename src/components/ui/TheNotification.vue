<script setup>
import {
  onMounted,
  computed,
  onBeforeUnmount,
  defineProps,
  defineEmits,
  ref,
} from "vue";

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
  timeout: {
    type: Number,
    default: 5000,
  },
});

const emit = defineEmits(["close"]);
let timerId = null;
const remainingTime = ref(props.timeout);
const startTime = ref(0);

const iconClass = computed(() =>
  !props.error.status
    ? "notification_error"
    : "notification_success"
);

const startTimer = () => {
  startTime.value = Date.now();
  timerId = setTimeout(() => {
    emit("close");
  }, remainingTime.value);
};

const pauseTimer = () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
    remainingTime.value -= Date.now() - startTime.value;
  }
};

const resumeTimer = () => {
  if (!timerId && remainingTime.value > 0) {
    startTimer();
  }
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId);
});
</script>

<template>
  <div
    :class="['notification', iconClass]"
    role="alert"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
  >
    <button class="notification__btn" @click="$emit('close')"></button>
    <p class="notification__descr">{{ error.message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  position: relative;
  z-index: 100000;
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 40px;
  padding: 1.5em;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: rgba(138, 209, 253, 0.8);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  font-size: $font-size-text-sm;
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);

  &:last-child {
    margin-bottom: 0;
  }

  &_error,
  &_success {
    &::before {
      display: inline;
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      content: "";
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  &_error::before {
    background-image: url("@/assets/media/icons/error.png");
  }

  &_success::before {
    background-image: url("@/assets/media/icons/ok.png");
  }

  &__btn {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    padding: 5px;
    background: transparent;
    border: none;
    cursor: pointer;

    &::before,
    &::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      content: "";
      background-color: #262626;
      top: 50%;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__descr {
    font-family: $font-family-nunito;
    font-size: $font-size-text-sm;
    font-weight: 400;
  }
}
</style>