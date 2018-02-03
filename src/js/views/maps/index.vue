<template>
  <div class="content">
    <h1>Maps</h1>
    <div v-if="fetched" class="grid">
      <thumbnail
        v-for="(region, index) in collection"
        :data="region"
        :key="index" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Thumbnail from './thumbnail'

export default {
  name: 'maps',
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/region?per_page=99',
      id_attribute: 'slug'
    })
  },
  async created() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    }
  },
  components: {
    Thumbnail
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  margin: 20px;
}
</style>