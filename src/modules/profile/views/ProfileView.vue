<script setup>
import {ref} from 'vue'
import profileInfoJson from '@/mocks/profile-cards.json'
import ProfileCardInfo from '../components/ProfileCardInfo.vue'

const cards = ref(profileInfoJson)
</script>

<template>
    <article class="profile">
        <h1 class="profile__title">Профиль</h1>
        <div class="profile__head">
            <button class="profile__logout">Выход</button>
        </div>
        <section class="profile__cards">
            <ProfileCardInfo v-for="(card, index) in cards" :key="index" :card="card"/>
        </section>
        <section class="profile__kids" if>

        </section>
    </article>
</template>

<style lang="scss" scoped>
.profile__logout{
    @include btn-blue-classic;
    margin-bottom: 20px;
}
 .profile__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
 }
</style>