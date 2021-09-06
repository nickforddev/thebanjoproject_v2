<template>
  <div class="video-container" v-if="video_slug" @click.self="close">
    <div class="video" v-if="fetched">
      <vimeo-player ref="player" :video-id="video_id" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'video-view',
  data() {
    return {
      data: null,
      fetched: false
    }
  },
  // mounted() {
  //   this.fetch()
  // },
  watch: {
    video_slug(val) {
      if (val) {
        this.fetch()
      } else {
        this.data = null
      }
    }
  },
  computed: {
    ...mapGetters({
      video_slug: 'video:active_video'
    }),
    video_id() {
      return this.data.acf.video_url.split('/').pop()
    }
  },
  methods: {
    close() {
      this.$store.dispatch('set_active_video', null)
      // this.$router.push('/videos')
    },
    async fetch() {
      this.fetched = false
      const response = await this.$request(`wp/v2/videos?slug=${this.video_slug}&_embed`)
      this.data = response[0]
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

.video-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0, 0.8);
  color: white;
  z-index: 99999999;

  .video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
  }
}

@media (max-width: $breakpoint-large) {
  .video-container {
    .video {
      width: 70vw;
    }
  }
}

@media (max-width: $breakpoint-medium) {
  .video-container {
    .video {
      width: 80vw;
    }
  }
}

@media (max-width: $breakpoint-small) {
  .video-container {
    .video {
      width: 90vw;
    }
  }
}
</style>
