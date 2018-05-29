<template>
  <div v-if="initialized" class="audioplayer">
    <iframe
      ref="iframe"
      :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${song}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import SoundcloudWidget from 'soundcloud-widget'
// import { sleep } from '@/utils'

export default {
  name: 'audio-player',
  data() {
    return {
      ready: false,
      initialized: false
    }
  },
  watch: {
    async song(val) {
      if (!this.initialized) {
        await this.init()
      } else {
        await this.updateSong()
      }
      if (val) {
        this.$store.dispatch('play')
        this.widget.play()
      }
    },
    async playing(val) {
      if (this.ready) {
        const method = val
          ? 'play'
          : 'pause'
        this.widget[method]()
      }
    },
    ready() {
      this.widget.play()
    }
  },
  computed: {
    ...mapGetters({
      song: 'audio:active_song',
      playing: 'audio:playing'
    })
  },
  methods: {
    async init() {
      this.initialized = true
      await this.$nextTick()
      this.widget = new SoundcloudWidget(this.$refs.iframe)
      this.widget.on(SoundcloudWidget.events.READY, () => {
        this.ready = true
      })
    },
    async updateSong() {
      const url = `https://api.soundcloud.com/${this.song}`
      var options = {
        auto_play: true
        // buying: buying.checked
        // liking: liking.checked,
        // download: download.checked,
        // sharing: sharing.checked,
        // show_artwork: show_artwork.checked,
        // show_comments: show_comments.checked,
        // show_playcount: show_playcount.checked,
        // show_user: show_user.checked,
        // start_track: Number(start_track.value)
      }
      return this.widget.load(url, options)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
iframe {
  visibility: hidden;
}
.audioplayer {
  height: 0;
  position: fixed;
  z-index: -9999;
}
</style>
