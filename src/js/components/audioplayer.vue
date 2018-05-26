<template>
  <div v-if="initialized">
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
      }
      if (val) {
        this.$store.dispatch('play')
      }
    },
    async playing(val) {
      console.log(this.ready)
      if (this.ready) {
        // await sleep(1000)
        // this.widget.toggle()
        const method = val
          ? 'play'
          : 'pause'
        this.widget[method]()
      }
    },
    ready() {
      console.log('ready changed')
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
      console.log(this.$refs)
      this.initialized = true
      await this.$nextTick()
      this.widget = new SoundcloudWidget(this.$refs.iframe)
      this.widget.on(SoundcloudWidget.events.READY, () => {
        this.ready = true
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
