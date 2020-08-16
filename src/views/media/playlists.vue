<template>
  <div v-if="fetched">
    <playlist
      v-for="(playlist, index) in data"
      :key="index"
      :playlist="playlist"
    />
  </div>
</template>

<script>
import Playlist from './playlist'

export default {
  name: 'playlists',
  data() {
    return {
      fetched: false,
      data: null
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.data = await this.$request('wp/v2/playlists?per_page=99')
      this.fetched = true
    }
  },
  components: {
    Playlist
  }
}
</script>

<style scoped lang="scss">
</style>
