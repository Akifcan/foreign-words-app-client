<script>
import AppQuestion from "@/components/AppQuestion.vue";
import AppFinish from "@/components/AppFinish.vue";
import { ref } from "vue";
export default {
  components: {
    AppFinish,
    AppQuestion,
  },
  setup() {
    const currentComponent = ref("AppQuestion");
    return {
      currentComponent,
    };
  },
};
</script>

<template>
  <div class="container">
    <component
      @solve-again="currentComponent = 'AppQuestion'"
      @finish-quiz="currentComponent = 'AppFinish'"
      :is="currentComponent"
    />
  </div>
</template>