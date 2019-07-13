<template>
  <b-modal ref="userpass" id="userpass" size="md" hide-footer :title="'Update password'">
    <b-form method="post" @submit.prevent="change_user">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <b-row class="top-10">
        <b-col>
          <b-form-input type="password" required v-model="old_password" placeholder="Old Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col>
          <b-form-input type="password" required v-model="password" :state="password_state" placeholder="New Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col>
          <b-form-input type="password" required v-model="confirm_password" :state="password_state" placeholder="Confirm New Password"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="top-10">
        <b-col> 
          <b-button type="submit" variant="primary" class="fullwidth">Update</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import EventBus from "@/eventbus";
export default {
  name: 'ChangePass',
  data () {
    return {
      error: false,
      password: '',
      confirm_password: '',
      old_password: '',
    };
  },
  mounted () {
    EventBus.$on("changepass", user_data => {
      this.$refs.userpass.show()
    });
  },
  computed: {
    password_state () {
      return this.password ===  this.confirm_password || this.password == '' ? true : false
    }
  },
  methods: {
    change_user () {
      if (this.confirm_password === this.password ) {
        var post_data = {password:this.password, password_confirm:this.confirm_password, password_old:this.old_password}  
        this.$http.put('user', post_data)
          .then(this.$refs.userpass.hide())
      }
    }
  }
};
</script>