<template>
  <div id="app">
    <navigation />
    
    <main>
      <audio-player />
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/nav'
import AudioPlayer from '@/components/audioplayer'

export default {
  name: 'app',
  components: {
    Navigation,
    AudioPlayer
  }
}
</script>

<style lang="scss">
$nav-width: 160px;

#app {
  height: 100%;
}
nav {
  width: $nav-width;
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
