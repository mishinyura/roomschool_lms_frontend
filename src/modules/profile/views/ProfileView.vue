<template>
    <div class="main__container profile">
        <section class="profile__cards">
            <ProfileCardInfo v-for="(card, index) in cards" :key="index" :card="card"/>
        </section>
        <section class="profile__kids" if>

        </section>
    </div>
</template>

<script>
import profileInfoJson from '@/mocks/profile-cards.json'
import ProfileCardInfo from '../components/ProfileCardInfo.vue'

export default {
    
    data() {
        return {
            cards: profileInfoJson
        }
    },
    components: {
        ProfileCardInfo
    }
}
</script>

<style>
 .profile__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
 }
</style>