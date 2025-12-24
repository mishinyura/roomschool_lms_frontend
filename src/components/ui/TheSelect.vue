<template>
  <div class="sidebar__select account" :class="{ active: isOpen }">
    <div class="account__wrapper" :class="{ active: isOpen }" @click="toggle">
      <span class="account__icon"></span>
      <input
        class="account__input"
        name="role"
        type="text"
        :data-role="activeAccount"
        readonly
        :value="selectedLabel"
      />
    </div>
    <ul class="account__list" :class="{ active: isOpen }">
      <li
        v-for="option in options"
        :key="option.name"
        :data-role="option.name"
        :class="[
          'account__item',
          { selected: activeAccount === option.name },
        ]"
        @click="select(option)"
      >
        {{ option.display }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheSelect",
  emits: ["update:activeAccount"],
  props: {
    options: {
      type: Array,
      required: true,
    },
    activeAccount: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedOption() {
      return this.options.find((option) => option.name === this.activeAccount) || null;
    },
    selectedLabel() {
      return this.selectedOption ? this.selectedOption.display : "";
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    select(option) {
      this.$emit("update:activeAccount", option.name);
      this.isOpen = false;
    },
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style src="@/assets/styles/ui/select.css">

</style>
