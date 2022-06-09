<template>
  <div @click="goToArticle" class="activityBox">
    <div v-if="activity.timestamp" class="timestampDiv">
      <div class="dateDiv">
        {{
          activity.timestamp
            .replaceAll('T', ' ')
            .substring(0, activity.timestamp.length - 18)
        }}
      </div>
      <div class="SpaceBlock" />
      <div class="timeDiv">
        {{
          activity.timestamp
            .replaceAll('T', ' ')
            .substring(11, activity.timestamp.length - 13)
        }}
      </div>
    </div>
    <div class="usernameGrid">
      <img class="authorImage" :src="activity.authorurl" />
      <div class="SpaceBlock" />
      <div class="usernameSubdiv">{{ activity.username }}</div>
    </div>
    <div class="contentDiv">{{ activity.event }}</div>
  </div>
</template>
<script>
import store from '../store';

export default {
  name: 'Activity',
  props: ['activity'],
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    goToArticle() {
      if (this.activity.articleid) {
        this.$router.push('/Article/' + this.activity.articleid);
      }
      /* else if(this.activity.followeduser){
        this.$router.push('/profilePage/' + this.activity.followeduser);
      } Later */
    },
  },
};
</script>

<style scoped>
.usernameGrid {
  display: grid;
  grid-template-columns: max-content 5px max-content;
}
.timestampDiv {
  display: grid;
  grid-template-columns: max-content auto max-content;
}
.usernameSubdiv {
  margin-top: 4px;
}
.upperGrid {
  display: grid;
  margin-top: 2px;
  grid-template-columns: 10px max-content 5px max-content auto max-content 10px;
}
.activityBox {
  background-color: white;
  padding: 7px;
  width: 320px;
  border-radius: 10px;
  margin-bottom: 5px;
}
.authorImage {
  width: 30px;
  height: 30px;
  border-radius: 30px;
}
.timeOfPosting {
  margin-left: 13px;
}
.authorName {
  margin-top: 4px;
}
.OuterNotificationBox {
  outline: solid 1px black;
  border-radius: 10px;
  width: 185px;
  margin-left: 7px;
  position: relative;
  top: 2px;
  padding-top: 1px;
  margin-top: 5px;
  padding-bottom: 2px;
}
.NotificationContent {
  padding-left: 10px;
}
</style>
