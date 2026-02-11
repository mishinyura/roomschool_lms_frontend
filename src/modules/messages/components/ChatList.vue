<script setup>
import {defineProps} from "vue";
import { formatDateOrTime } from "@/utils/dateUtils.js";

const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
  selectedChatId: {
    type: Number,
    required: true,
  },
});

const getDate = (datetime) => {
  return formatDateOrTime(datetime);
};

const truncateText = (text, limit = 20) => {
  return text.length > limit ? text.slice(0, limit) + "_" : text;
};
</script>

<template>
  <div class="messanger__list">
    <div
      v-for="chat in props.chats"
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
          getDate(chat.datetimeLastMessage)
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messenger {
  // Список сообщений
  &__list {
    padding: 1em 0.5em;
    overflow-y: auto;
    border-radius: $radius-lg;
    background-color: $color-bg-white;
  }

  // Элемент списка (чат)
  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.5em;
    border-radius: $radius-lg;
    cursor: pointer;
    transition: background-color 0.1s;

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &:hover {
      background-color: #f1f1f1;
    }

    &.active {
      background-color: #e8f0ff;
    }
  }

  // Аватар
  &__avatar {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    overflow: hidden;
    border: $border-blue;
    border-radius: 100px;
    background-color: $color-bg-white;

    // Инициалы (фоллбэк)
    &::before {
      position: absolute;
      font-family: $font-family-montserrat;
      font-size: $font-size-text-sm;
      font-weight: 600;
      color: $color-text-blue;
      content: attr(data-bg);
    }

    img {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  // Блок информации
  &__info {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px;
  }

  &__recipient {
    flex-basis: 100%;
    font-family: $font-family-montserrat;
    font-size: $font-size-title-min;
    font-weight: 500;
  }

  &__last-message {
    overflow: hidden;
    font-family: $font-family-nunito;
    font-size: $font-size-text-min;
    color: $color-text-grey;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__datetime {
    font-size: 12px;
    color: #aaa;
  }
}
</style>