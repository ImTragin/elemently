<template>
  <v-row class="pagesContainer">
    <v-col
      v-for="(item, index) in pages"
      :key="index"
      class="d-flex child-flex"
      cols="6"
    >
      <v-hover v-slot="{ hover }">
        <div @click="handleClick(item)">
          <v-img
            :src="item.fields.coverImage.fields.file.url"
            aspect-ratio="1.7778"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#ffffff"> </v-overlay>
            </v-fade-transition>
          </v-img>
          <h2 class="textTitle">{{ item.fields.title }}</h2>
        </div>
      </v-hover>
    </v-col>
  </v-row>
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
    handleClick(item) {
      this.$router.push(
        this.$router.history.current.path + "/" + item.fields.slug
      );
    },

    getAllContent() {
      var string = "";
      const map = new Map();

      const ids = this.Section.content.map((element) => {
        return element.sys.id;
      });

      this.getAllContentForIds(ids).then((response) => {
        response.forEach((element) => {
          map.set(element.sys.id, element);
        });

        const array = Array.from(map, ([_, value]) => value);

        this.pages = array;
      });
    },
  },
};
</script>

<style>
.pagesContainer {
  padding: 32px;
}
</style>
