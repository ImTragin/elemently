<template>
  <v-row class="pagesContainer">
    <v-col
      v-for="({ sectionComponent, content }, index) in columnSections"
      :key="index"
      class="d-flex child-flex"
      :cols="columnSections.size"
    >
      <component :is="sectionComponent" :key="index" :Section="content" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  async beforeMount() {
    this.getAllContent();
  },

  data() {
    return {
      columnSections: [],
      imageStyle: "",
    };
  },

  props: {
    Section: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getComponentType(item) {
      if (
        item &&
        item.sys &&
        item.sys.contentType &&
        item.sys.contentType.sys &&
        item.sys.contentType.sys.id
      ) {
        return item.sys.contentType.sys.id;
      }
    },

    getAllContent() {
      var string = "";
      const map = new Map();

      const ids = this.Section.content.map((element) => {
        return element.sys.id;
      });

      this.getAllContentForIds(ids).then((response) => {
        response.map((element) => {
          let componentType = this.getComponentType(element);
          let sectionComponent = () =>
            import(`../DynamicComponents/${componentType}`);
          let content = element.fields;

          this.columnSections.push({
            sectionComponent,
            content,
          });
        });
      });
    },
  },
};
</script>

<style></style>
