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

<style lang="scss" scoped>
.account {
  position: relative;
  align-self: stretch;
  width: 100%;
  height: 37px;
  border: $border-grey;
  border-radius: $radius-max;
  background-color: #fff;
  font-family: $font-family-montserrat;
  font-size: $font-size-text-xs;
  font-weight: 500;
  transition: opacity 0.3s, visibility 0.3s, width 0.3s;

  &__wrapper {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 1em;
    overflow: hidden;
    box-sizing: border-box;
    cursor: $cursor-point;

    .main_collapsed & {
      justify-content: center;
      padding: 0;
    }

    &::after {
      z-index: 20;
      flex-shrink: 0;
      width: 10px;
      height: 10px;
      content: "";
      border-bottom: 1px solid #acacac;
      border-left: 1px solid #acacac;
      transform: rotate(-45deg);
      pointer-events: none;
      transition: transform 0.1s;

      .main_collapsed & {
        display: none;
      }
    }

    &.active::after {
      transform: rotate(135deg) translateY(-2px);
    }

    input {
      z-index: 20;
      width: 100%;
      margin-right: 5px;
      color: $color-text-black;
      cursor: $cursor-point;
      transition: width 0.1s, margin-right 0.1s, visibility 0.1s, opacity 0.1s;

      .main_collapsed & {
        position: absolute;
        visibility: hidden;
        opacity: 0;
      }
    }
  }

  &__icon {
    @include mini-icon;
    z-index: 20;
    opacity: 0;
    mask-image: url("@/assets/media/icons/profile.svg");
    background-color: $color-text-black;
    transition: opacity 0.1s;

    .main_collapsed & {
      opacity: 1;
    }
  }

  &__list {
    position: absolute;
    top: 70px;
    z-index: 10;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    border: $border-grey;
    border-radius: $radius-max;
    background-color: #fff;
    color: black;
    box-shadow: $shadow-podium;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.1s, visibility 0.1s, top 0.1s, right 0.1s, width 0.1s;

    .main_collapsed & {
      top: 0;
      right: 0;
    }

    &.active {
      top: 45px;
      visibility: visible;
      opacity: 1;

      .main_collapsed & {
        top: 0;
        right: -150px;
        width: 150px;
      }
    }
  }

  &__item {
    padding: 0.5em 1em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
    cursor: pointer;
    transition: color 0.1s, background-color 0.1s;

    &.selected {
      color: $color-text-blue;
    }

    &:hover {
      background-color: $color-action-blue;
      color: $color-text-white;
    }
  }
}
</style>
