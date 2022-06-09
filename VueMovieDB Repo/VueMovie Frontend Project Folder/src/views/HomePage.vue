<template>
  <Header @searchResult="updateList" />
  <Article
    v-for="(articleItem, index) of allArticles"
    :key="index"
    :article="articleItem"
  />
  <Footer class="footerDiv" />
</template>
<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Article from '../components/Article.vue';

import store from '../store';

export default {
  name: 'HomePage',
  components: {
    Header,
    Article,
    Footer,
  },
  beforeMount() {},
  data() {
    return {
      allArticles: [],
    };
  },
  async mounted() {
    this.allArticles = [];
    let res = await fetch('/rest/articles/', {
      method: 'GET',
    });
    let response = await res.json();
    for (let i = 0; i < response.length; i++) {
      this.allArticles.push(response[i]);
    }
  },
  updated() {},
  unmounted() {},

  methods: {
    updateList(searchResults) {
      this.allArticles = [];
      for (let i = 0; i < searchResults.length; i++) {
        this.allArticles.push(searchResults[i]);
      }
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
</style>
