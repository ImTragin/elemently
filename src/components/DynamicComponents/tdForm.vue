<template>
  <div>
    <form>
      <v-container>
        <component
          v-for="({ component, title }, index) in fieldItems"
          :key="index"
          :is="component"
          :Title="title"
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
  async beforeMount() {
    var string = "";
    const map = new Map();
    console.log(this.Section.fields);
    for (let index = 0; index < this.Section.fields.length; index++) {
      const element = this.Section.fields[index].sys.id;
      map.set(element, {});
      if (index != this.Section.fields.length - 1) {
        string += element + ",";
      } else {
        string += element;
      }
    }
    this.getContentfulEntries({
      "sys.id[in]": string,
    }).then((response) => {
      var result = response.items.map((ele) => ele.fields);
      console.log(result);
      var foo = result.forEach((element) => {
        let component = this.convertToCorrectType(element.type);
        let title = element.title;
        this.fieldItems.push({
          component,
          title,
        });
      });
    });
  },

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    subject: { required, maxLength: maxLength(30) },
    message: { required },
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
    async getComponents() {},

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
          (this.name = ""),
            (this.email = ""),
            (this.subject = ""),
            (this.message = "");
        })
        .catch(function(error) {
          console.log(error);
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
