<template>
  <b-card>
    <b-form method="get" @submit.prevent="filter_hits">
      <b-row>
        <b-col xl="10" md="10" cols="12">
          <b-form-input type="text" v-model="search_filter" placeholder="Domain"></b-form-input>
        </b-col>
        <b-col>
          <b-button type="submit" variant="primary" class="fullwidth"><font-awesome-icon icon="search" /></b-button>
        </b-col>
        <b-col>
          <b-button id="show-filter-popover-snapshot" variant="primary"><font-awesome-icon icon="filter" /></b-button>
          <b-popover placement="bottom" target="show-filter-popover-snapshot">
            <b-row>
              <b-col>Confirmed</b-col>
              <b-col cols="4"><b-form-checkbox v-model="filter_confirmed" switch></b-form-checkbox></b-col>
            </b-row>
            <b-row>
              <b-col>Monitored</b-col>
              <b-col cols="4"><b-form-checkbox v-model="filter_monitored" switch></b-form-checkbox></b-col>
            </b-row>
          </b-popover>
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
  name: 'HitsFilter',
  data(){
    return {
    }
  },
  computed: {
    search_filter: {
      get () {
        return this.$store.getters['target/domain']
      },
      set (value) {
        this.$store.commit('target/update_domain', value)
      }
    },
    filter_monitored: {
      get () {
        return this.$store.getters['target/monitored']
      },
      set (value) {
        this.$store.commit('target/filter_monitored', value)
      }
    },
    filter_confirmed: {
      get () {
        return this.$store.getters['target/confirmed']
      },
      set (value) {
        this.$store.commit('target/filter_confirmed', value)
      }
    }
  },
  methods: {
    filter_hits () {
      console.log(1)
      EventBus.$emit('refreshscreenshots', this.search_filter)
    }
  } 
}
</script>
