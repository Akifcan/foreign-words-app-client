<script>
import { useStore } from "vuex";
import { API_URL } from "../store/constants";
export default {
  props: {
    word: {
      type: Object,
    },
    isPublicPage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log(props);
    const store = useStore();
    function sharePublic() {
      store.dispatch("sharePublic", props.word._id);
    }
    function imagePath(image) {
      return `${API_URL}/${image}`;
    }
    return {
      sharePublic,
      imagePath,
    };
  },
};
</script>

<template>
  <div class="word-list">
    <div
      tabindex="1"
      role="button"
      @click="sharePublic"
      class="share"
      v-if="user && !isPublicPage"
    >
      <button class="submit share-text">Paylaş</button>
      <button class="submit" type="button"><i class="fa fa-share"></i></button>
    </div>
    <router-link tag="a" :to="{ name: 'quiz', params: { id: word._id } }">
      <img :src="imagePath(word.thumbnailImage)" :alt="word.name" />
      <div class="info">
        <h1 class="language">İngilizce</h1>
        <h1>{{ word.name }}</h1>
      </div>
    </router-link>
    <h3>Oluşturan: {{ word.user[0].name }}</h3>
  </div>
</template>


<style lang="scss" scoped>
img {
  width: 100%;
}
.share {
  float: right;
  display: flex;
  top: 2em;
  right: 2em;
  .share-text {
    transition: width 250ms;
    padding-left: 0;
    padding-right: 0;
    border-left-width: 0;
    border-right-width: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  &:focus,
  &:hover {
    .share-text {
      width: 5em;
    }
  }
}
</style>