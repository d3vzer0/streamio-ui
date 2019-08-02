<template>
  <masonry :cols="3" :gutter="40">
      <b-card class="screenshot-card" v-for="(screenshot, index) in screenshots" :key="index" :img-src="screenshot.data">
        <b-row>
          <b-col cols="2">
            <b>URL</b>
          </b-col>
          <b-col v-if="!filter_unique">
            {{screenshot.url}}
          </b-col>
          <b-col v-else>
            {{screenshot._id.url}}
          </b-col>
        </b-row>
         <b-row>
          <b-col cols="2">
            <b>Tag</b>
          </b-col>
          <b-col>
            {{ screenshot.tag }}
          </b-col>
        </b-row>
        <b-row class="top-10">
          <b-col>
              <b-button variant="primary" disabled><font-awesome-icon icon="redo" /></b-button>
          </b-col>
          <b-col>
              <b-button variant="primary" @click="delete_imagecompare(screenshot._id['$oid'])"><font-awesome-icon icon="trash" /></b-button>
          </b-col>
        </b-row>
      </b-card>
  </masonry>
</template>

<script>
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import axios from '@/api/axios'
import EventBus from '@/eventbus'

Vue.use(VueMasonry)

export default {
  name: 'ImageCompareOverview',
  data(){
    return {
      screenshots: [],
      screenshot_data: {},
      error: '',
    }
  },
  computed: {
    filter_unique: {
      get () {
        return this.$store.getters['target/unique']
      }
    }
  },
  // created (){
  //   this.get_imagecompare()
  // },
  mounted (){
    this.get_imagecompare()
  },
  methods: {
    get_imagecompare () {
        this.$http
        .get('comparepages', {params:{search:this.search_value }})
          .then(response => this.parse_screenshots(response))
    },
    parse_screenshots (response) {
      this.screenshots = []
      for (let [index, element] of response.data.data.entries()) {
        var img_data = this.download_image(element).then(response => {
          element.data = response
          this.screenshots.push(element)
        })
      }
     },
     delete_imagecompare (id) {
       var delete_url = `comparepage/${id}`
       this.$http
        .delete(delete_url)
        .then(response =>  this.get_imagecompare())
     },
    from_unix (unix_timestamp) {
      var from_miliseconds = unix_timestamp / 1000;
      var datetime = this.$moment.unix(from_miliseconds).format('YYYY-MM-DD HH:mm:ss');
      return datetime;
    },
    download_image (element) {
      var image_id = element.screenshots[0].screenshot['$oid']
      var image_url = `${axios.defaults.baseURL}/snapshot/${image_id}`
      return this.$http.get(image_url, { responseType: 'arraybuffer'}).then(response => {
        var img_object = new Buffer(response.data, 'binary').toString('base64')
        var img_src = 'data:image/png;base64, ' + img_object
        return img_src
      })
    },
  }
};
</script>

<style lang="scss">

.agent-card{
  width: 100%;
}
 
.card{
  margin-bottom: 20px;
  word-break: break-all;
  &.active {
    border-color: #9e1d1d;
    border-width: 2px;
  }
  .btn {
    width: 100%;
  }
}

</style>
