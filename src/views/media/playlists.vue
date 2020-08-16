<template>
  <div>
    <div class="playlist" v-for="(playlist, index) in data" :key="index">
      <h2 v-html="playlist.title.rendered"></h2>
      <ul v-if="playlist.acf.songs">
        <li v-for="({ song }, index) in playlist.acf.songs" :key="index">
          <a
            href="#"
            @click.prevent="playAudio({ song, playlist })"
          >
            {{ song.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped lang="scss">

</style>
