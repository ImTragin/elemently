<template>
  <div class="gridContainer">
    <div
      v-for="(item, index) in pages"
      :key="index"
      class="gridItem"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <div class="imageContainer">
        <img class="coverImage" :src="item.fields.coverImage.fields.file.url" />
        <div class="imageOverlay" />
      </div>

      <h2 class="textTitle">{{ item.fields.title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      imageStyle: "",
    };
  },
  props: {
    Section: {
      type: Object,
      required: true,
    },
  },

  async beforeMount() {
    this.getAllContent();
  },

  methods: {
    mouseLeave() {
      console.log("sup");
    },

    mouseEnter() {
      console.log("dup");
    },

    getAllContent() {
      var string = "";

      for (let index = 0; index < this.Section.content.length; index++) {
        const element = this.Section.content[index].sys.id;
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
        this.pages = result;
      });
    },
  },
};
</script>

<style>
.gridContainer {
  display: grid;
  margin-top: 64px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.coverImage {
  max-height: 100%;
}
</style>
