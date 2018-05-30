<template>
  <div v-if="initialized" class="audioplayer">
    <iframe
      ref="iframe"
      width="100%" height="300" scrolling="no" frameborder="no"
      :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${song}&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=true`" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import SoundcloudWidget from 'soundcloud-widget'
import { sleep } from '@/utils'

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
        this.$store.dispatch('play')
      } else {
        // console.log('already initted, playing')
        this.widget.play()
      }
      // else {
        // await this.updateSong()
      // }
      // if (val) {
        // console.log('attempting to play')
        // this.$store.dispatch('play')
        // await sleep(200)
        // this.widget.play()
      // }
    },
    async playing(val) {
      // console.log('playing changed', val)
      if (this.ready) {
        await sleep(1200)
        const method = val
          ? 'play'
          : 'pause'
        // console.log({method})
        this.widget[method]()
        // this.widget.toggle()
        // console.log(this.widget.play)
        // this.widget.play()
      }
    }
    // ready() {
    //   console.log('ready changed, playing')
    //   this.widget.play()
    // }
  },
  computed: {
    ...mapGetters({
      song: 'audio:active_song',
      playing: 'audio:playing'
    })
  },
  methods: {
    async init() {
      // console.log('init!')
      this.initialized = true
      await this.$nextTick()
      // console.log(this.$refs.iframe)
      // await sleep(500)
      this.widget = new SoundcloudWidget(this.$refs.iframe)
      // console.log(this.widget)

      return new Promise(resolve => {
        this.widget.on(SoundcloudWidget.events.READY, () => {
          // console.log('widget is ready!')
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

      this.widget.on(SoundcloudWidget.events.PAUSE, () => {
        console.log('pause event!!!!')
        // this.widget.play()
      })
    }
    // async updateSong() {
    //   const url = `https://api.soundcloud.com/${this.song}`
    //   var options = {
    //     auto_play: true
        // buying: buying.checked
        // liking: liking.checked,
        // download: download.checked,
        // sharing: sharing.checked,
        // show_artwork: show_artwork.checked,
        // show_comments: show_comments.checked,
        // show_playcount: show_playcount.checked,
        // show_user: show_user.checked,
        // start_track: Number(start_track.value)
    //   }
    //   return this.widget.load(url, options)
    // }
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
