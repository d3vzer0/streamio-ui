<template>
  <b-card header-tag="header">
    <b-form method="post" @submit.prevent="create_user">
      <b-row>
        <b-col cols="3">
          <b-form-input type="text" v-model.lazy="username" placeholder="Username" required></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-form-input type="password" v-model.lazy="password" placeholder="Password" required></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-form-input type="password" v-model.lazy="password_confirm" placeholder="Confirm password" required></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-form-select v-model.lazy="role" :options="roles" placeholder="Role" required></b-form-select>
        </b-col>
        <b-col class="text-right">
          <b-button type="submit" variant="primary" required><font-awesome-icon icon="plus" /></b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import Vue from 'vue'
import EventBus from '@/eventbus'
Vue.use(require('vue-moment'))

export default {
  name: 'UserCreate',
  data () {
    return {
        username: '',
        password: '',
        password_confirm: '',
        role: 'user',
        roles: [
            { value:'admin', text:'admin' },
            { value:'user', text:'user' }
        ]
    }
  },
  
  methods: {
   create_user () {
    this.$http.post('users', { username: this.username, password: this.password, password_confirm: this.password_confirm })
      .then(console.log(1))
    },
  }
}
</script>