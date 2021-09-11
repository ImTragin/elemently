<template>
  <a :href="targetURL" target="_blank" class="social-icon">
    <font-awesome-icon :icon="[prefix, icon]" :size="size" :color="color" />
  </a>
</template>

<script>
export default {
  name: "SocialIcon",
  props: {
    targetURL: String,
    prefix: String,
    icon: String,
    size: String,
    color: String,
  },
};
</script>

<style lang="scss" scoped>
.social-icon{
  padding: 8px;
}

</style>
