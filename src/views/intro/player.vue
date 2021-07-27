<template>
  <vimeo-player
    v-if="data && !ended"
    ref="player"
    :video-id="video_id"
    :options="options"
    :autoplay="!fresh"
    @ready="onReady"
    @ended="onEnd" />
  <div
    v-else
    class="endcard"
    :style="`background-image: url(${data.thumbnail.url})`">
    <div class="overlay">
      <div class="center">
        <svg class="play" viewBox="0 0 100 100" @click="emitNext">
          <polygon points="39.6,31.2 68.5,49.8 39.6,68.4" />
          <circle cx="50" cy="50" r="45.5" transform="rotate(-90 50 50)" />
        </svg>
        <div class="meta">
          <div class="smallcaps">
            Next video
          </div>
          {{ this.next_video.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'
export default {
  name: 'intro-player',
  props: {
    data: {
      type: Object
    },
    videos: {
      type: Array
    },
    fresh: Boolean
  },
  data() {
    return {
      ready: false,
      ended: false,
      options: {
        portrait: false,
        title: false,
        byline: false
      }
    }
  },
  computed: {
    video_id() {
      return this.data && this.data.vimeo_url.split('/').pop()
    },
    current_index() {
      return this.videos.indexOf(this.data)
    },
    next_index() {
      const next = this.current_index + 1
      return next > this.videos.length - 1
        ? 0
        : next
    },
    next_video() {
      return this.videos[this.next_index]
    }
  },
  watch: {
    data() {
      this.ended = false
    }
  },
  methods: {
    onReady() {
      this.ready = true
      if (!this.fresh) this.$refs.player.play()
    },
    onEnd() {
      this.ended = true
      this.$emit('ended')
      this.startCountdown()
    },
    async startCountdown() {
      await sleep(5000)
      this.emitNext()
    },
    emitNext() {
      this.$emit('next', this.next_index)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.endcard {
  background-size: cover;
  background-repeat: no-repeat;
  color: $color-text-light;
}
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparentize($color-background-dark, 0.4);
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  text-align: center;

  .smallcaps {
    text-transform: uppercase;
    font-size: 0.9em;
    margin-bottom: 6px;
  }
}

.play {
  width: 100px;
  margin-bottom: 30px;
  transition: transform 0.6s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.6s;
  }

  polygon {
    fill:#FFFFFF;
  }
  circle {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 7;
    stroke-dasharray: 339.292;
    stroke-dashoffset: 339.292;
    animation: rotate 5s linear;
    animation-fill-mode: forwards;
    // transition: stroke-dashoffset 5s;

    // .complete {
    //   stroke-dashoffset: 0;
    // }

    @keyframes rotate {
      from {
        stroke-dashoffset: 339.292;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
  }
}
</style>
