<template>
  <v-text-field
    :label="Title"
    required
    @input="$v.field.$touch()"
    @blur="$v.field.$touch()"
  />
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  validations: {
    field: { required, email },
  },
  props: {
    Title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
