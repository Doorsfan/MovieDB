<template>
  <div class="loginHeader">
    <div @click="goToHomepage" class="homeDiv">
      <img class="homeIcon" src="../images/home.png" />
    </div>

    <div class="codeLibraryText">--=== The Code Library ===--</div>
  </div>
  <div class="registerText">--=== Register ===--</div>
  <div class="RegisterBox">
    <div class="usernameBox">
      <div class="usernameText">-= Username =-</div>
      <input
        v-model="wantedUsername"
        class="usernameInput"
        type="text"
        placeholder="Username.."
      />
    </div>
    <div class="passwordBox">
      <div class="passwordText">-= Password =-</div>
      <input
        v-model="wantedPassword"
        class="passwordInput"
        type="password"
        placeholder="Password.."
      />
    </div>
    <div class="passwordBox">
      <div class="passwordText">-= Repeat Password =-</div>
      <input
        v-model="repeatWantedPassword"
        class="passwordInput"
        type="password"
        placeholder="Repeat Password.."
      />
    </div>
    <div class="imageURLBox">
      <div class="imageURLText">-= Profile URL =-</div>
      <input
        v-model="wantedImageURL"
        class="imageURLInput"
        type="text"
        placeholder="Your Profile URL.."
      />
      <img
        v-if="wantedImageURL.length == 0"
        class="profileIcon"
        src="../images/profile.png"
      />
      <img
        v-if="wantedImageURL.length > 0"
        class="profileIcon"
        :src="wantedImageURL"
      />
    </div>
    <button
      v-if="
        wantedUsername.length > 0 &&
        wantedPassword.length > 0 &&
        wantedPassword == repeatWantedPassword
      "
      class="registerButton"
      type="button"
      value="Register"
      @click="register"
    >
      Register
    </button>
    <button
      v-else
      disabled
      class="disabledRegisterButton"
      type="button"
      value="Register"
    >
      Register
    </button>
  </div>
  <Footer class="loginFooter" />
</template>
<script>
import store from '../store';
import Footer from '../components/Footer.vue';

export default {
  name: 'RegisterPage',
  components: {
    Footer,
  },
  data() {
    return {
      wantedUsername: '',
      wantedPassword: '',
      repeatWantedPassword: '',
      wantedImageURL: '',
    };
  },
  methods: {
    goToHomepage() {
      this.$router.push('/');
    },
    async register() {
      let user = {
        username: this.wantedUsername,
      };

      let res = await fetch(
        '/rest/users/register/' +
          this.wantedUsername.toString() +
          '/' +
          this.wantedPassword.toString(),
        {
          method: 'POST',
          body: JSON.stringify(this.wantedImageURL),
        }
      );
      let response = await res.json();
      if (response.username.length == 0) {
        alert('That username is already taken. Please try again.');
      } else {
        localStorage.setItem('username', this.wantedUsername);
        localStorage.setItem('profileURL', response.profileURL);
        this.$router.push('/');
      }
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
.disabledRegisterButton {
  width: 140px;
  height: 35px;
  border-radius: 10px;
  background: rgba(60, 60, 60, 1);
  color: rgb(150, 150, 150);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #000000;
  box-sizing: border-box;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  margin-top: 27px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 22px;
  position: relative;
  top: 50px;
}
.registerButton {
  width: 140px;
  height: 35px;
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
  position: relative;
  top: 50px;
}
.registerText {
  position: relative;
  top: 128px;
  width: 100vw;
  text-align: center;
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
.profileIcon {
  width: 50px;
  height: 50px;
  border-radius: 30px;
  position: absolute;
  top: 320px;
  left: 172px;
}
.RegisterBox {
  height: 450px;
  width: 389px;
  background-color: #61bfc5;
  position: relative;
  top: 145px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
.loginHeader {
  display: grid;
  grid-template-columns: 20px auto;
  background-color: #61bfc5;
  height: 60px;
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
.homeIcon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 14px;
}

.loginFooter {
  position: sticky;
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
.usernameBox,
.passwordBox,
.imageURLBox {
  text-align: center;
  padding-top: 21px;
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
input {
  padding-left: 5px;
}
</style>
