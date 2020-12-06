<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppBottomNavbar from "@/components/AppBottomNavbar.vue";
import AppFab from "@/components/AppFab.vue";

import objectid from "bson-objectid";
import { nanoid } from "nanoid";
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  components: {
    AppNavbar,
    AppFab,
    AppBottomNavbar,
  },
  setup() {
    const store = useStore();
    store.dispatch("publicWords");
    if (localStorage.userToken) {
      store.dispatch("Auth/autoLogin");
    }

    if (!localStorage.userId) {
      localStorage.userId = objectid();
    }
  },
};
</script> 

<template>
  <section class="dashboard">
    <AppFab />
    <AppNavbar />
    <router-view></router-view>
    <AppBottomNavbar />
  </section>
</template>

<style lang="scss">
.dashboard {
  min-height: 150vh;
  background: var(--color-main-background);
}
</style>