<template>
  <div class="users">
    <b-row class="usercreate top-10">
      <b-col cols="12">
        <user-create></user-create>
      </b-col>
    </b-row>
    <b-row class="useroverview top-50">
      <b-col cols="12">
        <user-overview></user-overview>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UserCreate from '@/components/users/UserCreate'
import UserOverview from '@/components/users/UserOverview'

export default {
  name: 'Users',
  components: {
      UserCreate,
      UserOverview,
  }
}
</script>
