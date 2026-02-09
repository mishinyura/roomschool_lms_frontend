<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 2em;
  box-sizing: border-box;
  background-image: url("@/assets/media/images/auth-bg-elem1.png"),
    url("@/assets/media/images/auth-bg-elem2.png"),
    url("@/assets/media/images/auth-bg-elem3.png"),
    url("@/assets/media/images/auth-bg-elem7.png"),
    url("@/assets/media/images/auth-bg-elem9.png"),
    url("@/assets/media/images/auth-bg-elem4.png"),
    url("@/assets/media/images/auth-bg-elem2.png"),
    $color-bg-blue-radial-gradient;
  background-size: 20%, 20%, 10%, 20%, 15%, 5%, 20%, 100%;
  background-position: right bottom, left bottom, 30% 70%, 70% 20%, center 80%,
    28% 71%, right top, center;
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>