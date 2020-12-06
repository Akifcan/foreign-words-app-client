<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    word: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    console.log(props);
    const store = useStore();
    const translationResult = computed(() => store.state["translationResult"]);
    onMounted(() => {
      store.dispatch("translateWord", props.word);
    });

    async function addQuestion() {
      const commonWords = await import("@/assets/json/commonWords.json");
      const question = { answers: [], correct: "", question: props.word };
      question.correct = translationResult.value.means[0];

      question.answers.push(translationResult.value.means[0]);
      for (let i = 0; i < 3; i++) {
        question.answers.push(
          commonWords.commonWords[
            Math.floor(Math.random() * commonWords.commonWords.length - 1)
          ]
        );
      }

      emit("add-new-question", question);
    }

    return {
      addQuestion,
      translationResult,
    };
  },
};
</script>


<template>
  <div v-if="translationResult">
    <button @click="addQuestion" class="submit" v-if="translationResult.status">
      Kelimelere Ekle
    </button>
    <table border="1" v-if="translationResult.status">
      <thead>
        <th>Anlam</th>
      </thead>
      <tbody>
        <tr v-for="mean in translationResult.means" :key="mean">
          <td>
            {{ mean }}
          </td>
        </tr>
      </tbody>
    </table>
    <table border="1" v-if="translationResult.status">
      <thead>
        <th>Terim</th>
      </thead>
      <tbody>
        <tr v-for="otherTerm in translationResult.otherTerm" :key="otherTerm">
          <td>
            {{ otherTerm }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!translationResult.status">
      <h1>{{ translationResult.message }}</h1>
      <button class="submit" @click="$emit('enter-word-again')">
        Tekrardan kelime girin.
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>