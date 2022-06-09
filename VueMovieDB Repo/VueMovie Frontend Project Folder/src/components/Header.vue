<template>
  <div class="backgroundDiv">
    <div v-if="!isLoggedIn" class="notLoggedInUpperGrid">
      <img
        @click="goBackToHomePage"
        class="homeIcon"
        src="../images/home.png"
      />
      <div class="codeTextDiv">
        <p class="libraryText">--=== The Code Library ===--</p>
      </div>
      <div v-if="!isLoggedIn" class="loginDiv">
        <router-link to="/login">
          <button value="login" class="loginButton">Login</button>
        </router-link>
      </div>
      <div v-if="isLoggedIn" class="profileURL">
        <img
          @click="goToMyContent"
          v-if="profileURL.length > 0"
          class="profileImage"
          :src="profileURL"
        />
        <img
          @click="goToMyContent"
          v-if="profileURL.length == 0"
          class="profileImage"
          src="../images/profile.png"
        />
        <div @click="logout" class="logoutDiv">Logout</div>
      </div>

      <div class="searchDiv">
        <input
          v-model="searchTerm"
          class="searchInput"
          placeholder="Search.."
          type="text"
        />
        <img @click="search" class="glassIcon" src="../images/glass.png" />
      </div>
    </div>
    <div v-if="isLoggedIn" class="upperGrid">
      <img
        @click="goBackToHomePage"
        class="homeIcon"
        src="../images/home.png"
      />
      <div class="codeTextDiv">
        <p class="libraryText">--=== The Code Library ===--</p>
      </div>
      <div @click="showNotifications" class="notificationDiv">
        <div
          v-if="newNotifications.length > 0 && !shownNotificationsYet"
          class="numberOfNotificationsDiv"
        >
          {{ newNotifications.length > 9 ? '9+' : newNotifications.length }}
        </div>
        <img
          v-if="
            isLoggedIn && !shownNotificationsYet && newNotifications.length == 0
          "
          class="notificationIcon"
          src="../images/bell_icon.png"
        />
        <img
          v-if="
            isLoggedIn && !shownNotificationsYet && newNotifications.length > 0
          "
          class="notificationIconWithNumber"
          src="../images/bell_icon.png"
        />
        <img
          v-if="isLoggedIn && shownNotificationsYet"
          class="notificationIconShown"
          src="../images/bell_icon.png"
        />
      </div>
      <div v-if="!isLoggedIn" class="loginDiv">
        <router-link to="/login">
          <button value="login" class="loginButton">Login</button>
        </router-link>
      </div>
      <div v-if="isLoggedIn" class="profileURL">
        <img
          @click="goToMyContent"
          v-if="profileURL.length > 0"
          class="profileImage"
          :src="profileURL"
        />
        <img
          @click="goToMyContent"
          v-if="profileURL.length == 0"
          class="profileImage"
          src="../images/profile.png"
        />
        <div @click="logout" class="logoutDiv">Logout</div>
      </div>

      <div class="searchDiv">
        <input
          v-model="searchTerm"
          class="searchInput"
          placeholder="Search.."
          type="text"
        />
        <img @click="search" class="glassIcon" src="../images/glass.png" />
      </div>
    </div>
    <div v-if="showNotificationsMenu" class="notificationBox">
      <NotificationItem
        v-for="(notificationItem, index) of newNotifications"
        :key="index"
        :notification="notificationItem"
      />
    </div>
  </div>
</template>
<script>
import store from '../store';
import NotificationItem from '../components/NotificationItem.vue';

