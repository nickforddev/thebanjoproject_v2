<template>
  <div class="slideshow">
    <component :is="`${data.acf.media}-slideshow`" :data="data" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoSlideshow from '@/components/slideshow/video'
import AudioSlideshow from '@/components/slideshow/audio'
import ImagesSlideshow from '@/components/slideshow/images'
import ModelSlideshow from '@/components/slideshow/models'

export default {
  name: 'slideshow',
  props: ['data'],
  // data() {
  //   return {
  //     full: false
  //   }
  // },
  // mounted() {
  //   fscreen.addEventListener('fullscreenchange', (e) => {
  //     this.full = !!(fscreen.fullscreenElement)
  //   })
  // },
  // beforeDestroy() {
  //   fscreen.removeEventListener('fullscreenchange')
  // },
  // computed: {
  //   is_full() {
  //     if (this.full) {
  //       return 'fullscreen'
  //     }
  //   }
  // },
  components: {
    VideoSlideshow,
    AudioSlideshow,
    ImagesSlideshow,
    ModelSlideshow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.slideshow {
  position: relative;
  height: 100%;
  max-height: inherit;
}
// .controls {
//   button {
//     position: absolute;
//     bottom: 5px;
//     right: 5px;
//   }
// }
</style>