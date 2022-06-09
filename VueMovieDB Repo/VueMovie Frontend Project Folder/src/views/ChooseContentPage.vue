<template>
  <div class="profileHeader">
    <div @click="goToHomepage" class="homeDiv">
      <img class="homeIcon" src="../images/home.png" />
    </div>

    <div class="codeLibraryText">--=== The Code Library ===--</div>
  </div>
  <div class="ContentBox">
    <button
      @click="goToMyArticles"
      class="myArticlesButton"
      type="button"
      value="My Articles"
    >
      My Articles
    </button>
    <button
      @click="goToCreateNewArticle"
      class="newArticleButton"
      type="button"
      value="Create New Article"
    >
      Create New Article
    </button>
    <button
      @click="goToActivityLog"
      class="newArticleButton"
      type="button"
      value="My Activity Log"
    >
      My Activity Log
    </button>
  </div>
  <Footer class="loginFooter" />
</template>
<script>
import Footer from '../components/Footer.vue';
import store from '../store';

export default {
  name: 'ChooseContentPage',
  components: {
    Footer,
  },
  data() {
    return {};
  },
  beforeMount() {
    if (!localStorage.getItem('username')) {
      this.$router.push('/');
    }
  },
  watch: {},
  methods: {
    goToActivityLog() {
      this.$router.push('/activityLog/' + localStorage.getItem('username'));
    },
    goToHomepage() {
      this.$router.push('/');
    },
    goToMyArticles() {
      this.$router.push('/profilePage/' + localStorage.getItem('username'));
    },
    goToCreateNewArticle() {
      this.$router.push('/createNewArticle');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto:wght@300;400&display=swap');

* {
  outline: none;
  border: none;
}

button {
  width: 310px;
  height: 47px;
  border-radius: 10px;
  background: #c4c4c4;
  border: 1px solid #000000;
  box-sizing: border-box;
  color: #ffffff;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  margin-top: 27px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 22px;
}

.myArticlesButton,
.newArticleButton {
  position: relative;
  top: -5px;
}
.profileHeader {
  display: grid;
  grid-template-columns: 20px auto;
  background-color: #61bfc5;
  height: 60px;
}

.ContentBox {
  height: 242px;
  width: max-content;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: #61bfc5;
  position: relative;
  top: 241px;
  display: block;
  border-radius: 10px;
}
.homeIcon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 14px;
}
.codeLibraryText {
  width: max-content;
  left: 60px;
  position: relative;
  top: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: #ffffff;
}
.registerLinkDiv {
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
}
.homeDiv {
  background-color: red;
  position: absolute;
  border-radius: 30px;
  top: 16px;
  left: 14px;
  height: 30px;
  margin-bottom: 10px;
  width: 30px;
}

.loginFooter {
  position: relative;
  top: calc(100vh - 407px);
}
</style>
