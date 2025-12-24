<template>
  <div class="messenger__chat">
    <div class="messenger__head">
      <div
        class="messenger__avatar messenger__avatar_mini"
        :data-bg="$parent.getBgAvatar(chat.name)"
      >
        <img
          v-if="chat.image"
          src="@/assets/media/images/logo-adm.png"
          alt="avatar"
        />
      </div>
      <div class="messenger__info">
        <span class="messenger__recipient">{{ chat.name }}</span>
      </div>
    </div>

    <ul class="messenger__window">
      <li
        v-for="(message, index) in chat.messages"
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

<script>
import { send_message } from "@/api/llm.js";
import { ref } from "vue";

export default {
  name: "ChatWindow",
  props: {
    chat: Object,
  },
  data() {
    return {
      message: ref(""),
    };
  },
  methods: {
    isCurrentUser(message) {
      return message.senderId === 302;
    },

    /* главный обработчик отправки */
    async send_message() {
      if (!this.message.trim()) return; // пустое не шлём
      const userText = this.message.trim();
      this.message = ""; // очистили поле

      // 1. сразу показываем сообщение пользователя
      this.pushMessage(userText, 302);

      // 2. ждём ответа LLM
      try {
        const llmAnswer = await send_message(userText); // вернёт строку
        // 3. добавляем ответ собеседника (id = 1 – «AI ментор», можно любой)
        this.pushMessage(llmAnswer, 1);
      } catch (e) {
        this.pushMessage("Ошибка сети, попробуйте позже", 1);
      }
    },
  },
};
</script>

<style>
.messenger__chat {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-white);
}

.messenger__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.messenger__avatar_mini {
  width: 40px;
  height: 40px;
}

.chat-header {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
}

.messenger__window {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
}

.messenger__message {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 1em;
  border: var(--border-blue);
  border-radius: var(--radius-lg);
}

.messenger__message:not(:last-child) {
  margin-bottom: 5px;
}

.messenger__message_out {
  align-self: flex-end;
}

.messenger__author {
  display: flex;
  margin-bottom: 5px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 600;
}

.messenger__text {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-xs);
  font-weight: 400;
}

.messenger__time {
  align-self: flex-end;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-min);
  font-weight: 400;
  color: var(--color-text-grey);
}

.messenger__form {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.messenger__form input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}
.messenger__form input::placeholder {
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
}

.messenger__form button {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 400;
  background: #0066ff;
  color: white;
  cursor: pointer;
}
</style>
