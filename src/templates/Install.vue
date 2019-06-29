<template>
  <b-container fluid id="login-container">
    <b-row class="justify-content-md-center top-50">
      <b-col xl="4" lg="5" md="6" sm="8" xs="9" class="center-block">
        <b-card header="Create user" header-tag="header" id="card-login">
          <!-- <div id="card-login-header">
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
          </div> -->
          <b-form method="post" @submit.prevent="login">
            <b-row class="top-10">
              <b-col cols="12">
                <b-form-input type="text" class="input-field" v-model="username" required placeholder="Username"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="top-10">
              <b-col cols="12">
                <b-form-input type="password" class="input-field" v-model="password" required placeholder="Password"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="top-10">
              <b-col cols="12">
                <b-form-input type="password" class="input-field" v-model="password_confirm" required placeholder="Confirm Password"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" class="top-10">
                <b-button type="submit" variant="primary" class="fullwidth">Create</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      password_confirm: '',
      error: false
    };
  },
  methods: {
    login () {
      this.$http
        .post("setup", { username: this.username, password: this.password, password_confirm: this.password_confirm })
        .then(response => this.$router.push('/login') )
        .catch(response => this.$router.push('/login'))
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import '@/assets/style.scss';

#header-image {
  width: 100%;
}

#login-container {
  max-width: 80%;
  min-height: 100vh;

}
#card-login {
  .input-container {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }
  .icon {
    padding: 10px;
    background: #9d3a3a;
    color: white;
    min-width: 50px;
    text-align: center;
  }
  .input-field {
    box-sizing:border-box;
    border-radius: 0px;
    width: 100%;
    padding: 10px;
    outline: none;
    height: 100%;
  }
  .input-field:focus {
    border: 2px solid #9d3a3a;
  }
  #sidebar-header-image {
    width: 80%;
  }
}

</style>