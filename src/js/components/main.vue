<template>
  <div id="app">
    <navigation />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/nav'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
$nav-width: 160px;

#app {
  font-family: 'Interstate', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
nav {
  width: $nav-width;
}
main {
  position: relative;
  left: $nav-width;
  width: calc(100% - #{$nav-width});
  overflow-x: hidden;
}
</style>
