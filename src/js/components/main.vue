<template>
  <transition name="fade">
    <div id="app" v-if="loaded">
      <div v-if="$route.path !== '/'">
        <navigation />

        <main>
          <audio-player />
          <router-view />
        </main>
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
import AudioPlayer from '@/components/audioplayer'

export default {
  name: 'app',
  // created() {
  //   console.log(this.$route)
  // },
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
    AudioPlayer
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
  // height: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto
}
</style>
