<template>
  <v-textarea
    v-model="localValue"
    :label="title"
    clearable
    :rules="rules"
    error
    ref="inputField"
  />
</template>

<script>
export default {
  data: () => ({
    localValue: "",
    rules: [
      (value) => !!value || "Required.",
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
