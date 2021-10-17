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

      console.log(this.Section);

      for (let index = 0; index < this.Section.content.length; index++) {
        const element = this.Section.content[index].sys.id;
        map.set(element, {});
        if (index != this.Section.content.length - 1) {
          string += element + ",";
        } else {
          string += element;
        }
      }
      this.getContentfulEntries({
        "sys.id[in]": string,
      }).then((response) => {
        var result = response.items;

        result.map((element) => {
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
