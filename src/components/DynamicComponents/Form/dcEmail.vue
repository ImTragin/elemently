<template>
  <v-text-field
    v-model="value[title]"
    :label="title"
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
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
