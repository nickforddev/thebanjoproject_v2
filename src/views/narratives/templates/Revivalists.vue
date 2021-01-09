<template>
  <div v-if="fetched">
    <header :style="{background: `url(${data.acf.banner.url})`}">
      <h1 v-html="data.title.rendered" />
    </header>
    <div class="content">
      <div v-html="data.content.rendered"></div>
      <div class="divider" />
      <div v-if="fetched_parts">
        <div v-for="(part, index) in parts" :key="index">
          <h2 v-html="part.title.rendered" />
          <div v-html="part.content.rendered"/>

          <div v-if="part.acf.audio && part.acf.audio.length" class="audio">
            <h3>Audio</h3>
            <div v-for="({ song: audio }, index) in part.acf.audio" :key="index" class="audio-track">
              <a href="#" @click.prevent="playAudio({ song: audio })">{{ audio.title }}</a>
            </div>
          </div>

          <div v-if="part.acf.videos && part.acf.videos.length">
            <h3>Videos</h3>
            <div class="videos grid">
              <video-thumbnail
                v-for="({video}, index) in part.acf.videos"
                :key="index"
                :id="video.ID" />
            </div>
          </div>

          <div class="divider" v-if="index < parts.length - 1" />
          <!-- <pre>{{ part }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoThumbnail from './thumbnail'

export default {
  name: 'three-banjo-songsters',
  data() {
    return {
      fetched: false,
      fetched_parts: false,
      data: null,
      parts: null
    }
  },
  async mounted() {
    await this.fetch()
    this.fetchParts()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.data = (await this.$request('wp/v2/narratives?slug=revivalists-rediscovery-reclamation-reinvention&_embed'))[0]
      this.fetched = true
    },
    async fetchParts() {
      this.fetched_parts = false
      this.parts = (await this.$request(`wp/v2/narratives?parent=${this.data.id}&_embed&order=asc`))
      this.fetched_parts = true
    }
  },
  components: {
    VideoThumbnail
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

header {
  height: 180px;
  text-shadow: 0px 2px 3px rgba(0,0,0, 0.4);
}

img {
  width: 100%;
}

.audio {
  margin-bottom: 20px;
}
</style>
