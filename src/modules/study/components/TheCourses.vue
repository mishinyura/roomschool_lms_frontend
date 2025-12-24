<template>
  <section class="main__section programs">
    <h3 class="programs__title">Программы обучения</h3>

    <div class="programs__list" v-if="programs.length">
      <ThePrograms
        v-for="(program, index) in programs"
        :key="index"
        :program="program"
      />
    </div>

    <div class="programs__empty" v-else>
      <p class="programs__message">
        В данный момент у вас нет активных подписок
      </p>
    </div>
  </section>
</template>


<script>
import programsJson from "@/mocks/programs.json";
import ThePrograms from "./ThePrograms.vue";

export default {
  data() {
    return {
       programs: programsJson.programs,
    };
  },
  components: {
    ThePrograms,
  }
};
</script>

<style>
.programs__title{
    margin-bottom: 1em;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title-xs);
    font-weight: 500;
}
.programs__message{
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text-xs);
    font-weight: 400;
    color: var(--color-text-grey);
}
</style>