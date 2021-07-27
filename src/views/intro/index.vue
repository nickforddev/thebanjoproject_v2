<template>
  <div class="intro" v-if="fetched && active_video">
    <div class="video-container">
      <player
        class="intro-video"
        :data="active_video"
        :videos="data.acf.videos"
        @ended="onEnd"
        @next="onSelect" />
      <div
        @click="goToLink"
        class="meta"
        :class="{ emphasize: ended }">
        <div class="video-title">
          {{ active_video.title }}
        </div>
        <div class="video-link" v-if="active_video.link || active_video.link_custom">
          {{ active_video.link_title }} &rarr;
        </div>
      </div>
    </div>
    <footer>
      <div class="thumbnails">
        <div
          class="thumbnail"
          :class="{ active: video === active_video}"
          v-for="(video, index) in data.acf.videos"
          @click="setActiveVideo(video)"
          :key="index">
          <svg class="play" viewBox="0 0 34.142 34.199">
            <path d="M17.081,0.039c-9.423,0-17.06,7.638-17.06,17.06c0,9.423,7.638,17.06,17.06,17.06c9.422,0,17.06-7.638,17.06-17.06C34.142,7.677,26.504,0.039,17.081,0.039z"/>
            <polygon points="13.788,23.164 13.789,11.035 23.81,17.1 "/>
          </svg>
          <img :src="video.thumbnail.sizes.thumbnail" />
          <div class="tooltip">
            {{ video.title }}
          </div>
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
    goToLink() {
      const url_string = this.active_video.link || this.active_video.link_custom
      if (url_string) {
        const url = new URL(url_string, window.location.origin)
        this.$router.push(url.pathname)
      }
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
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 0 !important;

  iframe {
    width: 100%;
    // height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

<style scoped lang="scss">
@import '~%/colors';
@import '~%/variables';

.intro {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: $nav-horizontal-height;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  background: #000;
}

.video-container {
  position: relative;
  flex-grow: 1;
  padding: 0;
  display: flex;
  width: 100%;
  align-items: center;

  .meta {
    position: absolute;
    bottom: 0;
    left: 20px;
  }
}

.meta {
  margin-bottom: 20px;
  color: $color-text-light;
  transition: all 0.6s;

  &:hover {
    cursor: pointer;

    .video-link {
      color: $color-highlight;
    }
  }

  &.emphasize {
    color: $color-highlight;
    font-size: 1.2em;
    transition: all 0.6s;
  }
}

footer {
  width: 100%;
  padding: 10px;
  background: linear-gradient(0deg, $color-background-dark 0, transparentize($color-background-dark, 1) 100%);
}

.video-link {
  margin-top: 10px;
}

.thumbnails {
  display: flex;
  align-items: center;
  margin: 0 -5px -5px;

  .thumbnail {
    position: relative;
    width: 160px;
    padding: 5px;

    &.active {
      img {
        border: 1px solid white;
      }
    }

    &:hover {
      cursor: pointer;
    }

    img {
      width: 100%;
      box-sizing: content-box;
    }

    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      transform: translate(-50%, -50%);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s;

      polygon {
        fill: white;
      }
    }

    .tooltip {
      opacity: 0;

      &:after {
        left: calc(50% - 5px);
      }
    }

    &:hover {
      .play {
        opacity: 1;
        transition: opacity 0.4s;
      }
      .tooltip {
        opacity: 1;
      }
    }

    &:first-child {
      .tooltip {
        left: 0;
        right: initial;
        transform: none;

        &:after {
          left: 10px;
          right: initial;
        }
      }
    }

    &:last-child {
      .tooltip {
        right: 0;
        left: initial;
        transform: none;

        &:after {
          right: 10px;
          left: initial;
        }
      }
    }
  }
}
</style>
