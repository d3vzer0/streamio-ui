<template>
  <masonry :cols="3" :gutter="40">
      <b-card class="screenshot-card" v-for="(screenshot, index) in screenshots" :key="index" :img-src="screenshot.data">
        <b-row>
          <b-col cols="3">
          URL
          </b-col>
          <b-col v-if="!filter_unique">
            {{screenshot.url}}
          </b-col>
          <b-col v-else>
            {{screenshot._id.url}}
          </b-col>
        </b-row>
        <b-row v-if="screenshot.timestamp">
          <b-col cols="3">
            Time
          </b-col>
          <b-col>
            {{from_unix(screenshot.timestamp["$date"])}}
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col cols="3">
            First Seen
          </b-col>
          <b-col>
            {{from_unix(screenshot.firstSeen["$date"])}}
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
  name: 'ScreenshotsOverview',
  data(){
    return {
      screenshots: [],
      screenshot_data: {},
      search_value: this.$store.getters['target/domain'],
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
  created (){
    EventBus.$on('refreshscreenshots', search_value => {
      this.search_value = search_value
      this.get_screenshots()
    })
  },
  mounted (){
    this.get_screenshots()
  },
  methods: {
    get_screenshots () {
        this.$http
        .get('snapshots', {params:{search:this.search_value, distinct: this.filter_unique}})
          .then(response => this.parse_screenshots(response))
     },
    parse_screenshots (response) {
      this.screenshots = []
      for (let [index, element] of response.data.entries()) {
        var img_data = this.download_image(element).then(response => {
          element.data = response
          this.screenshots.push(element)
        })
      }
     },
    from_unix (unix_timestamp) {
      var from_miliseconds = unix_timestamp / 1000;
      var datetime = this.$moment.unix(from_miliseconds).format('YYYY-MM-DD HH:mm:ss');
      return datetime;
    },
    download_image (element) {
      var image_id = element.screenshot['$oid']
      var image_url = `${axios.defaults.baseURL}snapshot/${image_id}`
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
