<template>

    <b-row>
      <b-col cols="4">
        <b-card no-body header="Regex Filters Loaded">
          <b-list-group v-for="(value, index) in regex_filters" :key="index" flush>
            <b-list-group-item>{{ value }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card no-body header="Fuzzy Filters Loaded">
          <b-list-group v-for="(value, index) in fuzzy_filters" :key="index" flush>
              <b-list-group-item>{{ value.value }}: {{ value.likelihood }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card no-body header="Whitelist Filters Loaded">
          <b-list-group v-for="(value, index) in whitelist_filters" :key="index" flush>
              <b-list-group-item>{{ value }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
import Vue from 'vue'
import EventBus from '@/eventbus'

export default {
  name: 'StateFilters',
  data(){
    return {
      regex_filters: [],
      fuzzy_filters: [],
      whitelist_filters: []
    }
  },
  mounted () {
    this.get_active_filters()
  },
  methods: {
    get_active_filters () {
        this.$http
        .get('filters/state')
          .then(response => this.parse_state(response.data))
     },
     parse_state (response) {
       this.regex_filters = response['regex']
       this.fuzzy_filters = response['fuzzy']
       this.whitelist_filters = response['whitelist']
     }
  }
}
</script>