<template>
  <div>
    {{ huh }}
    <pre v-if="collection">{{ collection.models }}</pre>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Region from '@/models/region'

export default {
  name: 'region',
  models: {
    region() {
      return new Region()
    }
  },
  data() {
    return {
      huh: 3,
      collection: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const response = await this.$request(`wp/v2/region?slug=${this.$route.params.region}`)
      this.$region = response[0]
      this.collection = new Collection({
        basePath: `wp/v2/maps?region=${this.$region.id}`
      })
      this.collection.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>