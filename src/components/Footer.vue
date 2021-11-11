<template>
  <div class="footer-container">
    <p class="footer-text">
      Copyright © 2020 Martina Scafa
    </p>
    <SocialIcon
      :targetURL="'https://twitter.com/thingsthatlurk'"
      :prefix="'fab'"
      :icon="'twitter-square'"
      :size="'2x'"
      :color="'#fff'"
    />
    <SocialIcon
      :targetURL="'https://twitter.com/heyitsmaat'"
      :prefix="'fab'"
      :icon="'deviantart'"
      :size="'2x'"
      :color="'#fff'"
    />
    <SocialIcon
      :targetURL="'https://twitter.com/heyitsmaat'"
      :prefix="'fab'"
      :icon="'instagram-square'"
      :size="'2x'"
      :color="'#fff'"
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
  padding: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  overflow: hidden;
  right: 0;
  height: 6em;
  background: #000;
}
.footer-text {
  color: rgb(214, 214, 214);
}
</style>
