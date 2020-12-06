<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");

    function login(e) {
      e.preventDefault();
      store.dispatch("Auth/login", {
        email: email.value,
        password: password.value,
      });
    }

    return {
      login,
      email,
      password,
    };
  },
};
</script>

<template>
  <div>
    <h1>Yabancı Kelimeler'e giriş yapın</h1>
    <form @submit.once="login">
      <div class="form-group">
        <label for="email">E-Posta Adresin</label>
        <input
          required
          maxlength="50"
          v-model="email"
          type="email"
          id="email"
          placeholder="E-Posta adresin"
        />
      </div>
      <div class="form-group">
        <label for="password">Şifren</label>
        <input
          required
          minlength="5"
          maxlength="100"
          v-model="password"
          type="password"
          id="password"
          placeholder="Çok Gizli"
        />
      </div>
      <button type="submit" class="submit">Giriş Yap</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>
h1 {
  margin-bottom: 1em;
}
.form-group {
  text-align: left;
}
.submit {
  width: 100%;
}
</style>