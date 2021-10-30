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
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  validations: {
    field: { required, maxLength: maxLength(30) },
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
  model: {
    prop: "value",
    event: "valueList",
  },
};
</script>

<style lang="scss" scoped></style>
