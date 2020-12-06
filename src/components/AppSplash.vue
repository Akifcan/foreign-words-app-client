<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const splash = ref(null);
    const showSplash = ref(true);

    onMounted(() => {
      splash.value.addEventListener("animationend", (_) => {
        showSplash.value = false;
      });
    });

    return {
      splash,
      showSplash,
    };
  },
};
</script>

<template>
  <div class="splash" ref="splash" v-if="showSplash">
    <img :src="require('@/assets/images/logo.png')" alt="" />
    <h2>Foreign Words</h2>
  </div>
</template>

<style lang="scss">
.splash {
  animation: splashEnd 1s forwards;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  min-height: 100vh;
  background: var(--color-blue-900);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  flex-direction: column;
  color: white;
  h2 {
    font-weight: lighter;
  }
  @keyframes splashEnd {
    100% {
      opacity: 0;
      display: none;
    }
  }
}
</style>