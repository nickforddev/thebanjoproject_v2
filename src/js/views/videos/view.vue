<template>
  <div class="video-container" @click.self="close">
    <div class="video" v-if="fetched">
      <!-- <pre>{{ data }}</pre> -->
      <vimeo-player ref="player" :video-id="video_id" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import Video from '@/models/video'

export default {
  name: 'video-view',
  data() {
    return {
      data: null,
      fetched: false
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    video_id() {
      return this.data.acf.video_url.split('/').pop()
    }
  },
  methods: {
    close() {
      this.$router.push('/videos')
    },
    async fetch() {
      this.fetched = false
      const response = await this.$request(`wp/v2/videos?slug=${this.$route.params.slug}&_embed`)
      this.data = response[0]
      this.fetched = true
    }
  }
  // models: {
  //   video() {
  //     return new Video({
  //       id: this.
  //     })
  //   }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.video-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0, 0.8);
  color: white;

  .video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
