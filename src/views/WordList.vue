<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AppWordCard from "@/components/AppWordCard.vue";
import { API_URL } from "../store/constants";

export default {
  components: {
    AppWordCard,
  },
  setup() {
    const store = useStore();

    store.dispatch("userWords");

    function imagePath(image) {
      if (image.startsWith("https")) {
        return image;
      } else {
        return `${API_URL}/${image}`;
      }
    }

    const userWordss = computed(() => store.state["userWords"]);

    return { userWordss, imagePath };
  },
};
</script>

<template>
  <div class="container">
    <h1>Word List</h1>
    <AppAlert v-if="!user">
      <h1>Giriş yapmadınız</h1>
      <p>
        Eğer kelimelerinizi herkese açık paylaşmak isterseniz üyelik
        oluşturabilirsiniz.
      </p>
    </AppAlert>
    <div v-if="userWordss">
      <div class="words" v-for="word in userWordss" :key="word._id">
        <div class="word-list">
          <router-link tag="a" :to="{ name: 'quiz', params: { id: word._id } }">
            <img :src="imagePath(word.thumbnailImage)" :alt="word.name" />
            <div class="info">
              <h1 class="language">İngilizce</h1>
              <h1>{{ word.name }}</h1>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.words {
  margin-top: 3em;
}
img {
  width: 100%;
}

.empty-yet {
  a {
    text-decoration: none;
  }
  text-align: center;

  h3 {
    margin: 2em 0;
  }
}
</style>