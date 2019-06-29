<template>
  <b-card header-tag="header">
    <server-side type="users" :dataloc="data_loc" :countloc="count_loc" :limit="limit" :filter="search_filter" :output="output" :expectedfields="expected_fields" :target="target_url"></server-side>
  </b-card>
</template>

<script>
import ServerSide from '@/components/tables/ServerSide'

export default {
  name: 'UsersOverview',
  components: {
    ServerSide
  },
  data(){
    return {
      search_filter: '',
      target_url: 'users',
      count_loc: 'count',
      data_loc: 'results',
      limit: 30,
      expected_fields: {
        username: 'username',
        id: '_id.$oid',
        role: 'role',
        _showDetails: false
      },
      output: {
        username: { label:'Username' },
        role: { label: 'Role' },
        id: { label:'ID' },
        show_change: { label: '' },
      }
    }
  },
  methods: {
 
  },
};
</script>
