<template>
  <div class="profileHeader">
    <div @click="goToHomepage" class="homeDiv">
      <img class="homeIcon" src="../images/home.png" />
    </div>

    <div class="codeLibraryText">--=== The Code Library ===--</div>
  </div>
  <div class="ContentBox">
    <Activity
      v-for="(activityItem, index) of relevantActivities"
      :key="index"
      :activity="activityItem"
    />
  </div>
  <Footer class="loginFooter" />
</template>
<script>
import Footer from '../components/Footer.vue';
import Activity from '../components/Activity.vue';
import store from '../store';

export default {
  name: 'ActivityLogPage',
  components: {
    Activity,
    Footer,
  },
  data() {
    return {
      relevantActivities: [],
    };
  },
  async mounted() {
    this.relevantActivities = [];
    let activitiesres = await fetch(
      '/rest/activity/findActivityByUsername/' + this.$route.params.username,
      {
        method: 'GET',
      }
    );
    let activities = await activitiesres.json();
    for (let i = 0; i < activities.length; i++) {
      this.relevantActivities.push(activities[i]);
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

.profileHeader {
  display: grid;
  grid-template-columns: 20px auto;
  background-color: #61bfc5;
  height: 60px;
}

.homeIcon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 14px;
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

.codeLibraryText {
  width: max-content;
  left: 70px;
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
  height: max-content;
}

.ContentBox {
  min-height: 75px;
  width: max-content;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: #61bfc5;
  position: relative;
  top: 20px;
  display: block;
  border-radius: 10px;
}
.loginFooter {
  position: sticky;
  margin-top: 30px;
}
</style>
