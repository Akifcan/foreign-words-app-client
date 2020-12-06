<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  setup() {
    const store = useStore();

    const name = ref("");
    const email = ref("");
    const password = ref("");

    function signUp(e) {
      e.preventDefault();
      store.dispatch("Auth/signUp", {
        name: name.value,
        email: email.value,
        password: password.value,
      });
    }

    return {
      name,
      email,
      password,
      signUp,
    };
  },
};
</script>

<template>
  <div>
    <h1>Yabancı Kelimeler'e kayıt olun</h1>
    <form @submit.once="signUp">
      <div class="form-group">
        <label for="email">E-Posta Adresin</label>
        <input
          v-model="email"
          required
          maxlength="50"
          type="email"
          id="email"
          placeholder="E-Posta adresin"
        />
      </div>
      <div class="form-group">
        <label for="password">Şifren</label>
        <input
          v-model="password"
          minlength="5"
          required
          maxlength="100"
          type="password"
          id="password"
          placeholder="Çok Gizli"
        />
      </div>
      <div class="form-group">
        <label for="name">Adın</label>
        <input
          v-model="name"
          maxlength="50"
          required
          type="text"
          id="name"
          placeholder="Tanıştığımıza memnun oldum"
        />
      </div>
      <button type="submit" class="submit">Kayıt Ol</button>
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