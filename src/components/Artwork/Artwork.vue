<template>
  <img class="artwork" :src="image" :alt="alt" @click="click()" />
</template>

<script>
export default {
  data() {
    return {
      image: "",
      alt: "",
    };
  },
  props: {
    contentId: {
      type: String,
      required: true,
    },

    index: Number
  },

  methods: {
    click(){
      this.$emit("click", this.index)
    }
  },

  async beforeMount() {
    this.getContentfulEntry(this.contentId).then((response) => {
      this.image = response.fields.file.fields.file.url;
      this.alt = response.fields.file.fields.description;
    });
  },
};
</script>

<style lang="scss" scoped>
.artwork {
  margin: 5px 5px;
  max-width: 100%;
}
</style>
