<template>
  <div>
    <v-form v-if="isFormVisible">
      <v-container>
        <component
          v-for="({ component, title }, index) in fieldItems"
          v-on:formChange="handleFormChange"
          :key="index"
          :is="component"
          :title="title"
          :value="getVModelForData(title)"
        />
        <v-btn class="mr-4" @click="submit">Submit</v-btn>
      </v-container>
    </v-form>

    <div v-if="!isFormVisible">
      Thank you for your message. I'll get back to your shortly!
    </div>

    <v-dialog
      v-model="isSendingDialogVisible"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="primary" dark>
        <v-card-text>
          Sending your message, please wait a moment...
          <v-progress-linear
            indeterminate
            color="#fff"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showErrorMessage">
      {{ errorMessageText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="#FFC0CB"
          text
          v-bind="attrs"
          @click="showErrorMessage = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  beforeMount() {
    const ids = this.Section.fields.map((element) => {
      return element.sys.id;
    });

    const result = this.getAllContentForIds(ids);

    result.then((response) => {
      response.forEach((item) => {
        let element = item.fields;
        let component = this.convertToCorrectType(element.type);
        let title = element.title;
        let type = element.type;
        this.fieldItems.push({
          component,
          title,
          type,
        });
        this.fieldData[title] = { value: "", isValid: false };
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
    showErrorMessage: false,
    errorMessageText: "",
    isSendingDialogVisible: false,
    isFormVisible: true,
    fieldData: {},
    fieldItems: [],
  }),

  methods: {
    getVModelForData(title) {
      return this.fieldData[title].value;
    },
    handleFormChange(event) {
      this.fieldData[event.key] = {
        value: event.value,
        isValid: event.isValid,
      };
    },
    submit() {
      if (this.validateFields()) {
        this.isSendingDialogVisible = true;
        axios
          .post(
            "https://getform.io/f/22ffb686-af9d-43dc-abfb-88c4b4ca9fe7",
            this.fieldData
          )
          .catch((error) => {
            if (
              error !== undefined &&
              error.response !== undefined &&
              error.response.status === 429
            ) {
              this.showErrorMessage = true;
              this.errorMessageText =
                "Please wait 60 seconds before sending another message";
            } else {
              this.showErrorMessage = true;
              this.errorMessageText =
                "We ran into an unknown error when sending your message, please try again.";
            }
            this.isSendingDialogVisible = false;
          })
          .then((response) => {
            if (response !== undefined) {
              if (response.status === 200) {
                this.isSendingDialogVisible = false;
                this.isFormVisible = false;
              }
            }
          });
      } else {
        this.showErrorMessage = true;
        this.errorMessageText = "Please make sure you enter the form correctly";
      }
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

    validateFields() {
      return Object.values(this.fieldData).every((item) => {
        return item.isValid === true;
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
