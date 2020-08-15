<template>
  <div>
    <div class="playlist" v-for="(playlist, index) in data" :key="index">
      <h2 v-html="playlist.title.rendered"></h2>
      <ul v-if="playlist.acf.songs">
        <li v-for="({ song }, index) in playlist.acf.songs" :key="index">
          <a
            href="#"
            @click.prevent="playPlaylistAudio(playlist, song)"
          >
            {{ song.title }}
          </a>
        </li>
      </ul>
    </div>
    <!-- <pre>{{data}}</pre> -->
  </div>
</template>

<script>
import { sleep } from '@/utils'

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
    },
    playPlaylistAudio(playlist, song) {
      this.$store.dispatch('set_active_playlist', playlist)
      this.$store.dispatch('set_active_song', song)
      this.$nextTick(async() => {
        await sleep(500)
        window.$player.$refs.player.play()
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
