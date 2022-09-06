<template>
  <div class="art-section">
    <CoolLightBox :items="images" :index="index" @close="index = null" />
    <masonry
      :cols="{ default: 3, 1000: 2, 700: 2, 640: 1 }"
      :gutter="{ default: '5px', 700: '15px' }"
    >
      <img
        v-for="(column, index) in images"
        class="artwork"
        :key="index"
        :src="getURL(index)"
        :alt="getAlt(index, column)"
        @click="click(index, column)"
      />
    </masonry>
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
        return this.getResizedImageUrl(this.images[index].src);
      }
    },

    getAlt(index) {
      if (this.images.length > index) {
        return this.images[index].title;
      }
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
  max-width: 100%;
}

.art-section {
  padding: 5px;
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
