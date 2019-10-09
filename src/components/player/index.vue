<template>
  <div
    v-if="loaded"
    class="player"
    ref="player"
  >
    <div class="main">
      <playpause
        class="playpause"
        :playing="is_playing"
        @play="play"
        @pause="pause"
      />
      <div class="info" @click.self="seek">
        <div class="readout">
          <div class="time">{{ time }}</div>
          <div class="title">{{ data.title }}</div>
        </div>
        <div class="progress" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Howl } from 'howler'
import { sleep } from '@/utils'
import Playpause from '@/components/controls/playpause'

export default {
  name: 'player',
  components: {
    Playpause
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      time: null,
      sound: null,
      loaded: false,
      is_playing: false,
      progress: 0
    }
  },
  watch: {
    data() {
      this.stop()
      this.reset()
      this.load()
    }
  },
  async mounted() {
    this.load()
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    load() {
      this.sound = new Howl({
        src: this.data.url
      })
      this.sound.once('load', () => {
        this.loaded = true
      })
      this.sound.on('end', () => {
        this.is_playing = false
        this.progress = 0
      })
    },
    play() {
      this.sound.play()
      this.is_playing = true
      this.step()
    },
    pause() {
      this.sound.pause()
      this.is_playing = false
    },
    stop() {
      this.is_playing = false
      this.sound.stop()
    },
    reset() {
      this.progress = 0
      this.time = null
    },
    seek(event) {
      const { target } = event
      const rect = target.getBoundingClientRect()
      const { width } = rect
      const x = event.clientX - rect.left
      const duration = this.sound.duration()
      const newPos = duration * (x / width)
      this.sound.seek(newPos)
    },
    async step() {
      if (this.is_playing) {
        const sec = this.sound.seek()
        if (typeof sec === 'number') {
          const date = new Date(null)
          date.setSeconds(sec || 0)
          this.time = date.toISOString().substr(14, 5)
          this.progress = (sec / this.sound.duration()) * 100
        }
        await sleep(600)
        this.step()
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.player {
  display: flex;
  height: 50px;
  margin-bottom: 20px;
  background: darken($color-background-dark, 5%);
  overflow: hidden;

  .main {
    display: flex;
    position: relative;
    width: 100%;
    height: inherit;

    .info {
      position: relative;
      display: flex;
      flex-grow: 1;
      height: inherit;
      align-items: center;
      overflow: hidden;
    }

    .time {
      margin-bottom: 4px;
    }

    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.85em;
    }
  }

  .playpause {
    flex-shrink: 0;
    width: 50px;
    background: #fbb03b;
  }

  .readout {
    position: relative;
    z-index: 2;
    width: 100%;
    padding-left: 10px;
    pointer-events: none;
  }

  .progress {
    position: absolute;
    height: inherit;
    top: 0;
    z-index: 1;
    background: darken($color-background-dark, 40%);
    pointer-events: none;
  }
}
</style>
