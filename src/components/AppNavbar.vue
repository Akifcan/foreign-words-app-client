<template>
  <nav>
    <router-link tag="h1" :to="{ name: 'wordPackages' }">
      <h1>Foreign Words</h1>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  color: white;
  display: grid;
  place-items: center;
  min-height: 10vh;
  box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.5);
  background: var(--color-blue-900);
  h1 {
    font-weight: lighter;
    font-size: 1.5rem;
  }
}
a {
  color: white !important;
}
</style>