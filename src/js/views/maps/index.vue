<template>
  <div class="content">
    <h1>Maps</h1>
    <div v-if="fetched" class="grid">
      <thumbnail
        v-for="(region, index) in filtered_collection"
        :data="region"
        :key="index" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
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
  computed: {
    filtered_collection() {
      return this.collection.filter(region => {
        const hide = path(['acf', 'hide', 0], region)
        return !hide
      })
    }
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
  max-width: 1068px;
  margin: 20px;
}
</style>