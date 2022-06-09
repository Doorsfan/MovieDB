<template>
  <div class="loginHeader">
    <div @click="goToHomepage" class="homeDiv">
      <img class="homeIcon" src="../images/home.png" />
    </div>
    <div class="codeLibraryText">--=== The Code Library ===--</div>
  </div>
  <div class="loginText">--=== Login ===--</div>
  <div class="LoginBox">
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
    <button
      v-if="wantedUsername.length > 0 && wantedPassword.length > 0"
      @click="login"
      class="loginButton"
      type="button"
      value="Login"
    >
      Login
    </button>
    <button
      v-if="wantedUsername.length == 0 || wantedPassword.length == 0"
      disabled
      class="disabledLoginButton"
      type="button"
      value="Login"
    >
      Login
    </button>
    <router-link class="registerLink" to="/Register">
      <div class="registerLinkDiv">Register a New Account</div>
    </router-link>
  </div>
  <Footer class="loginFooter" />
</template>
<script>
import Footer from '../components/Footer.vue';
import store from '../store';

export default {
  name: 'LoginPage',
  components: {
    Footer,
  },
  data() {
    return {
      wantedUsername: '',
      wantedPassword: '',
    };
  },
  mounted() {},
  watch: {},
  methods: {
    goToHomepage() {
      this.$router.push('/');
    },
    async login() {
      let res = await fetch(
        '/rest/users/username/' +
          this.wantedUsername +
          '/' +
          this.wantedPassword,
        {
          method: 'GET',
        }
      );

      let response = await res.json();
      if (response.username == '' && response.profileURL == '') {
        alert('Bad credentials');
      } else {
        localStorage.setItem('username', this.wantedUsername);
        localStorage.setItem('profileURL', response.profileURL);
        localStorage.setItem('userid', response.id);
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
.usernameInput,
.passwordInput {
  width: 293px;
  height: 24px;
  padding-left: 5px;
}

.registerLink,
.registerLink:visited {
  text-decoration: none;
  color: blue;
  width: max-content;
}
.disabledLoginButton {
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
}
.loginButton {
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
}
.loginHeader {
  display: grid;
  grid-template-columns: 20px auto;
  background-color: #61bfc5;
  height: 60px;
}
.usernameBox,
.passwordBox {
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
.LoginBox {
  height: 247px;
  width: 389px;
  background-color: #61bfc5;
  position: relative;
  top: 225px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
.loginText {
  position: relative;
  top: 198px;
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
.loginFooter {
  position: relative;
  top: calc(100vh - 399px);
}
</style>
