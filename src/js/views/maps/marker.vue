<template>
  <div v-if="open">
    <!-- <div v-if="data.acf.media === 'video'">
      
    </div> -->
    <component v-if="data.acf.media !== 'none'" :is="`${data.acf.media}-slideshow`" :data="data.acf[data.acf.media]" />
    <!-- <button @click="test"></button> -->
    <div v-html="data.acf.content" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoSlideshow from '@/components/slideshow/video'
import AudioSlideshow from '@/components/slideshow/audio'
import ImagesSlideshow from '@/components/slideshow/images'

export default {
  name: 'marker',
  props: {
    data: Object
  },
  data() {
    return {
      marker: null,
      open: false
    }
  },
  computed: {
    acf() {
      return this.data.acf
    }
  },
  methods: {
    test() {
      console.log('ok')
    },
    opened() {
      this.open = true
      // console.log(this.data.acf.content)
      if (this.acf.media === 'video') {
        console.log(this.acf.video)
      }
    }
  },
  components: {
    VideoSlideshow,
    AudioSlideshow,
    ImagesSlideshow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>