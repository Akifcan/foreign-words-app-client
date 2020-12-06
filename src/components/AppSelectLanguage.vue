<script>
import { languages } from "@/utils/properties";
import { ref } from "vue";
export default {
  setup() {
    const selectLanguage = ref(languages.value[0]);
    const name = ref(null);
    return {
      name,
      selectLanguage,
      languages,
    };
  },
};
</script>

<template>
  <section class="select-language">
    <h1>Dil Seçin</h1>
    <div class="mt-2 select">
      <div class="form-group select-item">
        <label for="name">İsim Belirleyin</label>
        <input id="name" v-model="name" type="text" placeholder="İsim" />
      </div>
      <div class="form-group select-item">
        <label for="selectLanguage">Dil Seçin</label>
        <select id="selectLanguage" v-model="selectLanguage">
          <option
            v-for="language in languages"
            :key="language"
            :value="language"
          >
            {{ language.title }}
          </option>
        </select>
      </div>
      <button
        @click="$emit('language-selected', { ...selectLanguage, name })"
        :disabled="selectLanguage == null || name == null"
        class="submit"
      >
        Oluştur
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.select-language {
  width: 100%;
  margin-bottom: 1em;
}
.select {
  display: flex;
  flex-direction: column;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
  }
  gap: 1em;
  .select-item {
    flex: 1;
  }
}
</style>