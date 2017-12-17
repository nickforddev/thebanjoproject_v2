<template>
  <div>
    <video-slide v-for="(video, index) in data" :data="video" :key="index" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoSlide from '@/components/video'

export default {
  name: 'slideshow-video',
  props: {
    data: Array
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