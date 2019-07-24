<template>
  <div id="filter-snapshots">
    <b-row id="filter-snapshots-search">
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
        <b-form-group>
          <b-form-radio-group @change="filter_hits()" v-model="filter_unique"
            :options="options" buttons button-variant="light"></b-form-radio-group>
        </b-form-group>
        <!-- <b-badge class="filter-badge" v-if="filter_unique" pill v-on:click="filter_unique=false, filter_hits()" href="#" variant="light">Unique</b-badge>
        <b-badge class="filter-badge" v-else pill href="#" v-on:click="filter_unique=true, filter_hits()" variant="light">Non Unique</b-badge> -->
      </b-col>
    </b-row>
    <br/>
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
      options: [
        { text: 'Unique', value: false },
        { text: 'Non Unique', value: true }
      ]
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
    filter_unique: {
      get () {
        return this.$store.getters['target/unique']
      },
      set (value) {
        this.$store.commit('target/filter_unique', value)
      }
    },
  },
  methods: {
    filter_hits () {
      EventBus.$emit('refreshscreenshots', this.search_filter)
    }
  } 
}
</script>


<style lang="scss">

#hits-filter-badges {
  .btn {
    font-size: 12px;
  }
}

</style>
