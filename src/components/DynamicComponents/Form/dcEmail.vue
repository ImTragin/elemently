<template>
  <v-text-field
    v-model="localValue"
    :label="title"
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
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
  }),
  watch: {
    localValue: {
      handler(newValue) {
        this.$emit("formChange", {
          key: this.title,
          value: newValue,
          isValid: this.$refs.inputField.validate(),
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

<style lang="scss" scoped>
.error {
  color: red;
}
</style>
