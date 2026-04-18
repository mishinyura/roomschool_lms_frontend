<script setup>
import { ref, nextTick } from "vue";
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import {send_message} from "@/api/llmApi.js";

const messagesContainer = ref(null);
const messageText = ref("");
const textareaRef = ref(null);

let messages = ref([
  {
    text: "Привет! Давай вместе по тренируемся на полученных знаниях. Я готов пройти вместе с тобой и помочь тебе в решении практического задания. Ты готов?",
    sender: "assistent",
  }
]);

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
})

const renderMarkdown = (text) => {
  const rawHtml = md.render(text || "");
  return DOMPurify.sanitize(rawHtml);
};

const send_new_message = async (message) => {
  if (!message.trim()) return;

  messages.value.push({
    text: message,
    sender: "user",
  });
  

  const result = await send_message(message);

  console.log(result);

  messages.value.push({
    text: result.message,
    sender: "assistant",
  });

  messageText.value = "";

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
</script>

<template>
  <section class="mentor">
    <div class="mentor__messenger" ref="messagesContainer">
      <div class="mentor__head">
        <div class="mentor__image">
          <img src="@/assets/media/images/no-user-photo.webp" alt="" />
        </div>
        <span> Mentor </span>
      </div>
      <ul class="mentor__messages">
        <li
          :class="['mentor__message', 'mentor__message_' + message.sender]"
          v-for="(message, index) in messages"
          :key="index"
          v-html="renderMarkdown(message.text)"
        >
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
.mentor {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__messenger {
    flex-grow: 1;
    padding: 1em;
    overflow-y: auto;
  }


  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-xs;
    font-weight: 500;
  }

  &__image {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__messages {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__message {
    padding: 0.5em 1em;
    border: $border-grey;
    border-radius: $radius-lg;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-md;
    font-weight: 400;

    &_user {
      align-self: flex-end;
      background-color: $color-card-blue;
    }

    &_assistent {
      align-self: flex-start;
    }
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