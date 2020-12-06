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
      return `${API_URL}/${image}`;
    }

    const userWords = computed(() => store.state["userWords"]);

    return { userWords, imagePath };
  },
};
</script>

<template>
  <div class="container" v-if="userWords">
    <h1>Word List</h1>
    <AppAlert v-if="!user">
      <h1>Giriş yapmadınız</h1>
      <p>
        Eğer kelimelerinizi herkese açık paylaşmak isterseniz üyelik
        oluşturabilirsiniz.
      </p>
    </AppAlert>
    <div class="words" v-for="word in userWords" :key="word._id">
      <div class="word-list">
        <router-link
          tag="a"
          :to="{ name: 'quiz', params: { id: word[0]._id } }"
        >
          <img :src="imagePath(word[0].thumbnailImage)" :alt="word[0].name" />
          <div class="info">
            <h1 class="language">İngilizce</h1>
            <h1>{{ word[0].name }}</h1>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <div v-if="userWords.length > 0">
      <div class="words" v-for="word in userWords" :key="word._id">
        <AppWordCard :word="word" />
      </div>
    </div>

    <div class="empty-yet" v-else>
      <img
        style="width: 250px"
        :src="require('@/assets/images/empty.png')"
        alt="no word list created"
      />

      <h3>Henüz bir kelime listesi oluşturmadınız.</h3>
      <router-link :to="{ name: 'create' }" tag="button" class="submit"
        >Oluşturmaya başlayın</router-link
      >
    </div> -->
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