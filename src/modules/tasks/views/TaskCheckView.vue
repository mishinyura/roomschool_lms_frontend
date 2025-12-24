<template>
  <div class="main__container taskcheck">
    <div class="main__bullet breadcrumbs">
        <button class="breadcrumbs__btn" @click="this.$router.back()">Назад</button>
        <ul class="breadcrumbs__list">
          <li class="breadcrumbs__item">Проверка работы</li>
        </ul>
      </div>
    <h1 class="taskcheck__title">Проверка работы</h1>
    <div class="taskcheck__info about">
      <h3 class="about__title">Информация о работе</h3>
      <ul class="about__list">
        <li class="about__item">
          <span class="about__name"> Предмет </span>
          <span class="about__value"> {{ task.module }} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Название </span>
          <span class="about__value"> {{ task.topic }} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Дата сдачи </span>
          <span class="about__value"> {{getDate}} </span>
        </li>
        <li class="about__item">
          <span class="about__name"> Максимальный балл </span>
          <span class="about__value"> {{ task.maxScore }} </span>
        </li>
      </ul>
      <button :class="['about__btn about__btn_classic', isOpenDescription ? 'active' : '']" @click="openDescription">
        Показать описание задания
      </button>
      <div class="about__description description_md">
        {{ task.description }}
      </div>
    </div>
    <div class="taskcheck__info attachments">
      <h3 class="attachments__title">Приложения к заданию</h3>
      <ul class="attachments__list">
        <li
          class="attachments__item"
          v-for="(attach, index) in task.attachments"
          :key="index"
          :attach="attach"
        >
          <span class="attachments__type">
            {{ attach.type == "file" ? "Файл" : "Ссылка" }}
          </span>
          <span class="attachments__name">
            {{ attach.name }}
          </span>
          <a
            :href="attach.link"
            :class="[
              'attachments__btn attachments__btn_classic',
              attach.type == 'file'
                ? 'attachments__btn_download'
                : 'attachments__btn_link',
            ]"
            :target="attach.type != 'file' ? '_blank' : ''"
            :download="attach.type == 'file'"
          >
            {{ attach.type == "file" ? "Скачать" : "Перейти" }}
          </a>
        </li>
      </ul>
    </div>
    <div class="taskcheck__info scoring">
      <h3 class="scoring__title">Оценка за работу</h3>
      <span class="scoring__score">
        {{ score }}
      </span>
      <div class="scoring__control">
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          @change="score = $event.target.value"
          :value="score"
        />
        <div class="scoring__btns">
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="100"
            @click="score = $event.target.dataset.score"
          >
            100%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="75"
            @click="score = $event.target.dataset.score"
          >
            75%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="50"
            @click="score = $event.target.dataset.score"
          >
            50%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="25"
            @click="score = $event.target.dataset.score"
          >
            25%
          </button>
          <button
            class="scoring__btn scoring__btn_classic"
            data-score="0"
            @click="score = $event.target.dataset.score"
          >
            0%
          </button>
        </div>
      </div>
    </div>
    <div class="taskcheck__info comment">
      <h3 class="comment__title">Комментарии</h3>
      <form action="" method="post" class="comment__form">
        <textarea
          class="comment__textarea"
          placeholder="Расскажите ученику о сильных и слабых сторонах..."
        ></textarea>
        <button class="comment__btn comment__btn_classic" type="submit">
          Добавить комментарий
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { formatDateWithTime } from "@/utils/dateUtils.js";
export default {
  data() {
    return {
      isOpenDescription: false,
      task: {
        topic: "Квадратное уравнение",
        module: "Математика",
        description: "Тут какаое то описание в разметке markdown",
        passed: "2025-11-16T23:59:59Z",
        score: null,
        maxScore: 20,
        attachments: [
          {
            type: "file",
            name: "Проверка_корней_Иванов_иван.pdf",
            link: "http://yandex.ru",
          },
          {
            type: "link",
            name: "http://yandex.ru",
            link: "http://yandex.ru",
          },
        ],
      },
      score: 0,
    };
  },
  watch: {
    score() {
      if (this.score > 100) this.score = 100;
      if (this.score < 0) this.score = 0;
    },
  },
  computed: {
    getDate() {
      return formatDateWithTime(this.task.passed);
    },
  },
  methods: {
    openDescription() {
      const description = document.querySelector(".description_md");
      if (this.isOpenDescription) {
        description.style.height = "0px";
      } else {
        description.style.height = description.scrollHeight + "px";
      }
      this.isOpenDescription = !this.isOpenDescription;
    },
    goBack() {
      // Мы ЯВНО говорим: иди на страницу с именем 'checks'
      this.$router.push({ name: "checks" });
    },
  },
};
</script>

