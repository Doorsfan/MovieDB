<template>
  <div @click="goToArticle" class="BoxDiv">
    <div class="titleGrid">
      <div class="SpaceBlock" />
      <div class="title">{{ article.maintitle }}</div>
      <div class="SpaceBlock" />
      <div class="author">{{ article.author }}</div>
      <div class="SpaceBlock" />
      <img class="authorImage" :src="article.authorimage" />
      <div class="SpaceBlock" />
    </div>
    <div class="parsedDateGrid">
      <div class="SpaceBlock" />
      <div class="parsedDateDiv">
        {{
          article.timestamp
            .replaceAll('T', ' ')
            .substring(0, article.timestamp.length - 18)
        }}
      </div>
      <div class="SpaceBlock" />
    </div>
    <div class="bigGrid">
      <div clas="SpaceBlock" />
      <div class="likesGrid">
        <div class="SpaceBlock" />
        <div class="likesNumber">
          {{ article.likes }}
        </div>
        <div class="SpaceBlock" />
        <img class="likesIcon" src="../images/up_arrow.png" />
        <div class="SpaceBlock" />
      </div>
      <div clas="SpaceBlock" />
      <div class="dislikesGrid">
        <div class="SpaceBlock" />
        <div class="dislikesNumber">
          {{ article.dislikes }}
        </div>
        <div class="SpaceBlock" />
        <img class="dislikesIcon" src="../images/down_arrow.png" />
        <div class="SpaceBlock" />
      </div>
      <div clas="SpaceBlock" />
      <div class="commentsGrid">
        <div class="SpaceBlock" />
        <div class="commentsNumber">
          {{ article.comments }}
        </div>
        <div class="SpaceBlock" />
        <img class="commentIcon" src="../images/comment.png" />
        <div class="SpaceBlock" />
      </div>
      <div class="SpaceBlock" />
      <div class="tagsGrid">
        <div class="SpaceBlock" />
        <div class="firsttagdiv">{{ article.firsttag }}</div>
        <div class="SpaceBlock" />
        <div v-if="article.secondtag.length > 0 && article.secondtag != 'null'" class="secondtagdiv">
          {{ article.secondtag }}
        </div>
        <div class="SpaceBlock" />
        <div v-if="article.thirdtag.length > 0 && article.thirdtag != 'null'" class="thirdtagdiv">
          {{ article.thirdtag }}
        </div>
        <div class="SpaceBlock" />
      </div>
      <div class="SpaceBlock" />
    </div>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import store from '../store';

export default {
  name: 'Article',
  props: ['article'],
  components: {},
  beforeMount() {},
  data() {
    return {};
  },
  methods: {
    goToArticle() {
      this.$router.push('/Article/' + this.article.id);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Revalia&family=Roboto:wght@300;400&display=swap');

.likesIcon,
.dislikesIcon,
.commentIcon {
  width: 20px;
  height: 20px;
  border-radius: 30px;
  margin-top: -6px;
}
.bigGrid {
  display: grid;
  width: max-content;
  grid-template-columns: auto max-content auto max-content auto max-content auto max-content auto;
  position: relative;
  top: -2px;
}

.likesNumber,
.dislikesNumber,
.commentsNumber {
  margin-top: -5px;
}
.BoxDiv {
  height: 100px;
  width: 404px;
  background-color: rgb(97, 191, 197);
  margin-top: 6px;
  margin-left: 5px;
  border-radius: 10px;
}
.title {
  margin-left: 9px;
  padding-top: 10px;
}
.firsttagdiv,
.secondtagdiv,
.thirdtagdiv {
  background-color: black;
  color: white;
  width: max-content;
  border-radius: 30px;
  padding-left: 5px;
  padding-right: 5px;
}
.authorImage {
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin-top: 2px;
}
.titleGrid {
  display: grid;
  grid-template-columns: 0px max-content auto max-content 5px 40px 5px;
}
.likesGrid,
.dislikesGrid,
.commentsGrid,
.tagsGrid {
  display: grid;
  grid-template-columns: 12px max-content 3px max-content 3px max-content 3px;
}
.tagsGrid {
  background-color: transparent;
  width: 250px;
  justify-content: end;
  position: relative;
  top: 17px;
}
.SpaceBlock {
  background-color: transparent;
}
.author {
  margin-top: 11px;
}
.parsedDateGrid {
  display: grid;
  grid-template-columns: auto max-content 8px;
}
</style>
