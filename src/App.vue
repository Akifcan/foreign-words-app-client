<script>
import Splash from "@/components/AppSplash.vue";
export default {
  components: {
    Splash,
  },
};
</script>

<template>
  <div>
    <Splash />
    <router-view></router-view>
  </div>
</template>

<style src='./assets/css/main.css'></style>