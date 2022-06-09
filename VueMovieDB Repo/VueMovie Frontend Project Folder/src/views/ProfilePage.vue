<template>
  <div class="loginHeader">
    <div @click="goToHomepage" class="homeDiv">
      <img class="homeIcon" src="../images/home.png" />
    </div>
    <div class="myProfileText">--=== My Articles ===--</div>
  </div>
  <div class="profileBox">
    <Article
      v-for="(articleItem, index) of myArticles"
      :key="index"
      :article="articleItem"
    />
  </div>
  <Footer class="footerDiv" />
</template>
<script>
import Footer from '../components/Footer.vue';
import Article from '../components/Article.vue';
export default {
  name: 'ProfilePage',
  components: {
    Footer,
    Article,
  },
  data() {
    return {
      myArticles: [],
    };
  },
  async mounted() {
    this.myArticles = [];
    let res = await fetch(
      '/rest/articles/findArticlesByAuthor/' + this.$route.params.username,
      {
        method: 'GET',
      }
    );
    let response = await res.json();
    for (let i = 0; i < response.length; i++) {
      this.myArticles.push(response[i]);
    }
  },
  watch: {},
  methods: {
    goToHomepage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto:wght@300;400&display=swap');

.footerDiv {
  position: sticky;
  margin-top: 10px;
}
.myProfileText {
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

.loginHeader {
  display: grid;
  grid-template-columns: 30px auto;
  background-color: #61bfc5;
  height: 60px;
  text-align: center;
}

.homeIcon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 14px;
  margin-left: 6px;
  margin-top: 15px;
}
</style>
