<template>
  <div id="hits-filter">
    <b-row id="hits-filter-search">
      <b-col cols="12">
        <b-card>
          <b-form method="get" @submit.prevent="filter_hits">
            <b-row>
              <b-col xl="11" md="10" cols="12">
                <b-form-input type="text" v-model="search_filter" placeholder="Domain"></b-form-input>
              </b-col>
              <b-col>
                <b-button type="submit" variant="primary" class="fullwidth"><font-awesome-icon icon="search" /></b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row id="hits-filter-badges">
      <b-col cols="12">
        <b-badge class="filter-badge" v-if="filter_confirmed" pill v-on:click="filter_confirmed=false, filter_hits()" href="#" variant="light">Confirmed</b-badge>
        <b-badge class="filter-badge" v-else pill href="#" v-on:click="filter_confirmed=true, filter_hits()" variant="light">Unknown</b-badge>

        <b-badge class="filter-badge" pill href="#" v-if="filter_monitored" v-on:click="filter_monitored=false, filter_hits()" variant="light">Enabled</b-badge>
        <b-badge class="filter-badge" pill href="#" v-else v-on:click="filter_monitored=true, filter_hits()" variant="light">Disabled</b-badge>

      </b-col>
    </b-row>
  </div>
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
  beforeDestroy () {
    EventBus.$off('refreshtable')
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
      EventBus.$emit('refreshtable', this.search_filter)
    }
  } 
}
</script>

<style lang="scss">

.filter-badge {
  font-size: 12px;
  padding: 7px;
  margin-right:20px;
}

</style>
