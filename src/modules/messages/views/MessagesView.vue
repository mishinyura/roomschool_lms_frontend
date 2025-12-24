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

<script>
import chatsJson from "@/mocks/chats.json";
import ChatList from "../components/ChatList.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  name: "MessagesView",
  components: { ChatList, ChatWindow },

  data() {
    return {
      chats: chatsJson,
      selectedChatId: null,
    };
  },

  computed: {
    selectedChat() {
      return this.chats.find((c) => c.id === this.selectedChatId);
    },
  },

  methods: {
    selectChat(chatId) {
      this.selectedChatId = chatId;
    },
    getBgAvatar(name) {
      if (!name) return "";

      const words = name.trim().split(/\s+/);

      if (words.length === 1) {
        return words[0].slice(0, 1).toUpperCase();
      }

      return (words[0][0] + words[1][0]).toUpperCase();
    },
  },
};
</script>

<style scoped>
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