<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { API_URL } from "../store/constants";
export default {
  setup(props, { emit }) {
    let msg = new SpeechSynthesisUtterance();
    msg.lang = "en";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const currentQuiz = ref(null);
    const questions = ref([]);
    const answerLetter = ref("");
    const currentQuestion = ref(0);
    const result = ref("");
    /* 
        0 - show choose
        1 - show info
        2 - fill in the blanks    
    */

    function nextQuestion(answer = null) {
      console.log(answer);
      if (questions.value[currentQuestion.value].type == 0) {
        if (answer == questions.value[currentQuestion.value].correct) {
          result.value = "Doğru cevap tebrikler 🎉";
          console.log("doğru cevap");
        } else {
          result.value = "Hatalı cevap 😑";
          console.log("yanlış cevap");
        }
      }
      if (questions.value[currentQuestion.value].type == 2) {
        if (answer == questions.value[currentQuestion.value].letter) {
          result.value = "Doğru cevap tebrikler 🎉";
          console.log("doğru");
        } else {
          result.value = "Hatalı cevap 😑";
          console.log("no!");
        }
      }
      setTimeout(() => {
        if (currentQuestion.value == questions.value.length - 1) {
          emit("finish-quiz");
        } else {
          currentQuestion.value++;
        }
        result.value = "";
      }, 1500);
    }

    function speech(word) {
      msg.text = word;
      window.speechSynthesis.speak(msg);
    }

    onMounted(async () => {
      const response = await fetch(
        `${API_URL}/single-post/${route.params.id}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.status) {
        currentQuiz.value = data.word;
        currentQuiz.value.list.forEach((item) => {
          const questionType = Math.floor(Math.random() * 3);
          if (questionType == 0) {
            questions.value.push({ ...item, type: 0 });
          }
          if (questionType == 1) {
            questions.value.push({
              word: item.correct,
              mean: item.question,
              type: 1,
            });
          }
          if (questionType == 2) {
            const wordArr = item.correct.split("");
            const letterCount = Math.floor(
              Math.random() * item.correct.length - 1
            );
            const letter = wordArr[letterCount];
            let question = [];
            for (let i = 0; i < item.correct.length; i++) {
              if (i == letterCount) {
                continue;
              }
              question.push(wordArr[i]);
            }
            questions.value.push({
              word: item.correct,
              letter,
              letterCount,
              question,
              type: 2,
            });
          }
        });
      } else {
        router.push({ name: "notFound" });
      }
    });

    return {
      result,
      answerLetter,
      speech,
      questions,
      nextQuestion,
      currentQuestion,
      currentQuiz,
    };
  },
};
</script>

<template>
  <div class="container" v-if="currentQuiz">
    <div class="questions">
      <div class="question">
        <div class="answer" v-if="questions[currentQuestion].type == 0">
          <p>{{ result }}</p>
          <div class="title">{{ questions[currentQuestion].question }}</div>
          <div class="answers">
            <div
              v-for="(answer, index) in questions[currentQuestion].answers"
              :key="answer"
              :tabindex="index"
              @click="nextQuestion(answer)"
              class="answer"
            >
              {{ answer }}
            </div>
          </div>
        </div>
        <div class="mean" v-if="questions[currentQuestion].type == 1">
          <h1>{{ questions[currentQuestion].word }}</h1>
          <h3>{{ questions[currentQuestion].mean }}</h3>
          <button
            title="Sesli oku"
            class="speech"
            @click="speech(questions[currentQuestion].word)"
          >
            <i class="fa fa-microphone-alt"></i>
          </button>
          <button @click="nextQuestion" class="submit">Devam Et</button>
        </div>
        <div class="fill" v-if="questions[currentQuestion].type == 2">
          <p>{{ result }}</p>
          <h3 class="text">
            <p
              v-for="(letter, index) in questions[currentQuestion].question"
              :key="letter"
            >
              <input
                maxlength="1"
                v-model="answerLetter"
                type="text"
                size="1"
                v-if="questions[currentQuestion].letterCount == index"
              />
              <span>{{ letter }}</span>
            </p>
          </h3>
          <button
            :disabled="answerLetter.trim().length < 0"
            class="speech"
            title="Sesli oku"
            @click="speech(questions[currentQuestion].question)"
          >
            <i class="fa fa-microphone-alt"></i>
          </button>
          <button @click="nextQuestion(answerLetter)" class="submit">
            Devam Et
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 1em;
}
.submit {
  width: 100%;
}
.question {
  text-transform: capitalize;
  width: 100%;
  .answer {
    padding: 1em;
    &:nth-child(even) {
      color: white;
      background: var(--color-blue-900);
    }
    &:hover,
    &:focus {
      background: var(--color-blue-800);
    }
  }
  .title {
    padding: 1em;
    color: white;
    background: var(--color-blue-800);
  }
  .mean,
  .fill {
    padding: 1em;
    border: 1px solid var(--color-blue-900);
    & > * {
      margin: 1em 0;
    }
    h3 {
      font-size: 1.7rem;
      display: flex;
      letter-spacing: 3px;
      align-items: center;
      input {
        margin: 0 3px;
        transform: translateY(-3px);
      }
    }
  }
  .mean {
    height: auto;
    h1 {
      font-size: 3rem;
      font-weight: lighter;
    }
  }
  .speech {
    padding: 1em;
  }
}
</style>