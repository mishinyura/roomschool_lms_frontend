<script setup>
import { ref, nextTick, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import { send_message } from "@/api/llmApi.js";
import {communicationApi} from "@/api/communicationApi.js";

const messagesContainer = ref(null);
const messageText = ref("");
const textareaRef = ref(null);

let messages = ref([
  {
    text: "Привет! Давай вместе по тренируемся на полученных знаниях. Я готов пройти вместе с тобой и помочь тебе в решении практического задания. Ты готов?",
    sender: "assistent",
  }
]);

let isTyping = ref(false);
let isLoadMessages = ref(true);

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
});

const socrateImage = require("@/assets/media/images/socrate.jpg");
const userImage = require("" || "@/assets/media/images/no-user-photo.webp");

const renderMarkdown = (text) => {
  const rawHtml = md.render(text || "");
  return DOMPurify.sanitize(rawHtml);
};

const send_new_message = async (message) => {
  if (!message.trim()) return;

  isTyping.value = true;

  messageText.value = "";

  messages.value.push({
    text: message,
    sender: "user",
  });
  await scrollToBottom();

  const result = await send_message(message);

  isTyping.value = false;

  messages.value.push({
    text: result.message,
    sender: "assistant",
  });

  resetTextareaHeight();

  await scrollToBottom();
};

const scrollToBottom = async (smooth = true) => {
  await nextTick();

  const container = messagesContainer.value;
  if (!container) return;

  container.scrollTo({
    top: container.scrollHeight,
    behavior: smooth ? "smooth" : "auto",
  });
};

const resetTextareaHeight = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = "30px";
  el.style.overflowY = "hidden";
};

const autoResizeTextarea = (event) => {
  const el = event.currentTarget;

  el.style.height = "30px";

  if (el.scrollHeight > 60) {
    el.style.height = "60px";
    el.style.overflowY = "auto";
  } else {
    el.style.height = el.scrollHeight + "px";
    el.style.overflowY = "hidden";
  }
};

const loadHistoryMessages = async () => {
  const historyMessages = await communicationApi.getHistoryMessages();
  messages.value.push(...historyMessages);
  isLoadMessages.value = false;
};

onMounted(async () => {
  await loadHistoryMessages();
  await scrollToBottom();
});
</script>

<template>
  <section class="mentor">
    <div class="mentor__head">
        <span class="mentor__name">AI Ментор</span>
        <span class="mentor__typing" v-if="isTyping">
          Печатает...
        </span>
      </div>
    <div class="mentor__messenger" ref="messagesContainer">
      <ul class="mentor__messages" v-if="!isLoadMessages">
        <li
          :class="['mentor__message', 'mentor__message_' + message.sender]"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div class="mentor__avatar">
            <img :src="message.sender === 'user' ? userImage : socrateImage" alt="">
          </div>
          <div class="mentor__text" v-html="renderMarkdown(message.text)"></div>
        </li>
      </ul>
    </div>
    <form
      class="mentor__control"
      @submit.prevent="send_new_message($event.target[1].value)"
    >
      <button class="mentor__attach"></button>
      <textarea
        ref="textareaRef"
        v-model="messageText"
        class="mentor__textarea"
        placeholder="Введите сообщение..."
        @input="autoResizeTextarea"
      ></textarea>
      <button class="mentor__send">Отправить</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
@keyframes typing {
  from {
    width: 67px;
  }
  to {
    width: 75px;
  }
}
.mentor {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__messenger {
    overflow-y: auto;
    flex-grow: 1;
  }

  &__head {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 60px;
    margin-bottom: 20px;
    padding: 0.2em 1em;
    border-radius: $radius-lg;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;
    background-color: $color-section-white;
    box-shadow: $shadow-podium;
  }

  &__name {
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;
    color: $color-text-black;
  }

  &__typing {
    width: 67px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
    color: $color-text-grey;
    overflow: hidden;
    animation: typing 1s infinite;
  }

  &__messages {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 1em;
  }

  &__message {
    display: flex;
    gap: 10px;
    

    &_user {
      flex-direction: row-reverse;
      align-self: flex-end;

      & .mentor__text {
        background-color: $color-card-blue;
      }
    }

    &_assistent {
      align-self: flex-start;
    }
  }

  &__avatar {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border: $border-grey;
    border-radius: 50%;
    background-image: url('@/assets/media/images/no-user-photo.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    padding: 0.5em 1em;
    border: $border-grey;
    border-radius: $radius-lg;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-md;
    font-weight: 400;
  }

  &__control {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 10px;
    padding: 1em;
  }

  &__attach {
    @include icon-mask(
      "@/assets/media/icons/attach.svg",
      $color-icon-black,
      20px
    );
  }

  &__textarea {
    display: block;
    box-sizing: border-box;
    flex-grow: 1;
    height: 30px;
    padding: 0.5em;
    overflow: hidden;
    resize: none;
    border: none;
    border-radius: $radius-sm;
    outline: $border-blue;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    transition: outline-color 0.1s ease;

    &::placeholder {
      color: $color-text-blue;
    }

    &:hover,
    &:focus-visible {
      outline-color: $color-btn-dark-blue;
    }
  }

  &__send {
    @include btn-blue-classic;
  }
}
</style>