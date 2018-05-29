<template>
  <div class="audio" v-if="fetched">
    <playpause :playing="is_playing" @play="play" @pause="pause" />
    <!-- <div v-if="is_active_song">
      Active
      <div v-if="is_playing">
        <a href="#" @click.prevent="pause">Pause</a>
      </div>
      <div v-else>
        <a href="#" @click.prevent="play">Play</a>
      </div>
    </div> -->
    <a href="#" @click.prevent="toggle" v-html="$audio.title.rendered"></a>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import Audio from '@/models/audio'
import Playpause from '@/components/controls/playpause'

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
      this.fetched = true
    },
    setSong() {
      this.$store.dispatch('set_active_song', this.$audio.acf.soundcloud_path)
    },
    play() {
      if (this.is_active_song) {
        this.$store.dispatch('play')
      } else {
        this.setSong()
      }
    },
    pause() {
      this.$store.dispatch('pause')
    },
    toggle() {
      const method = this.is_playing
        ? 'pause'
        : 'play'
      this[method]()
    }
  },
  components: {
    Playpause
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>