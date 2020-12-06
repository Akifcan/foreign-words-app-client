<script>
import AppSelectLanguage from "@/components/AppSelectLanguage.vue";
import AppCreateQuestion from "@/components/AppCreateQuestion.vue";

import { ref, watch } from "vue";
export default {
  components: {
    AppSelectLanguage,
    AppCreateQuestion,
  },
  setup() {
    const selectedLanguage = ref(null);
    const currentComponent = ref("AppSelectLanguage");

    watch(selectedLanguage, (newVal, oldVal) => {
      currentComponent.value = "AppCreateQuestion";
    });

    return {
      currentComponent,
      selectedLanguage,
    };
  },
};
</script>

<template>
  <div class="container">
    <component
      :is="currentComponent"
      :selectedLanguage="selectedLanguage"
      @language-selected="selectedLanguage = $event"
    ></component>
  </div>
</template>

<style lang="scss" scoped>
.select-language {
  padding: 2em;
  h1 {
    font-size: 2.5rem;
  }
}
</style>