<template>
  <div class="audio" v-if="fetched">
    <div v-if="is_active_song">
      Active
      <div v-if="is_playing">
        <a href="#" @click.prevent="pause">Pause</a>
      </div>
      <div v-else>
        <a href="#" @click.prevent="play">Play</a>
      </div>
    </div>
    <a href="#" @click.prevent="setSong" v-html="$audio.title.rendered"></a>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import Audio from '@/models/audio'

export default {
  name: 'audio-player',
  props: ['uid'],
  data() {
    return {
      fetched: false
    }
  },
  models: {
    audio() {
      return new Audio({
        id: this.uid
      }, {
        basePath: 'wp/v2/audio'
      })
    }
  },
  computed: {
    is_active_song() {
      return this.$audio.acf.soundcloud_path === this.active_song
    },
    is_playing() {
      return this.is_active_song && this.playing
    },
    ...mapGetters({
      active_song: 'audio:active_song',
      playing: 'audio:playing'
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$audio.fetch()
      console.log(this.$audio)
      this.fetched = true
    },
    setSong() {
      this.$store.dispatch('set_active_song', this.$audio.acf.soundcloud_path)
    },
    play() {
      this.$store.dispatch('play')
    },
    pause() {
      this.$store.dispatch('pause')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>