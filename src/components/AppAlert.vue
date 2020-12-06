<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: "primary",
      validator: (val) => ["primary", "danger", "success"].includes(val),
    },
  },
};
</script>

<template>
  <div class="alert" :class="type"><slot></slot></div>
</template>

<style lang="scss" scoped>
.alert {
  box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.5);
  border-radius: 0.2em;
  margin: 1em 0;
  padding: 1em;
  text-transform: capitalize;
  color: white;
}
.alert.primary {
  background: var(--color-blue-900);
}
.alert.success {
  background: var(--color-light-green-900);
}
.alert.danger {
  background: var(--color-red-900);
}
</style>