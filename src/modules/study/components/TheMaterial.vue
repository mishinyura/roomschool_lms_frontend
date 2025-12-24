<template>
  <li class="materials__file">
    <div class="materials__data">
      <span class="materials__name"> {{ material.name }} </span>
      <span class="materials__size"> {{ size }} MB</span>
    </div>
    <a :href="material.url" class="materials__btn" download></a>
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

<style>
.materials__file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  border-radius: var(--radius-lg);
  background-color: var(--color-card-grey);
}

.materials__file:not(:last-child) {
  margin-bottom: 10px;
}

.materials__data {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.materials__size {
  color: var(--color-text-grey);
}

.materials__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: var(--radius-sm);
  transition: background-color 0.1s;
}
.materials__btn:hover {
  background-color: var(--color-action-blue);
}
.materials__btn:focus-visible {
  background-color: var(--color-action-blue);
}
.materials__btn:active {
  background-color: var(--color-action-dark-blue);
}
.materials__btn::before {
  content: "";
  width: 80%;
  height: 80%;
  mask-image: url("@/assets/media/icons/download.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
  transition: background-color 0.1s;
}
.materials__btn:hover::before {
  background-color: var(--color-action-white);
}
.materials__btn:focus-visible::before {
  background-color: var(--color-action-white);
}
.materials__btn:active::before {
  background-color: var(--color-action-white);
}
</style>