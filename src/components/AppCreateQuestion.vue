<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AppTranslationResult from "@/components/AppTranslationResult.vue";
export default {
  components: {
    AppTranslationResult,
  },
  props: {
    selectedLanguage: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const word = ref("");
    const process = ref("add");

    onMounted(() => {
      store.commit("setQuestionName", props.selectedLanguage.name);
    });

    const questions = computed(() => store.state["questions"]);

    function showTranslationResult() {
      process.value = "approve";
    }

    function addNewQuestion(question) {
      store.commit("addQuestion", question);
      word.value = "";
      process.value = "add";
    }

    return {
      addNewQuestion,
      process,
      showTranslationResult,
      word,
      questions,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>
      {{ selectedLanguage.name }}
      kelimeleri
    </h1>
    <p
      v-html="
        questions.list.length == 0
          ? 'Henüz soru oluşturmaınız'
          : `Toplam
      <b>${questions.list.length}</b> soru oluşturdunuz`
      "
    ></p>
    <button
      v-if="questions.list.length"
      @click="$router.push({ name: 'confirmQuestions' })"
      class="submit"
    >
      Görüntüle
    </button>
    <div class="question-info">
      <img :src="selectedLanguage.image" :alt="selectedLanguage.title" />
      <h1>{{ selectedLanguage.title }}</h1>
    </div>
    <div class="add-question" v-if="process == 'add'">
      <div class="form-group">
        <label for="word">Kelime</label>
        {{ word }}
        <input
          v-model="word"
          required
          minlength="2"
          type="text"
          placeholder="Kelimenizi girin"
        />
      </div>
      <p class="info">En az iki kelime girin.</p>
      <button
        @click="showTranslationResult"
        :disabled="word.trim().length < 2"
        class="submit"
      >
        Ekle
      </button>
    </div>
    <AppTranslationResult
      v-if="process == 'approve'"
      :word="word"
      @add-new-question="addNewQuestion($event)"
      @enter-word-again="process = 'add'"
    />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
.question-info {
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info {
  margin: 1em 0;
  font-size: 0.7em;
}
input:invalid {
  outline: 3px solid var(--color-red-900);
}
input:valid {
  outline: 3px solid var(--color-light-green-900);
}
</style>