export default {
  name: 'Header',
  components: {
    NotificationItem,
  },
  emits: ['searchResult'],
  data() {
    return {
      isLoggedIn: false,
      profileURL: '',
      searchTerm: '',
      alreadyShownNotifications: [],
      newNotifications: [],
      showNotificationsMenu: false,
      shownNotificationsYet: false,
    };
  },
  async mounted() {
    if (localStorage.getItem('username') != null) {
      this.isLoggedIn = true;
      this.profileURL = localStorage.getItem('profileURL');

      let followedUsers = await fetch(
        '/rest/followers/getOwnFollowersOf/' + localStorage.getItem('username'),
        {
          method: 'GET',
        }
      );

      let followersResponse = await followedUsers.json();

      let alreadyShownNotifications = await fetch(
        '/rest/shownnotification/getNotificationsFor/' +
          localStorage.getItem('username'),
        {
          method: 'GET',
        }
      );
      let alreadyShownNotificationsResponse =
        await alreadyShownNotifications.json();
      for (let e = 0; e < alreadyShownNotificationsResponse.length; e++) {
        this.alreadyShownNotifications.push(
          alreadyShownNotificationsResponse[e]
        );
      }

      this.newNotifications = [];
      for (let i = 0; i < followersResponse.length; i++) {
        let notificationsRes = await fetch(
          '/rest/notification/notificationsFrom/' +
            followersResponse[i].targetusername,
          {
            method: 'GET',
          }
        );
        let relevantNotifications = await notificationsRes.json();
        for (let e = 0; e < relevantNotifications.length; e++) {
          if (alreadyShownNotificationsResponse.length == 0) {
            this.newNotifications.push(relevantNotifications[e]);
          } else {
            let shouldAdd = true;
            for (let a = 0; a < alreadyShownNotificationsResponse.length; a++) {
              if (
                relevantNotifications[e].articleid ==
                alreadyShownNotificationsResponse[a].articleid
              ) {
                shouldAdd = false;
              }
            }
            if (shouldAdd) {
              this.newNotifications.push(relevantNotifications[e]);
            }
          }
        }
      }
    }
  },

  methods: {
    async showNotifications() {
      if (
        this.showNotificationsMenu == false &&
        this.newNotifications.length > 0
      ) {
        this.showNotificationsMenu = true;
        this.shownNotificationsYet = true;
      } else {
        this.showNotificationsMenu = false;
      }
      for (let i = 0; i < this.newNotifications.length; i++) {
        let newNotification = {
          content: this.newNotifications[i].content,
          authorname: this.newNotifications[i].authorname,
          authorurl: this.newNotifications[i].authorurl,
          timestamp: Date.now(),
          shownToUsername: localStorage.getItem('username'),
          articleid: this.newNotifications[i].articleid,
        };

        let notificationRes = await fetch(
          '/rest/shownnotification/addNewShownNotification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotification),
          }
        );
      }
    },
    async goBackToHomePage() {
      let res = await fetch('/rest/articles/', {
        method: 'GET',
      });
      let response = await res.json();
      this.$emit('searchResult', response);
      this.searchTerm = '';
    },
    async search() {
      if (this.searchTerm.length == 0) {
        let res = await fetch('/rest/articles/', {
          method: 'GET',
        });
        let response = await res.json();
        this.$emit('searchResult', response);
      } else {
        let res = await fetch(
          '/rest/articles/findArticleByTerm/' + this.searchTerm,
          {
            method: 'GET',
          }
        );
        let response = await res.json();
        this.$emit('searchResult', response);
      }
    },
    async logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('profileURL');
      localStorage.removeItem('userid');
      this.isLoggedIn = false;
      this.profileURL = '';
      this.$router.push('/');
    },
    goToMyContent() {
      this.$router.push('/myContent');
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
}
.logoutDiv {
  width: max-content;
  position: absolute;
  right: -2px;
  top: 60px;
  background-color: white;
  border-radius: 10px;
  padding-left: 6px;
  padding-right: 6px;
  border: solid 0.6px black;
}
.notificationBox {
  width: 200px;
  min-height: 200px;
  height: max-content;
  background-color: white;
  border: solid 1px black;
  display: inline;
  position: absolute;
  top: 50px;
  right: 60px;
  z-index: 30;
  border-radius: 30px;
}
.upperGrid {
  background-color: rgb(97, 191, 197);
  display: grid;
  grid-template-columns: 47px auto max-content 47px;
}
.notLoggedInUpperGrid {
  background-color: rgb(97, 191, 197);
  display: grid;
  grid-template-columns: 47px auto max-content 1px;
}
.lowerGrid {
  background-color: rgb(97, 191, 197);
}
.codeTextDiv {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  padding-top: 20px;
  position: relative;
  left: -6px;
}
.loginButton,
.profileImage {
  background: #c4c4c4;
  border: 0.7px solid #000000;
  box-sizing: border-box;
  border-radius: 30px;
  width: 45px;
  height: 45px;
  margin-top: 11px;
}
.loginButton {
  position: relative;
  left: -20px;
}
.profileImage {
  position: relative;
  left: 0px;
}
.numberOfNotificationsDiv {
  background-color: red;
  color: white;
  position: relative;
  text-align: center;
  top: 32px;
  z-index: 20;
  left: -20px;
  width: 16px;
  padding-left: 1px;
  height: 17px;
  font-size: 14px;
  border-radius: 30px;
}
.homeIcon {
  height: 30px;
  width: 30px;
  border-radius: 30px;
  margin-left: 12px;
  margin-top: 20px;
}
.searchInput {
  border-radius: 10px;
  border: solid 0.3px black;
  padding-left: 5px;
  width: 140px;
  margin-left: 115px;
  margin-bottom: 3px;
  display: inline-block;
  margin-top: 16px;
}
.glassIcon {
  position: relative;
  top: -30px;
  left: 270px;
  width: 30px;
  border-radius: 10px;
  border: solid 2px #c4c4c4;
  outline: solid 1px black;
}
.libraryText {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  font-size: 20px;
}
.notificationIcon {
  position: relative;
  width: 30px;
  height: 30px;
  top: 20px;
  left: -18px;
  z-index: 5;
}
.notificationIconWithNumber {
  position: relative;
  width: 30px;
  height: 30px;
  top: 1px;
  left: -18px;
  z-index: 5;
}
.notificationIconShown {
  position: relative;
  width: 30px;
  height: 30px;
  top: 20px;
  left: -18px;
  z-index: 5;
}
.notificationIconWithShowNotificationsMenu {
  position: relative;
  width: 30px;
  height: 30px;
  top: 20px;
  left: -18px;
  z-index: 5;
}
.NoNotificationsIcon {
  position: relative;
  width: 30px;
  height: 30px;
  top: 20px;
  left: -18px;
  z-index: 5;
}
.profileURL {
  position: relative;
  left: -18px;
}
</style>
