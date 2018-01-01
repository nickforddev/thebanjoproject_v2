<template>
  <div>
    <video-slide v-for="(video, index) in data.acf.video" :data="video" :key="index" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoSlide from '@/components/video'

export default {
  name: 'slideshow-video',
  props: {
    data: Object
  },
  created() {
    console.log(this.data)
  },
  components: {
    VideoSlide
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>