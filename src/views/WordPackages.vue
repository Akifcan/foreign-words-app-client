<script>
import AppWordCard from "@/components/AppWordCard.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    AppWordCard,
  },
  setup() {
    const store = useStore();
    const words = computed(() => store.state["publicWords"]);

    return {
      words,
    };
  },
};
</script>


<template>
  <div>
    <main class="container words">
      <h1>Kelime Listeleri</h1>
      <div class="words" v-for="word in words" :key="word._id">
        <AppWordCard :word="word" :isPublicPage="true" />
      </div>
    </main>
  </div>
</template>

