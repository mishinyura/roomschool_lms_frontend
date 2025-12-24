<template>
    <div>
        <h1>{{name}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Мы не нашли такой страницы"
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