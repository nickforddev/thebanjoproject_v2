<template>
  <div v-if="fetched" class="grid">
    <thumbnail
      v-for="(video, index) in data"
      :data="video"
      :key="index" />
  </div>
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { Collection } from 'vue-collections'
import Thumbnail from './thumbnail'

export default {
  name: 'videos-list',
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      data: null,
      fetched: false
    }
  },
  // collection() {
  //   // const self = this
  //   return new Collection({
  //     basePath: `wp/v2/videos?per_page=99&_embed&filter[type]=${this.type}`,
  //     id_attribute: 'slug'
  //   })
  // },
  watch: {
    type() {
      this.fetch()
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.data = await this.$request(`wp/v2/videos?per_page=99&_embed&filter[type]=${this.type}`)
      // await this.$collection.fetch()
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

</style>
