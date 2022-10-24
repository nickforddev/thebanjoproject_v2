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
</style>
