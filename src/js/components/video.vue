<template>
  <div class="video-container">
    <div v-if="fetched" class="video">
      <vimeo-player ref="player" :video-id="video_id" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Video from '@/models/video'

export default {
  name: 'video',
  props: {
    data: Object
  },
  models: {
    video() {
      return new Video({
        id: this.data.ID
      }, {
        basePath: 'wp/v2/videos'
      })
    }
  },
  computed: {
    video_id() {
      return this.$video.acf.video_url.split('/').pop()
    }
  },
  data() {
    return {
      fetched: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$video.fetch()
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.video-container {
  height: 100%;
}
.video {
  height: 100%;

  & > div {
    height: 100%;
  }
}
iframe {
  // width: 400px;
  width: 100%;
  max-width: 100%;
  height: 100%;
}
</style>