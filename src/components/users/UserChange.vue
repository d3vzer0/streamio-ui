<template>
  <b-modal ref="changepass" id="changepass" size="md" hide-footer :title="'Change user: ' + username">
    <b-form method="post" @submit.prevent="change_user">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <b-row>
        <b-col>
          <b-form-input type="password" required v-model="password" placeholder="New Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col>
          <b-form-input type="password" required v-model="confirm_password" placeholder="Confirm New Password"></b-form-input>
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
    };
  },
  mounted() {
    EventBus.$on("changeuser", user_data => {
      this.username = user_data.username;     
      this.$refs.changepass.show();
    });
  },
  methods: {
    delete_user() {
      var user_url = `user/${this.username}`
      this.$http.delete(user_url)
        .then(this.$refs.changepass.hide(), EventBus.$emit('refreshtable', ''))
    },
    change_user() {
      if (this.confirm_password === this.password ) {
        var user_url = `user/${this.username}/password`
        var post_data = {username:this.username, password:this.password, password_confirm:this.confirm_password}
        this.$http.put(user_url, post_data)
          .then(this.$refs.changepass.hide())
      }
    }
     
  },
  components: {}
};
</script>