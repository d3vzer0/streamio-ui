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
        <b-form-group>
          <b-form-checkbox-group v-model="filter_tags" :options="options"
             buttons button-variant="light">
          </b-form-checkbox-group>
        </b-form-group>

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
      options: [
        // { text: 'False positive', value: 'false-positive' },
        // { text: 'True positive', value: 'true-positive' },
        // { text: 'Monitored', value: 'monitored' },
      ]
    }
  },
  mounted () {
    this.get_tags()
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
    filter_tags: {
      get () {
        return this.$store.getters['target/tags']
      },
      set (value) {
        this.$store.commit('target/filter_tags', value)
        this.filter_hits()
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
    },
    get_tags () {
      this.$http
        .get('tags')
        .then(response => this.parse_tags(response.data))
    },
    parse_tags (response) {
      response.forEach(element => {
        this.options.push({'text':element, 'value':element})
      });
      // console.log(response)
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

#hits-filter-badges {
  .btn {
    font-size: 12px;
  }
}

</style>
