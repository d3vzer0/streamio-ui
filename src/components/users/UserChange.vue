<template>
  <b-modal ref="changepass" id="changepass" size="md" hide-footer :title="'Change user: ' + username">
    <b-form method="post" @submit.prevent="change_user">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <b-row>
        <b-col>
          <b-form-input type="password" v-model="password" placeholder="New Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col>
          <b-form-input type="password" v-model="confirm_password" placeholder="Confirm New Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col>
          <b-form-select :options="role_options" v-model="role"/>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col> 
          <b-button type="submit" variant="primary" class="fullwidth">Update</b-button>
        </b-col>
        <b-col>
          <span class="float-right" v-on:click="delete_user()"><font-awesome-icon icon="trash" /></span>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import EventBus from "@/eventbus";
export default {
  name: 'ChangeUser',
  data() {
    return {
      error: false,
      username: '',
      password: '',
      confirm_password: '',
      role: '',
      role_options: ['user', 'admin']
    };
  },
  mounted() {
    EventBus.$on("changeuser", user_data => {
      this.username = user_data.username;
      this.role = user_data.role;
      this.$refs.changepass.show();
    });
  },
  methods: {
    delete_user() {
      var user_url = `user/${this.username}`
      this.$http.delete(user_url)
        .then(this.$refs.changepass.hide())
    },
    change_user() {
      var user_url = `user/${this.username}`
      if (this.confirm_password === this.password ) {
        var post_data = {username:this.username, password:this.password, password_confirm:this.confirm_password, role:this.role}
        this.$http.put(user_url, post_data)
          .then(this.$refs.changepass.hide())
      }
    }
     
  },
  components: {}
};
</script>