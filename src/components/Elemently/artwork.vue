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
      required: false,
    },

    Section: {
      type: Object,
      required: false,
    },

    index: Number,
  },

  methods: {
    click() {
      this.$emit("click", this.index);
    },
  },

  async beforeMount() {
    if (this.contentId != null && this.contentId != undefined) {
      this.getContentfulEntry(this.contentId).then((response) => {
        this.image = response.fields.file.fields.file.url;
        this.alt = response.fields.file.fields.description;
      });
    } else if (this.Section != null && this.Section != undefined) {
      this.image = this.Section.file.fields.file.url;
      this.alt = this.Section.name;
    }
  },
};
</script>

<style lang="scss" scoped>
.artwork {
  margin: 5px 5px;
  max-width: 100%;
}
</style>
