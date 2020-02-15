<template>
  <div v-if="type === 'playlists'">
    Content coming soon!
  </div>
  <div v-else-if="fetched" class="grid">
    <thumbnail
      v-for="(video, index) in data"
      :data="video"
      :key="index" />
  </div>
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
      if (this.type !== 'playlists') {
        this.fetched = false
        this.data = await this.$request(`wp/v2/videos?per_page=99&_embed&filter[type]=${this.type}`)
        this.fetched = true
      }
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
