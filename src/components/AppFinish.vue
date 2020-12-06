<template>
  <div class="finish">
    <img
      width="350"
      :src="require('@/assets/images/finish.png')"
      alt="finish"
    />
    <h3>Tebrikler! Tamamladınız</h3>
    <button @click="$emit('solve-again')" class="submit">Tekrar Çöz</button>
  </div>
</template>


<style lang="scss" scoped>
.finish {
  text-align: center;
  & > * {
    margin: 2em 0;
  }
}
</style>