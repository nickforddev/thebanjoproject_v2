<template>
  <div class="map-marker" v-if="open">
    <div class="flex">
      <div class="title" v-html="data.title.rendered" />
      <slideshow v-if="data.acf.media !== 'none'" :data="data" />
    </div>
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
      console.log(this.data)
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

<style lang="scss">
.flex {
  display: flex;
  max-height: inherit;
  height: inherit;
  flex-direction: column;
}
.title {
  text-align: center;
  padding-bottom: 10px;
}
.map-marker {
  .slideshow {
    .slideshow-video {
      .video-container {
        height: 320px;
      }
    }
  }
}
</style>
