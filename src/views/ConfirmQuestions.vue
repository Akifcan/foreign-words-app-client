<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { questionsIsExists } from "@/utils/properties";
export default {
  setup() {
    const store = useStore();
    const questions = computed(() => store.state.questions);
    onMounted(() => questionsIsExists());
    function createWords() {
      store.dispatch("createWords");
    }
    return {
      createWords,
      questions,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>Oluşturduğunuz sorular</h1>
    <h2>{{ questions.name }}</h2>
    <table v-for="question in questions.list" :key="question">
      <thead>
        <th>Soru</th>
        <th>Cevap</th>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ question.question }}
          </td>
          <td>
            {{ question.correct }}
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="createWords" class="submit">Ekle</button>
  </div>
</template>

<style lang="scss" scoped>
tr {
  margin-bottom: 1em;
}
h1 {
  margin-top: 1em;
  font-weight: normal;
}
h2 {
  text-transform: capitalize;
}
.submit {
  width: 100%;
}
</style>