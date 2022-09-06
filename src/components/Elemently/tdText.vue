<template>
  <div class="dcText" :style="getStyle()" v-html="content" />
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export default {
  data() {
    return {
      content: "",
      alignment: "",
    };
  },
  props: {
    Section: {
      type: Object,
      required: false,
    },
  },

  methods: {
    getStyle() {
      return {
        textAlign: this.alignment,
      };
    },
    click() {
      this.$emit("click", this.index);
    },
  },

  async beforeMount() {
    const foo = documentToHtmlString(this.Section.input);
    this.alignment = this.Section.textAlignment[0].toLowerCase();
    this.content = foo;
  },
};
</script>

<style lang="scss" scoped>
.dcText {
  margin: 0px 32px;
  max-width: 100%;
}

::v-deep p {
  padding-bottom: 1em;
}
::v-deep h2 {
  font-size: 32px;
  padding-bottom: 1em;
}

::v-deep h3 {
  font-size: 28px;
  padding-bottom: 1em;
}

::v-deep h4 {
  font-size: 20px;
  padding-bottom: 1em;
}

::v-deep h5 {
  font-size: 16px;
  padding-bottom: 1em;
}
</style>
