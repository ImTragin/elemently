<template>
  <div class="art-section">
    <CoolLightBox :items="images" :index="index" @close="index = null" />
    <div
      v-for="(column, index) in Section.columns"
      class="art-section-column"
      :key="index"
    >
      <img
        class="artwork"
        v-for="(item, index) in Section.columns"
        :key="index"
        :src="getURL(trueIndex(index, column))"
        :alt="getAlt(trueIndex(index, column))"
        @click="click(trueIndex(index, column))"
      />
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  name: "art-section",
  data() {
    return {
      images: [],
      index: null,
    };
  },
  props: {
    Section: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getImagesForColumn(column) {
      return this.images.filter(
        (a, i) => i % this.Section.columns === column - 1
      );
    },

    getAllImages() {
      var string = "";
      const map = new Map();

      const ids = this.Section.content.map((element) => {
        return element.sys.id;
      });

      this.getAllContentForIds(ids).then((response) => {
        response.forEach((image) => {
          map.set(image.sys.id, {
            src: image.fields.file.fields.file.url,
            title: image.fields.file.fields.description,
          });
        });

        const array = Array.from(map, ([_, value]) => value);
        this.images = array;
      });
    },

    click(index) {
      this.index = index;
    },

    getURL(index) {
      if (this.images.length > index) {
        return this.images[index].src;
      }
    },

    getAlt(index) {
      if (this.images.length > index) {
        return this.images[index].title;
      }
    },

    trueIndex(index, column) {
      return index * 2 + column - 1;
    },
  },
  components: {
    CoolLightBox,
  },

  beforeMount() {
    this.getAllImages();
  },
};
</script>

<style lang="scss" scoped>
.artwork {
  margin: 5px 5px;
  max-width: 100%;
}

.art-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.art-section-column {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  height: 100%;
  margin: 10px 5px;
  justify-content: center;
}

::v-deep .cool-lightbox .cool-lightbox-button {
  padding: 0;
}
</style>
