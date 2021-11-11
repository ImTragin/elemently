<template>
  <div class="home-container">
    <div class="bottom-section">
      <div class="image-row">
        <div class="image-column">
          <img
            v-for="(image, index) in getImagesForColumn(`left`)"
            :key="index"
            :src="image"
          />
        </div>
        <div class="image-column">
          <img
            v-for="(image, index) in getImagesForColumn(`right`)"
            :key="index"
            :src="image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      images: [],
    };
  },

  methods: {
    //0 = right, 1 = left
    getImagesForColumn(column) {
      if (column === "left") {
        return this.images.filter((a, i) => i % 2 === 1);
      } else if (column === "right") {
        return this.images.filter((a, i) => i % 2 === 0);
      }
    },
  },

  beforeMount() {
    this.getContentfulEntries({
      content_type: "page",
    }).then((response) => {
      console.log(response.items);
    });

    this.getContentfulEntries({
      content_type: "artwork",
    }).then((response) => {
      const foo = response.items.map((element) => {
        return element.fields.file.fields.file.url;
      });

      this.images = foo;
      console.log(this.images);
    });
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  position: absolute;
}

.home-container {
  height: 100%;
}

.top-section {
  height: 100vh;
  background-size: cover;
  margin-bottom: 30px;
}
</style>
