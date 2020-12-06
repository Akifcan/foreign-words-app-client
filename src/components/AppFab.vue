<template>
  <router-link
    v-if="!user"
    :to="{ name: 'auth' }"
    title="Giriş Yapın"
    aria-label="Giriş Yapın"
    class="floating-action-button"
  >
    <i class="fa fa-sign-in-alt fa-2x"></i>
  </router-link>
  <button
    @click="$store.dispatch('Auth/logout')"
    class="floating-action-button"
    v-if="user"
  >
    <i class="fa fa-door-open fa-2x"></i>
  </button>
</template>


<style lang="scss" scoped>
.floating-action-button {
  text-decoration: none;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.4);
  color: white;
  display: grid;
  place-items: center;
  position: fixed;
  bottom: 7em;
  right: 2em;
  background: var(--color-blue-900);
  height: 4.5em;
  width: 4.5em;
  border-radius: 50%;
}
</style>