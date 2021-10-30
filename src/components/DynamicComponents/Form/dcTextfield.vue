<template>
  <v-text-field
    :label="Title"
    required
    @input="$v.field.$touch()"
    @blur="$v.field.$touch()"
  />
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  validations: {
    field: { required, maxLength: maxLength(30) },
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
