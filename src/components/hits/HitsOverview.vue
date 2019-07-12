<template>
  <b-card header-tag="header">
    <server-side type="hits" :dataloc="data_loc" :countloc="count_loc" :limit="limit" :filter="search_filter" :output="output" :expectedfields="expected_fields" :target="target_url"></server-side>
  </b-card>
</template>

<script>
import EventBus from '@/eventbus'
import ServerSide from '@/components/tables/ServerSide'

export default {
  name: 'HitsOverview',
  components: {
    ServerSide
  },
  data(){
    return {
      search_filter: '',
      count_loc: 'count',
      data_loc: 'results',
      target_url: 'hits',
      limit: 30,
      expected_fields: {
        confirmed: 'confirmed',
        timestamp: 'timestamp.$date',
        url: 'url',
        pattern_match: 'matching.value',
        source_filter: 'matching.name',
        details: 'matching.data',
        datasource: 'datasource',
        enabled: 'enabled',
        id: '_id.$oid',
        _showDetails: true
      },
      output: {
        confirmed: { label: '', tdClass: 'col-actions' },
        timestamp: { label: 'Timestamp', tdClass: 'col-timestamp'},
        url: { label:'Url', tdClass: '' },
        datasource: { label:'Datasource', tdClass: 'col-datasource' },
        source_filter: { label: 'Filter type', tdClass: 'col-source'},
        pattern_match: { label:'Pattern', tdClass: 'col-pattern' },
        show_details: {label :'Details', tdClass: 'col-details'}
      }
    }
  }
}
</script>
