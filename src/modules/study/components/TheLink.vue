<template>
  <li class="links__item">
    <div class="links__data">
      <span class="links__name"> {{ link.name }} </span>
      <span class="links__size"> {{ link.url }}</span>
    </div>
    <a :href="link.url" class="links__btn" target="_blanck"></a>
  </li>
</template>

<script>
export default {
  props: {
    link: Object,
  }
};
</script>

<style>
.links__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  border-radius: var(--radius-lg);
  background-color: var(--color-card-grey);
}

.links__file:not(:last-child) {
  margin-bottom: 10px;
}

.links__data {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.links__size {
  color: var(--color-text-grey);
}

.links__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: var(--radius-sm);
  transition: background-color 0.1s;
}
.links__btn:hover {
  background-color: var(--color-action-blue);
}
.links__btn:focus-visible {
  background-color: var(--color-action-blue);
}
.links__btn:active {
  background-color: var(--color-action-dark-blue);
}
.links__btn::before {
  content: "";
  width: 80%;
  height: 80%;
  mask-image: url("@/assets/media/icons/open.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: var(--color-icon-blue);
  transition: background-color 0.1s;
}
.links__btn:hover::before {
  background-color: var(--color-action-white);
}
.links__btn:focus-visible::before {
  background-color: var(--color-action-white);
}
.links__btn:active::before {
  background-color: var(--color-action-white);
}
</style>