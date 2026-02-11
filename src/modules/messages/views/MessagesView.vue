<script setup>
import { ref, computed } from "vue";
import chatsJson from "@/mocks/chats.json";
import ChatList from "../components/ChatList.vue";
import ChatWindow from "../components/ChatWindow.vue";

const chats = ref(chatsJson);
const selectedChatId = ref(1);

const selectedChat = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChatId.value);
});

const selectChat = (chatId) => {
  this.selectedChatId = chatId;
};

// const getBgAvatar = (name) => {
//   if (!name) return "";

//   const words = name.trim().split(/\s+/);

//   if (words.length === 1) {
//     return words[0].slice(0, 1).toUpperCase();
//   }

//   return (words[0][0] + words[1][0]).toUpperCase();
// };
</script>

<template>
  <div class="main__container messenger">
    <ChatList
      :chats="chats"
      :selectedChatId="selectedChatId"
      @select-chat="selectChat"
    />

    <ChatWindow v-if="selectedChat" :chat="selectedChat" />

    <div v-else class="empty-chat">Выберите чат, чтобы начать общение</div>
  </div>
</template>

<style lang="scss" scoped>
.messenger {
  display: grid;
  grid-template-columns: 20em 1fr;
  gap: 10px;
  height: 100%;
  box-sizing: border-box;
}
.messages-view {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f9f9f9;
}

.empty-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 14px;
}
</style>