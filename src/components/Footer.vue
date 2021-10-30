<template>
  <div class="footer-container">
    Copyright © 2020 Martina Scafa
    <SocialIcon
      :targetURL="'https://twitter.com/thingsthatlurk'"
      :prefix="'fab'"
      :icon="'twitter-square'"
      :size="'2x'"
      :color="'gray'"
    />
    <SocialIcon
      :targetURL="'https://twitter.com/heyitsmaat'"
      :prefix="'fab'"
      :icon="'deviantart'"
      :size="'2x'"
      :color="'gray'"
    />
    <SocialIcon
      :targetURL="'https://twitter.com/heyitsmaat'"
      :prefix="'fab'"
      :icon="'instagram-square'"
      :size="'2x'"
      :color="'gray'"
    />
  </div>
</template>

<script>
import SocialIcon from "../components/SocialIcon";
export default {
  components: {
    SocialIcon,
  },
};
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  overflow: hidden;
  right: 0;
  height: 32px;
  color: #000;
}
</style>
