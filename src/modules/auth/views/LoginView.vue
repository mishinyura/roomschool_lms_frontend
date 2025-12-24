<template>
  <div class="auth">
    <div class="auth__container">
      <svg class="auth__icons">
        <symbol id="yandex-icon">
          <path
            d="M21.88,2h-4c-4,0-8.07,3-8.07,9.62a8.33,8.33,0,0,0,4.14,7.66L9,28.13A1.25,1.25,0,0,0,9,29.4a1.21,1.21,0,0,0,1,.6h2.49a1.24,1.24,0,0,0,1.2-.75l4.59-9h.34v8.62A1.14,1.14,0,0,0,19.82,30H22a1.12,1.12,0,0,0,1.16-1.06V3.22A1.19,1.19,0,0,0,22,2ZM18.7,16.28h-.59c-2.3,0-3.66-1.87-3.66-5,0-3.9,1.73-5.29,3.34-5.29h.94Z"
            style="fill: #d61e3b"
          />
        </symbol>
        <symbol id="vkontakte-icon">
          <path
            d="M21.54736,7H18.25688a.74281.74281,0,0,0-.65452.39156s-1.31237,2.41693-1.73392,3.231C14.73438,12.8125,14,12.125,14,11.10863V7.60417A1.10417,1.10417,0,0,0,12.89583,6.5h-2.474a1.9818,1.9818,0,0,0-1.751.8125s1.25626-.20312,1.25626,1.48958c0,.41974.02162,1.62723.04132,2.64a.72943.72943,0,0,1-1.273.50431,21.54029,21.54029,0,0,1-2.4982-4.54359A.69314.69314,0,0,0,5.5668,7C4.8532,7,3.42522,7,2.57719,7a.508.508,0,0,0-.47969.68481C3.00529,10.17487,6.91576,18,11.37917,18h1.87865A.74219.74219,0,0,0,14,17.25781V16.12342a.7293.7293,0,0,1,1.22868-.5315l2.24861,2.1127A1.08911,1.08911,0,0,0,18.223,18h2.95281c1.42415,0,1.42415-.98824.64768-1.75294-.54645-.53817-2.51832-2.61663-2.51832-2.61663A1.01862,1.01862,0,0,1,19.2268,12.307c.63737-.83876,1.67988-2.21175,2.122-2.79993C21.95313,8.70313,23.04688,7,21.54736,7Z"
            style="fill: #577fa8"
          />
        </symbol>
      </svg>
      <TheLoader v-if="loading" />
      <form v-else @submit.prevent="handleLogin" class="auth__form">
        <h1 class="auth__title">Вход в личный кабинет</h1>
        <div class="auth__inputs">
          <FormInput
            v-model.trim="email"
            label="Email, логин или телефон"
            type="text"
            name="username"
            placeholder="example@mail.com"
          />
          <FormInput
            v-model="password"
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
          />
        </div>
        <button class="auth__btn auth__btn_login" @click="handleLogin">Войти</button>
        <button class="auth__btn auth__btn_forgot" @click="$router.push({ name: 'forgot' })">
          Забыли пароль?
        </button>
      </form>
      <TheNotification v-if="list_errors.length > 0" v-model="list_errors"/>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/ui/FormInput.vue";
import TheLoader from "@/components/ui/TheLoader.vue";
import TheNotification from "@/components/ui/TheNotification.vue";
import { useAuthStore } from "@/stores/authStore.js";

export default {
  props: ['listErrorModel'],
  components: { FormInput, TheLoader, TheNotification },
  data() {
    return {
      email: "",
      password: "",
      loading: true,
      list_errors: [],
    };
  },
  methods: {
    async handleLogin() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const authStore = useAuthStore();
        await authStore.login({
          username: this.email,
          password: this.password,
        });
        this.$router.push({ name: "study" });
      } catch (e) {
        console.error("Ошибка входа:", e);
        alert("Ошибка входа. Проверь логин или пароль.");
        this.loading = false;
      }
    },
  },
  async mounted() {
    const authStore = useAuthStore();
    const data = await authStore.checkAuth();
    if (data) {
      this.$router.push({ name: "study" });
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.auth {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/media/images/auth-bg-elem1.png"),
    url("@/assets/media/images/auth-bg-elem2.png"),
    url("@/assets/media/images/auth-bg-elem3.png"),
    url("@/assets/media/images/auth-bg-elem7.png"),
    url("@/assets/media/images/auth-bg-elem9.png"),
    url("@/assets/media/images/auth-bg-elem4.png"),
    url("@/assets/media/images/auth-bg-elem2.png"),
    var(--color-bg-blue-radial-gradient);
  background-size: 20%, 20%, 10%, 20%, 15%, 5%, 20%, 100%;
  background-position: right bottom, left bottom, 30% 70%, 70% 20%, center 80%,
    28% 71%, right top, center;
  background-repeat: no-repeat;
  overflow: hidden;
}
.auth__container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.auth__icons{
  display: none;
}
.auth__title {
  margin-bottom: 30px;
  color: var(--color-text-white);
}
.auth__form {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  margin-bottom: 30px;
  padding: 35px 45px;
  /* box-sizing: border-box; */
  border-radius: 20px;
  background: radial-gradient(
    circle,
    rgba(0, 133, 255, 0) 0%,
    rgba(0, 52, 101, 0.55) 90%
  );
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(5px) saturate(150%);
}
.auth__inputs {
  margin-bottom: 30px;
}
.auth__btn {
  display: block;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-family: "Montserrat";
  font-size: 1rem;
}
.auth__btn_forgot {
  align-self: flex-start;
  margin-bottom: 20px;
  background-color: #a0a0a0;
  color: #fff;
}
.auth__btn_login {
  margin-bottom: 30px;
  padding: 1em 2em;
  background-color: #003465;
  color: #fff;
}
.choise__title {
  font-family: var(--font-family-text-montserrat);
  margin-bottom: 50px;
}
.choise__item {
  /* display: none; */
  padding: 20px 40px;
  border: 1px solid rgb(189, 189, 189);
}
.choise__item:not(:last-child) {
  margin-bottom: 10px;
}
.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.scale-enter-to,
.scale-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* .loader {
    position: fixed;
    top: 50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.512);
    color: #fff;
    background-color: #003465;
    transform: rotateZ(45deg);
    perspective: 1000px;
}
.loader:before,
.loader:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
}
.loader:after {
    color: #8968e2;
    transform: rotateY(70deg);
    animation-delay: .4s;
}

@keyframes rotate {
    0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
    }
}

@keyframes rotateccw {
    0% {
    transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
    transform: translate(-50%, -50%) rotate(-360deg);
    }
}

@keyframes spin {
    0%,
    100% {
    box-shadow: .2em 0px 0 0px currentcolor;
    }
    12% {
    box-shadow: .2em .2em 0 0 currentcolor;
    }
    25% {
    box-shadow: 0 .2em 0 0px currentcolor;
    }
    37% {
    box-shadow: -.2em .2em 0 0 currentcolor;
    }
    50% {
    box-shadow: -.2em 0 0 0 currentcolor;
    }
    62% {
    box-shadow: -.2em -.2em 0 0 currentcolor;
    }
    75% {
    box-shadow: 0px -.2em 0 0 currentcolor;
    }
    87% {
    box-shadow: .2em -.2em 0 0 currentcolor;
    }
} */
</style>
