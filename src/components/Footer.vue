<template>
  <div class="footer-container">
    <p class="footer-text">
      Copyright © 2020 Elemently
    </p>
    <div class="social-wrapper">
      <a target="blank" href="">
        <v-img class="social-icon" src="../assets/ICON_artstation.png" />
      </a>
      <a target="blank" href="">
        <v-img class="social-icon" src="../assets/ICON_twitter.png" />
      </a>
      <a target="blank" href="">
        <v-img class="social-icon" src="../assets/ICON_instagram.png" />
      </a>
      <a target="blank" href="">
        <v-img class="social-icon" src="../assets/ICON_mail.png" />
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-container {
  padding: 8;
  display: flex;
  flex-direction: column;
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

.social-wrapper {
  display: flex;
  flex-direction: row;
}

.social-icon {
  margin: 8px;
  width: 36px;
  height: 36px;
}
</style>
