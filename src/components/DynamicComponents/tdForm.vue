<template>
  <div>
    <form>
      <v-container>
        <component
          v-for="({ component, title }, index) in fieldItems"
          :key="index"
          :is="component"
          :title="title"
          :value="fieldData"
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
    var string = "";
    const map = new Map();

    const ids = this.Section.fields.map((element) => {
      return element.sys.id;
    });

    const result = this.getAllContentForIds(ids);

    result.then((response) => {
      response.forEach((item) => {
        let element = item.fields;
        let component = this.convertToCorrectType(element.type);
        let title = element.title;
        this.fieldItems.push({
          component,
          title,
        });
        this.fieldData[title] = "";
      });
    });
  },

  props: {
    Section: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    fieldData: {},
    fieldItems: [],
  }),

  methods: {
    submit() {
      axios
        .post(
          "https://getform.io/f/22ffb686-af9d-43dc-abfb-88c4b4ca9fe7",
          this.fieldData
        )
        .then(function(response) {
          console.log(response);
        });
    },

    convertToCorrectType(contentfulType) {
      switch (contentfulType) {
        case "Textfield":
          return () => import(`./Form/dcTextfield`);
        case "Textarea":
          return () => import(`./Form/dcTextarea`);
        case "Email":
          return () => import(`./Form/dcEmail`);
        default:
          break;
      }
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
