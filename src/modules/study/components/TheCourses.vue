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


<script>
// import programsJson from "@/mocks/programs.json";
import ThePrograms from "./ThePrograms.vue";

export default {
  data() {
    return {
      programs: [
        {
          title: "Социальный",
          block: "Факультатив",
          slug: "social",
          completed: 0,
          total: 1,
          modules: [
            {
              title: "Тайм-менеджмент",
              slug: "time-management",
              completed: 0,
              total: 7,
              topics: [
                {
                  title: "Время - это не часы",
                  slug: "vremya-eto-ne-chasy",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: false,
                },
                {
                  title: "Почему я ничего не делаю (и это не лень)",
                  slug: "pochemu-ya-nichego-ne-delayu",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
                {
                  title: "Как концентрироваться в мире отвлечений",
                  slug: "kak-koncentrirovatsya",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
                {
                  title: "Дела, которые не бесят",
                  slug: "dela-kotorye-ne-besyat",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
                {
                  title: "Планирование без занудства",
                  slug: "planirovanie-bez-zanudstva",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
                {
                  title: "Ты и твой ритм жизни",
                  slug: "ty-i-tvoj-ritm-zhizni",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
                {
                  title: "Я - хозяин своего времени",
                  slug: "ya-hozyain-svoego-vremeni",
                  progress: 0,
                  videos: 3,
                  tests: 1,
                  isBlock: true,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    ThePrograms,
  },
};
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