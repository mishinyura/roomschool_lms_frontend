<script setup>
import { ref } from "vue";
import profileInfoJson from "@/mocks/profile-cards.json";
import ProfileCardInfo from "../components/ProfileCardInfo.vue";
import infoJson from "@/mocks/get-profile-info-mock.json";
// import personJson from "@/mocks/get-profile-person-mock.json";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();

const cards = ref(profileInfoJson);

const getProfileData = ref(infoJson);
// const getPersonData = ref(personJson);
</script>

<template>
  <article class="profile">
    <h1 class="profile__title">Профиль</h1>
    <div class="profile__head">
      <div class="profile__info">
        <div class="profile__avatar">
          <img
            :src="getProfileData.avatar"
            alt=""
            v-if="getProfileData.avatar"
          />
        </div>
        <div class="profile__rating">{{ getProfileData.rating }}</div>
        <div class="profile__coins">{{ getProfileData.coins }}</div>
      </div>
      <div class="profile__control">
        <button class="profile__logout" @click="authStore.logout">Выход</button>
      </div>
    </div>
    <section class="profile__cards">
      <ProfileCardInfo
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
      />
    </section>
    <section class="profile__kids" if></section>
  </article>
</template>

<style lang="scss" scoped>
.profile__title {
  @include page-title;
}
.profile__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}
.profile__info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 120px;
}
.profile__avatar {
  flex-basis: 100%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-image: url("@/assets/media/images/no-user-photo.webp");
  background-size: cover;
  background-position: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.profile__rating {
  @include title;
}
.profile__rating::before {
  content: "Рейтинг: ";
  @include title;
}
.profile__coins {
  @include title;
}
.profile__coins::before {
  content: "Монеты: ";
  @include title;
}
.profile__control {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profile__logout {
  @include btn-blue-classic;
}
.profile__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
</style>