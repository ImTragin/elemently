<template>
  <div>
    <form>
      <v-container>
        <v-text-field
          v-model="name"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />

        <v-text-field
          v-model="subject"
          label="Subject"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />

        <v-textarea
          v-model="message"
          label="Message"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-btn class="mr-4" @click="submit">
          submit
        </v-btn>
      </v-container>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  beforeMount() {
    console.log("heyo");
  },

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    subject: { required, maxLength: maxLength(30) },
    message: { required },
  },

  data: () => ({
    name: "",
    email: "",
    subject: "",
    message: "",
  }),

  methods: {
    submit() {
      let data = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      };
      axios
        .post("https://getform.io/f/22ffb686-af9d-43dc-abfb-88c4b4ca9fe7", data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dcForm {
  background-color: black;

  input {
    background-color: red;
  }
}
</style>
