<script setup>
import { get_answer } from "@/api/llm.js";
import { ref, defineProps } from "vue";

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

let message = ref("");

const isCurrentUser = (message) => {
  return message.senderId === 302;
};

async function send_message() {
  if (!this.message.trim()) return;
  const userText = this.message.trim();
  this.message = "";

  this.pushMessage(userText, 302);

  try {
    const llmAnswer = await get_answer(userText);
    this.pushMessage(llmAnswer, 1);
  } catch (e) {
    this.pushMessage(
      "Я временно недоступен. Попробуй обратиться в администрацию школы",
      1
    );
  }
}

</script>

<template>
  <div class="messenger__chat">
    <div class="messenger__head">
      <div
        class="messenger__avatar messenger__avatar_mini"
        :data-bg="$parent.getBgAvatar(props.chat.name)"
      >
        <img
          v-if="chat.image"
          src="@/assets/media/images/logo-adm.png"
          alt="avatar"
        />
      </div>
      <div class="messenger__info">
        <span class="messenger__recipient">{{ props.chat.name }}</span>
      </div>
    </div>

    <ul class="messenger__window">
      <li
        v-for="(message, index) in props.chat.messages"
        :key="index"
        :class="[
          'messenger__message',
          { messenger__message_out: isCurrentUser(message) },
        ]"
      >
        <span class="messenger__author" v-if="!isCurrentUser(message)">
          {{ chat.participants.find((p) => p.id === message.senderId).name }}
        </span>
        <p class="messenger__text">
          {{ message.text }}
        </p>
        <span class="messenger__time">{{ message.time }}</span>
      </li>
    </ul>

    <form class="messenger__form" @submit.prevent="send_message">
      <input v-model="message" type="text" placeholder="Введите сообщение..." />
      <button>Отправить</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.messenger {
  &__chat {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1em;
    overflow-y: auto;
    border-radius: $radius-lg;
    background-color: $color-bg-white;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  // Модификатор или отдельный класс для мини-аватара
  &__avatar_mini {
    width: 40px;
    height: 40px;
  }

  // Legacy-класс  messenger__header
  .chat-header {
    padding: 10px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }

  // Окно с сообщениями
  &__window {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
  }

  // --- Сообщение ---
  &__message {
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 1em;
    border: $border-blue;
    border-radius: $radius-lg;

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    // Исходящее сообщение
    &_out {
      align-self: flex-end;
    }
  }

  &__author {
    display: flex;
    margin-bottom: 5px;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 600;
  }

  &__text {
    font-family: $font-family-montserrat;
    font-size: $font-size-text-xs;
    font-weight: 400;
  }

  &__time {
    align-self: flex-end;
    font-family: $font-family-montserrat;
    font-size: $font-size-text-min;
    font-weight: 400;
    color: $color-text-grey;
  }

  // --- Форма отправки ---
  &__form {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;

    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-sm;
      font-weight: 400;

      &::placeholder {
        font-family: $font-family-montserrat;
        font-size: $font-size-text-sm;
        font-weight: 400;
      }
    }

    button {
      margin-left: 10px;
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      background: $color-btn-blue;
      color: white;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-sm;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
</style>
