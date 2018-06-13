<template>
  <div v-if="initialized" class="audioplayer">
    <iframe
      ref="iframe"
      width="100%" height="300" scrolling="no" frameborder="no"
      allow="autoplay"
      :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${song}&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=true`" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import SoundcloudWidget from 'soundcloud-widget'

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
        // console.log('song changed, already initted')
        // await this.$nextTick()
        setTimeout(() => {
          this.widget.play()
        }, 300)
        // this.widget.play()
      }
      this.$store.dispatch('play_audio')
    },
    async playing(val) {
      if (this.ready) {
        const method = val
          ? 'play'
          : 'pause'
        this.widget[method]()
      }
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

      return new Promise(resolve => {
        this.widget.on(SoundcloudWidget.events.READY, () => {
          this.ready = true
          this.attachEventListeners()
          resolve()
        })
      })
    },
    attachEventListeners() {
      this.widget.on(SoundcloudWidget.events.PLAY, () => {
        console.log('play event!!!!!')
      })
      this.widget.on(SoundcloudWidget.events.PAUSE, (e) => {
        console.log('pause event!!!!')
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// iframe {
//   visibility: hidden;
// }
.audioplayer {
  height: 0;
  position: fixed;
  z-index: -9999;
  left: -99999px;
}
</style>
