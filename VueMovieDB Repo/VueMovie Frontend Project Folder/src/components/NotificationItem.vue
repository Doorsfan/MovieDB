<template>
  <div @click="goToArticle" class="OuterNotificationBox">
    <div class="timeOfPosting">
      {{
        notification.timestamp
          .replaceAll('T', ' ')
          .substring(0, notification.timestamp.length - 18)
      }}
    </div>
    <div class="upperGrid">
      <div class="SpaceBlock" />
      <img class="authorImage" :src="notification.authorurl" />
      <div class="SpaceBlock" />
      <div class="authorName">
        {{ notification.authorname }}
      </div>
    </div>
    <div class="NotificationContent">
      {{ notification.content }}
    </div>
  </div>
</template>
<script>
import store from '../store';

export default {
  name: 'NotificationItem',
  props: ['notification'],
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    goToArticle() {
      this.$router.push('/Article/' + this.notification.articleid);
    },
  },
};
</script>

<style scoped>
.upperGrid {
  display: grid;
  margin-top: 2px;
  grid-template-columns: 10px max-content 5px max-content auto max-content 10px;
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
