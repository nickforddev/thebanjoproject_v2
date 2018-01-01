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

export default {
  name: 'slideshow',
  props: ['data'],
  // mounted() {
  //   console.log(this.data)
  // },
  components: {
    VideoSlideshow,
    AudioSlideshow,
    ImagesSlideshow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.slideshow {
  height: 100%;
  max-height: inherit;
}
</style>