<template>
  <div id="app">
    <div v-if="$route.name == 'Intro'">
      <navigation-horizontal />
      <router-view />
    </div>
    <div v-else>
      <navigation />

      <main>
        <audio-player />
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/nav'
import NavigationHorizontal from '@/components/nav/horizontal'
import AudioPlayer from '@/components/audioplayer'

export default {
  name: 'app',
  created() {
    console.log(this.$route)
  },
  components: {
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
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto
}
</style>
