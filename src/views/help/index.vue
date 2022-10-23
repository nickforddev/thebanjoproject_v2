<template>
  <div>
    <header>
      <h1>Help</h1>
    </header>
    <div class="content" v-if="loaded">
      <p>
        Having trouble getting around the site? Please take a brief tour in the video below:
      </p>
      <video
        class="video"
        ref="video"
        :src="tutorialVideo.url"
        controls
      />
    </div>
    <loading v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/loading'

export default {
  name: 'help',
  data: () => ({
    loaded: false
  }),
  computed: {
    ...mapGetters({
      tutorialVideo: 'video:tutorial_video'
    })
  },
  async mounted() {
    if (!this.tutorialVideo) {
      const { acf } = await this.$request('acf/v3/options/options')
      this.$store.dispatch('set_tutorial_video', acf.tutorial_video)
    }
    this.loaded = true
  },
  components: {
    Loading
  }
}
</script>

<style scoped lang="scss">
.video {
  width: 100%;
}
</style>