<style>
.taskcheck__back {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5em 0;
    margin-bottom: 20px;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}

.taskcheck__back::before {
    content: '';
    width: 5px;
    height: 5px;
    border-bottom: 1px solid var(--color-text-black);
    border-left: 1px solid var(--color-text-black);
    transform: rotate(45deg);
}

.taskcheck__title {
    margin-bottom: var(--margin-bottom-title-desktop);
}
/* 
_____________
Блок с информацией о задании
_____________
*/
.about {
    margin-bottom: 20px;
    padding: var(--padding-section);
    border-radius: var(--radius-lg);
    background-color: var(--color-section-white);
}

.about__title {
    margin-bottom: var(--margin-bottom-title-desktop);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}
.about__list{
    margin-bottom: 20px;
}
.about__item {
    display: flex;
    justify-content: space-between;
}

.about__item:not(:last-child) {
    margin-bottom: 10px;
}

.about__name {
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text);
    font-weight: 400;
    color: var(--color-text-grey);
}

.about__value {
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text);
    font-weight: 400;
    color: var(--color-text-black);
}
.about__description{
    height: 0;
    overflow: hidden;
    transition: height .3s;
}
.about__description.show{
    height: auto;
}
.about__btn{
    margin-bottom: 0;
    transition: margin-bottom .3s, background-color .3s;
}
.about__btn.active{
    margin-bottom: 20px;
    background-color: var(--color-action-dark-blue);
}

/* 
_____________
Блок с вложениями
_____________
*/
.attachments{
    margin-bottom: var(--margin-card);
    padding: var(--padding-section);
    border-radius: var(--radius-lg);
    background-color: var(--color-section-white);
}
.attachments__title {
    margin-bottom: var(--margin-bottom-title-desktop);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}
.attachments__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: var(--padding-item);
    border-radius: var(--radius-lg);
    background-color: var(--color-card-grey);
}

.attachments__item:not(:last-child) {
    margin-bottom: 10px;
}
.attachments__type{
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text);
    font-weight: 400;
    color: var(--color-text-grey);
}
.attachments__name {
    flex-grow: 1;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text);
    font-weight: 400;
    color: var(--color-text-balck);
}

.attachments__btn_download::before{
    content: '';
    width: 15px;
    height: 15px;
    mask-image: url('@/assets/media/icons/download.svg');
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    background-color: var(--color-text-white)
}

.attachments__btn_link::before{
    content: '';
    width: 15px;
    height: 15px;
    mask-image: url('@/assets/media/icons/open.svg');
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    background-color: var(--color-text-white)
}
/* 
_____________
Блок с оценкой
_____________
*/
.scoring{
    margin-bottom: var(--margin-card);
    padding: var(--padding-section);
    border-radius: var(--radius-lg);
    background-color: var(--color-section-white);
}
.scoring__title{
    display: inline-block;
    margin-right: 20px;
    margin-bottom: var(--margin-bottom-title-desktop);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}
.scoring__score{
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}
.scoring__control input{
    width: 100%;
    margin-bottom: 20px;
}

.scoring__btns{
    display: flex;
    align-items: center;
    gap: 10px;
}

/* 
_____________
Блок с комментарием к заданию
_____________
*/
.comment{
    padding: var(--padding-section);
    border-radius: var(--radius-lg);
    background-color: var(--color-section-white);
}
.comment__title{
    display: inline-block;
    margin-right: 20px;
    margin-bottom: var(--margin-bottom-title-desktop);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-title);
    font-weight: 400;
    color: var(--color-text-black);
}
.comment__textarea{
    width: 100%;
    margin-bottom: 20px;
    padding: var(--padding-item);
    outline: none;
    border: var(--border-blue);
    border-radius: var(--radius-lg);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-text-xs);
    font-weight: 400;
    color: var(--color-text-black);
    resize: none;
}
</style>