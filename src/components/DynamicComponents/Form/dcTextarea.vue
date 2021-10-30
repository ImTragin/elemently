<template>
  <v-textarea
    v-model="value[title]"
    :label="title"
    required
    @input="$v.field.$touch()"
    @blur="$v.field.$touch()"
  />
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    field: { required },
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
