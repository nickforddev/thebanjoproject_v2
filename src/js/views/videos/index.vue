<template>
  <div class="content">
    <h1>Videos</h1>
    <div v-if="fetched" class="grid">
      <thumbnail
        v-for="(video, index) in collection"
        :data="video"
        :key="index" />
    </div>
    <loading v-else />
    <router-view />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Thumbnail from './thumbnail'

export default {
  name: 'videos',
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/videos?per_page=99&_embed',
      id_attribute: 'slug'
    })
  },
  mounted() {
    this.fetch()
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
