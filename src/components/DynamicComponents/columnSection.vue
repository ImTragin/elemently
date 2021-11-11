<template>
  <v-container>
    <v-row class="pagesContainer" :style="getColumnStyle()">
      <v-col
        v-for="({ sectionComponent, content }, index) in columnSections"
        :key="index"
        cols="12"
        md="4"
        sm="1"
        class="d-flex child-flex"
      >
        <component :is="sectionComponent" :key="index" :Section="content" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async beforeMount() {
    this.getAllContent();
  },

  data() {
    return {
      justifyContent: "",
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
    getColumnStyle() {
      var justify = this.Section.dcJustifyContent;
      if (justify === null || justify === undefined) justify = "inherit";
      return {
        justifyContent: justify,
      };
    },

    getColumnCount() {
      if (this.isMobile()) return 1;
      return this.columnSections.size;
    },

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
          if (element != undefined) {
            let componentType = this.getComponentType(element);
            let sectionComponent = () =>
              import(`../DynamicComponents/${componentType}`);

            let content = element.fields;

            this.columnSections.push({
              sectionComponent,
              content,
            });
          }
        });
      });
    },
  },
};
</script>

<style></style>
