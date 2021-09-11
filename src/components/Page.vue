<template>
  <div>
    <div
      v-if="hasHeaderImage()"
      class="Page-Header"
      :style="getPageHeaderStyling()"
    />
    <component
      v-for="({ sectionComponent, content }, index) in PageSections"
      :is="sectionComponent"
      :key="index"
      :Section="content"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      PageSections: [],
      PageHeaderImage: String,
    };
  },
  props: {
    PageId: {
      type: String,
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

    hasHeaderImage() {
      return this.PageHeaderImage != undefined && this.PageHeaderImage != "";
    },

    getPageHeaderStyling() {
      return {
        height: "100vh",
        backgroundImage: `url('${this.PageHeaderImage}')`,
        backgroundSize: "cover",
        marginBottom: "30px",
      };
    },
  },

  async beforeMount() {
    this.getContentfulEntry(this.PageId).then((response) => {
      if (response.fields.pageSections != undefined) {
        let sections = response.fields.pageSections;
        sections.map((section) => {
          let contentType = this.getComponentType(section);
          let content = section.fields;
          let sectionComponent = () => import(`./PageSections/${contentType}`);
          this.PageSections.push({
            sectionComponent,
            content,
          });
        });
      }

      if (response.fields.headerImage != undefined) {
        this.PageHeaderImage = response.fields.headerImage.fields.file.url;
        console.log(this.PageHeaderImage);
      } else {
        this.PageHeaderImage = "";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.Page-Title {
  color: white;
  font-size: 50px;
}

.Page-Subtitle {
  padding: 30px;
  color: white;
  font-size: 30px;
}

.Page-Header-Container {
  height: 100%;
}
</style>
