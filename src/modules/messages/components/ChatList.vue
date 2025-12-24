<template>
  <div class="messanger__list">
    <div
      v-for="chat in chats"
      :key="chat.id"
      :class="['messenger__item', { active: chat.id === selectedChatId }]"
      @click="$emit('select-chat', chat.id)"
    >
      <div class="messenger__avatar" :data-bg="$parent.getBgAvatar(chat.name)">
        <img
          v-if="chat.image"
          src="@/assets/media/images/logo-adm.png"
          alt="avatar"
        />
      </div>
      <div class="messenger__info">
        <span class="messenger__recipient">{{ chat.name }}</span>

        <p class="messenger__last-message">
          {{ truncateText(chat.lastMessage) }}
        </p>
        <span class="messenger__datetime">{{
          date(chat.datetimeLastMessage)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateOrTime } from "@/utils/dateUtils.js";

export default {
  name: "ChatList",
  props: ["chats", "selectedChatId"],
  methods: {
    date(datetime) {
      return formatDateOrTime(datetime);
    },
    truncateText(text, limit = 20) {
      return text.length > limit ? text.slice(0, limit) + "…" : text;
    },
  },
};
</script>

<style>
.messanger__list {
  padding: 1em 0.5em;
  border-radius: var(--radius-lg);
  overflow-y: auto;
  background-color: var(--color-bg-white);
}

.messenger__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5em;
  border-radius: var(--radius-lg);
  transition: background-color 0.1s;
  cursor: pointer;
}
.messenger__item:not(:last-child) {
  margin-bottom: 5px;
}
.messenger__item:hover {
  background-color: #f1f1f1;
}

.messenger__item.active {
  background-color: #e8f0ff;
}

.messenger__avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  overflow: hidden;
  border: var(--border-blue);
  border-radius: 100px;
  background-color: var(--color-bg-white);
}

.messenger__avatar::before {
  position: absolute;
  content: attr(data-bg);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-text-sm);
  font-weight: 600;
  color: var(--color-text-blue);
}

.messenger__avatar img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.messenger__info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
  flex-grow: 1;
}

.messenger__recipient {
  flex-basis: 100%;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-title-min);
  font-weight: 500;
}

.messenger__last-message {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-family-nunito);
  font-size: var(--font-size-text-min);
  color: var(--color-text-grey);
}

.messenger__datetime {
  font-size: 12px;
  color: #aaa;
  float: right;
}
</style>