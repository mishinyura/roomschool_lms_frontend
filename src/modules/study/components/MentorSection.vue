<script setup>
</script>

<template>
  <section class="mentor">
    <div class="mentor__messenger">
      <div class="mentor__head">
        <div class="mentor__image">
          <img src="@/assets/media/images/no-user-photo.webp" alt="" />
        </div>
        <span> Mentor </span>
      </div>
      <ul class="mentor__messages">
        <li class="mentor__message mentor__message_mentor">
            Привет! Давай вместе по тренируемся на полученных знаниях. Я готов пройти вместе с тобой и помочь тебе в решении практического задания. Ты готов?
        </li>
        <li class="mentor__message mentor__message_user">OK</li>
        <li class="mentor__message mentor__message_mentor">OK</li>
      </ul>
    </div>
    <div class="mentor__control">
      <button class="mentor__send">SEND</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.mentor {
  display: flex;
  flex-direction: column;
  border-radius: $radius-lg;
  background-color: $color-section-white;

  &__messenger {
    flex-grow: 1;
    padding: 1em;
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

    &_user {
      align-self: flex-end;
      background-color: $color-card-blue;
    }

    &_mentor {
      align-self: flex-start;
    }
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 1em;
  }

  &__send {
    @include btn-blue-classic;
  }
}
</style>