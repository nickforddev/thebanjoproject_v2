<template>
  <transition name="fade">
    <div id="app" v-if="loaded">
      <div v-if="$route.path !== '/'">
        <navigation />
        <main>
          <!-- <audio-player /> -->
          <video-player />
          <router-view />
        </main>
        <global-audio-player />
      </div>
      <div v-else>
        <navigation-horizontal />
        <router-view />
      </div>
    </div>
    <firstload v-else @loaded="onLoaded" />
  </transition>
</template>

<script>
import Firstload from '@/components/firstload'
import Navigation from '@/components/nav'
import NavigationHorizontal from '@/components/nav/horizontal'
import GlobalAudioPlayer from '@/components/player/global'
// import AudioPlayer from '@/components/audioplayer'
import VideoPlayer from '@/components/videoplayer'

export default {
  name: 'app',
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    onLoaded() {
      this.loaded = true
    }
  },
  components: {
    Firstload,
    Navigation,
    NavigationHorizontal,
    GlobalAudioPlayer,
    // AudioPlayer,
    VideoPlayer
  }
}
</script>

<style lang="scss">
@import '~%/variables';

#app {
  height: 100%;
}
main {
  position: relative;
  left: $nav-width;
  width: calc(100% - #{$nav-width});
  height: calc(100vh - #{$player-height});
  overflow-x: hidden;
  overflow-y: auto
}
</style>
