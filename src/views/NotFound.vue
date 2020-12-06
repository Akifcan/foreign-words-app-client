<script>
import AppNavbar from "@/components/AppNavbar.vue";
import App404 from "@/components/App404.vue";
export default {
  components: {
    AppNavbar,
    App404,
  },
};
</script>

<template>
  <div>
    <AppNavbar />
    <div class="container">
      <h1>Üzgünüm Bu Sayfayı Bulamadım 😿</h1>
      <div class="buttons">
        <router-link tag="button" :to="{ name: 'create' }">
          <button class="submit">Kelime Listesi Oluştur</button>
        </router-link>
        <router-link tag="button" :to="{ name: 'myWordList' }">
          <button
            style="background-color: var(--color-light-green-900)"
            class="submit"
          >
            Kelime Listem
          </button>
        </router-link>
        <router-link tag="button" :to="{ name: 'wordPackages' }">
          <button
            style="background-color: var(--color-amber-900)"
            class="submit"
          >
            Kelime Listeleri
          </button>
        </router-link>
      </div>
      <App404></App404>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.container {
  text-align: center;
}
button {
  margin: 0.5em 1em;
}
button:nth-of-type(2) {
  background-color: var(--color-light-green-900);
}
button:nth-of-type(3) {
  background-color: var(--color-amber-900);
}
</style>