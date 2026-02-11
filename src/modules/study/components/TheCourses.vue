<template>
  <section class="main__section programs">
    <h3 class="programs__title" v-if="programs.length">Программы обучения</h3>

    <div class="programs__list" v-if="programs.length">
      <ThePrograms
        v-for="(program, index) in programs"
        :key="index"
        :program="program"
      />
    </div>

    <div class="programs__empty" v-else>
      <p class="programs__message">
        В данный момент у вас нет активных подписок. Вы можете ознакомиться с
        программами обучения на сайте
        {{ programs.length }}
      </p>
      <a href="https://roomschool.ru/courses" class="programs__link">
        Посмотреть программы 
      </a>
    </div>
  </section>
</template>


<script setup>
import programsJson from "@/mocks/programs.json";
import ThePrograms from "./ThePrograms.vue";

const programs = programsJson;
</script>

<style lang="scss">
.programs__title {
  @include section-title;
}
.programs__empty {
  @include empty;
}
.programs__link {
  @include btn-classic;
}
</style>