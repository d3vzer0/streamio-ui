<template>
  <div class="state">
    <b-row class="state-filters top-10">
      <b-col cols="12">
        <state-filters></state-filters>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import StateFilters from '@/components/state/StateFilters'

export default {
  name: 'State',
  components: {
      StateFilters
  }
}
</script>
