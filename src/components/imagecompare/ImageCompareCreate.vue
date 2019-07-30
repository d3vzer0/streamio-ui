<template>
  <b-card v-if="this.$store.getters['auth/claims'].role == 'admin'">
    <b-form method="get" @submit.prevent="create_imagecompare()">
      <b-row>
         <b-col cols="8">
          <b-form-input type="text" v-model="compare_url" placeholder="URL" required></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-form-input type="text" v-model="compare_tag" placeholder="Tag" required></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-form-input type="text" v-model="compare_score" placeholder="Distance" required></b-form-input>
        </b-col>
         <b-col class="text-right">
          <b-button type="submit" variant="primary" class="fullwidth"><font-awesome-icon icon="plus" /></b-button>
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
  name: 'WhitelistCreate',
  data(){
    return {
        compare_url: '',
        compare_tag: '',
        compare_score: 10,
        search_filter: ''
    }
  },
  methods: {
    create_imagecompare () {
      this.$http.post('comparepages', { url: this.compare_url,  tag: this.compare_tag, score: this.compare_score})
    }
  }
}

</script>