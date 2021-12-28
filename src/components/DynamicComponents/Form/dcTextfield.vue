<template>
  <v-text-field
    v-model="localValue"
    :label="title"
    ref="inputField"
    error
    :rules="rules"
  />
</template>

<script>
export default {
  data: () => ({
    localValue: "",
    rules: [
      (value) => !!value || "Required.",
      (value) => value.length <= 60 || "Max 60 characters",
      (value) => value.length >= 5 || "Min 5 characters",
    ],
  }),

  watch: {
    localValue: {
      handler(newValue) {
        this.$emit("formChange", {
          key: this.title,
          value: newValue,
          isValid: this.$refs.inputField.validate()
        });
      },
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
