<template>
  <main class="app-main" ondragstart="return false;" ondrop="return false;">
    <div class="BackDrop">
      <router-view />
    </div>
  </main>
</template>
<script>
import Header from './components/Header.vue';
import store from './store';

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
<style>
* {
  margin: 0px;
  padding: 0px;
}
.app-main {
  min-height: 100vh;
  height: max-content;
  overflow-y: hidden;
}
.BackDrop {
  background-color: #131313;
  min-height: 100vh;
  height: max-content;
}
</style>
