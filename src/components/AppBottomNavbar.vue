<template>
  <div class="bottom-navbar">
    <router-link :to="{ name: 'wordPackages' }" class="bottom-navbar-item">
      <i class="fa fa-language fa-2x"></i>
      <p>Hazır Listeler</p>
    </router-link>
    <router-link tag="div" class="bottom-navbar-item" :to="{ name: 'create' }">
      <i class="fa fa-plus-circle fa-2x"></i>
      <p>Kendin Oluştur</p>
    </router-link>
    <router-link
      tag="div"
      :to="{ name: 'myWordList' }"
      class="bottom-navbar-item"
    >
      <i class="fa fa-user-check fa-2x"></i>
      <p>Kelime Listem</p>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.bottom-navbar {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1em 0.5em;
  background: var(--color-blue-900);
  .bottom-navbar-item {
    color: white;
    text-align: center;
    font-size: 1rem;
  }
}
</style>