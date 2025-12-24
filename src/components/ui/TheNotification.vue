<template>
  <div class="notifications">
    <div
      class="notifications__message notifications__message_error show"
      role="alert"
      v-for="error in listErrorModel"
      :key="error"
    >
      <button class="notifications__btn" @click="removeError(error)"></button>
      <p class="notifications__descr">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listErrorModel: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:listErrorModel"],
  data() {
    return {
      timers: {},
    };
  },
  watch: {
    // Следим за массивом ошибок
    listErrorModel: {
      handler(newErrors) {
        newErrors.forEach((text) => {
          // Если для этого текста еще нет таймера — запускаем
          if (!this.timers[text]) {
            this.timers[text] = setTimeout(() => {
              this.removeError(text);
            }, 5000);
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    removeError(textToRemove) {
      // 1. Чистим таймер для этого текста
      if (this.timers[textToRemove]) {
        clearTimeout(this.timers[textToRemove]);
        delete this.timers[textToRemove];
      }

      // 2. Удаляем строку из массива (фильтруем)
      const newList = this.listErrorModel.filter((text) => text !== textToRemove);
      
      // 3. Обновляем родителя
      this.$emit("update:listErrorModel", newList);
    },
  },
};
</script>

<style scoped></style>