<template>
  <transition name="fade">
    <div id="app" v-if="loaded">
      <div v-if="$route.path !== '/'">
        <div v-if="!mobile">
          <navigation />
        </div>
        <div v-else>
          <navigation-horizontal />
        </div>
        <main :class="mobile && 'mobile'">
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
      loaded: false,
      width: window.innerWidth,
      mobile: false
    }
  },
  watch: {
    width() {
      this.checkScreenWidth()
    }
  },
  mounted() {
    this.checkScreenWidth()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.width = window.innerWidth
    },
    onLoaded() {
      this.loaded = true
    },
    checkScreenWidth() {
      if (this.width < 768) {
        this.mobile = true
      } else {
        this.mobile = false
      }
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
  overflow-y: auto;

  &.mobile {
    left: 0;
    top: $nav-horizontal-height;
    width: 100%;
    height: calc(100vh - #{$player-height} - #{$nav-horizontal-height});
    margin-right: 0;
  }
}
</style>
