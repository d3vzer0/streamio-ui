<template>
  <div class="imagecompare">
    <b-row class="imagecompare-add top-10">
      <b-col cols="12">
        <image-compare-create></image-compare-create>
      </b-col>
    </b-row>
    <b-row class="imagecompare-overview top-50">
      <b-col cols="12">
        <image-compare-overview></image-compare-overview>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ImageCompareCreate from '@/components/imagecompare/ImageCompareCreate'
import ImageCompareOverview from '@/components/imagecompare/ImageCompareOverview'

export default {
  name: 'ImageCompare',
  components: {
    ImageCompareCreate,
    ImageCompareOverview
  }
}
</script>
