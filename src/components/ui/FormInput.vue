<template>
  <label v-if="label" class="auth__label input">
    <span class="input__name">{{ label }}</span>
    <span class="input__message">Неверный пароль</span>
    <input
      :type="type"
      v-model="innerValue"
      :placeholder="placeholder"
      :name="name"
      class="input__item"
    />
  </label>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    label: String,
    modelValue: String,
    placeholder: String,
    name: String,
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    innerValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.input{
    position: relative;
    display: block;
    margin-bottom: 10px;
}
.input__name{
    display: block;
    margin-bottom: 5px;
    font-family: 'Montserrat';
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-text-white);
}
.input__message{
    position: absolute;
    top: 0;
    right: 0;
    font-family: 'Montserrat';
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-text-red)
}
.input__item {
    width: 100%;
    padding: 8px 12px;
    border: none;
    outline: none;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-size: 0.90rem;
    transition: border-color 0.2s;
}
</style>
