<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppLogin from "@/components/AppLogin.vue";
import AppSignUp from "@/components/AppSignUp.vue";
import { ref } from "vue";

export default {
  components: {
    AppNavbar,
    AppLogin,
    AppSignUp,
  },
  setup() {
    const currentComponent = ref("AppLogin");

    return {
      currentComponent,
    };
  },
};
</script>

<template>
  <div class="auth">
    <AppNavbar />
    <div class="container">
      <div class="row">
        <button class="login" @click="currentComponent = 'appLogin'">
          Giriş Yap
        </button>
        <button class="sign-up" @click="currentComponent = 'appSignUp'">
          Üye Ol
        </button>
      </div>
      <AppAlert class="primary" v-if="authMessage">{{ authMessage }}</AppAlert>
      <img height="130" :src="require('@/assets/images/auth.svg')" alt="" />
      <component :is="currentComponent" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.auth {
  background: var(--color-main-background);
  text-align: center;
  .container {
    min-height: 90vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    & > * {
      margin: 1em 0;
    }
  }
  .row {
    display: flex;
    gap: 1em;
    button {
      border: none;
      padding: 1em 3em;
      border-radius: 0.3em;
      box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
      color: white;
    }
  }
  .login {
    background: var(--color-blue-900);
  }
  .sign-up {
    background: var(--color-light-green-900);
  }
}
</style>