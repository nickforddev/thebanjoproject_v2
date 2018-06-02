<template>
  <div class="intro" v-if="fetched && active_video">
    <player
      class="intro-video"
      :data="active_video"
      :videos="data.acf.videos"
      @ended="onEnd"
      @next="onSelect" />
    <footer>
      <div
        @click="test"
        class="meta"
        :class="{ emphasize: ended }">
        {{ active_video.title }} &rarr;
      </div>
      <div class="thumbnails">
        <div
          class="thumbnail"
          v-for="(video, index) in data.acf.videos"
          @click="setActiveVideo(video)"
          :key="index">
          <img :src="video.thumbnail.sizes.thumbnail" />
        </div>
      </div>
    </footer>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Player from './player'
import { getRandomFromArray } from '@/utils'

export default {
  name: 'intro',
  data() {
    return {
      fetched: false,
      data: null,
      active_video: null,
      ended: false
    }
  },
  async created() {
    await this.fetch()
    this.setRandomVideo()
  },
  watch: {
    active_video() {
      this.ended = false
    }
  },
  methods: {
    async fetch() {
      this.data = (await this.$request('wp/v2/pages?slug=intro&_embed'))[0]
      this.fetched = true
    },
    async setActiveVideo(video) {
      this.active_video = null
      await this.$nextTick()
      this.active_video = video
    },
    setRandomVideo() {
      this.active_video = getRandomFromArray(this.data.acf.videos)
    },
    test() {
      console.log(this.active_video)
    },
    onEnd() {
      this.ended = true
    },
    onSelect(index) {
      this.setActiveVideo(this.data.acf.videos[index])
    }
  },
  components: {
    Player
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.intro-video {
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>

<style scoped lang="scss">
@import '~%/colors';
@import '~%/variables';

.intro {
  position: fixed;
  top: $nav-horizontal-height;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  background: #000;
}

.intro-video {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(0deg, $color-background-dark 0, transparentize($color-background-dark, 1) 100%);

  .meta {
    margin-bottom: 20px;
    color: $color-text-light;
    transition: all 0.6s;

    &:hover {
      cursor: pointer;
    }

    &.emphasize {
      color: $color-highlight;
      font-size: 1.2em;
      transition: all 0.6s;
    }
  }
}

.thumbnails {
  display: flex;
  align-items: center;

  .thumbnail {
    width: 160px;

    &:hover {
      cursor: pointer;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }

    img {
      width: 100%;
    }
  }
}
</style>
