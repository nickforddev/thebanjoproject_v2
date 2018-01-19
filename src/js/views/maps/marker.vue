<template>
  <div class="map-marker" v-if="open">
    <slideshow :data="data" />
    <div class="map-marker-content" v-html="data.acf.content" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'map-marker',
  props: {
    data: Object
  },
  data() {
    return {
      marker: null,
      open: false
    }
  },
  // computed: {
  //   acf() {
  //     return this.data.acf
  //   }
  // },
  methods: {
    opened() {
      this.open = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.map-marker {
  max-height: inherit;
}
.map-marker-content {
  max-height: inherit;
}
</style>