<template>
  <div class="footerDiv">
    <div class="homeDiv">
      Home
      <img class="homeIcon" src="../images/home.png" />
    </div>
    <div class="SpaceDiv" />
    <div class="profileDiv">
      Profile
      <img class="profileIcon" src="../images/profile.png" />
    </div>
  </div>
</template>
<script>
import store from '../store';

export default {
  name: 'Footer',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto&display=swap');

* {
  overflow-x: hidden;
  font-family: 'Roboto', sans-serif;
}
.footerDiv {
  background-color: rgba(97, 191, 197, 0.82);
  display: grid;
  grid-template-columns: max-content auto max-content;
  height: 65px;
  position: absolute;
  top: calc(100vh - 64px);
  width: 100vw;
}
.homeIcon {
  width: 30px;
  border-radius: 30px;
  position: relative;
  left: -38px;
  top: 30px;
}
.homeDiv {
  margin-left: 10px;
}
.profileDiv {
  position: relative;
  right: -20px;
}
.profileIcon {
  width: 30px;
  border-radius: 30px;
  position: relative;
  left: -40px;
  top: 30px;
}
</style>
