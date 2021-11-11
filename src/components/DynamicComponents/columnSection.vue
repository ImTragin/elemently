<template>
  <v-row class="pagesContainer" v-if="!isMobile">
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

  computed: {
    isMobile: function() {
      return window.isMobile();
    },
  },

  props: {
    Section: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getColumnCount() {
      if (window.isMobile()) return 1;
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
