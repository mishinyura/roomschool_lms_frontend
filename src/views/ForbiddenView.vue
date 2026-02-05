<template>
    <div>
        <h1>{{name}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Пытаетесь попасть куда то не туда"
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
</style>