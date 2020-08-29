<template>
  <div
    v-if="loaded"
    class="player"
    ref="player"
  >
    <div class="main">
      <div class="controls">
        <seek
          :disabled="!has_previous"
          @click="prevTrack"
          reverse
        />
        <playpause
          class="playpause"
          :playing="is_playing"
          @play="play"
          @pause="pause"
        />
        <seek
          :disabled="!has_next"
          @click="nextTrack"
        />
      </div>
      <div class="progress-container">
        <div class="time">{{ time || '0:00' }}</div>
        <div class="progress-bar" @click.self="seek">
          <div class="progress" :style="{ width: `${progress}%` }" />
        </div>
        <div class="duration">{{ duration }}</div>
      </div>
      <div class="volume">
        <volume v-model="volume" @input="onVolumeChange" />
      </div>
      <div class="info">
        <div class="info-inner">
          <div v-if="playlist" v-html="playlist.title.rendered" class="title" />
          <div class="title">{{ data.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Howl, Howler } from 'howler'
import { sleep, getTimeFromSeconds } from '@/utils'
import Playpause from '@/components/controls/playpause'
import Seek from '@/components/controls/seek'
import Volume from './volume'

export default {
  name: 'player',
  components: {
    Playpause,
    Seek,
    Volume
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
      progress: 0,
      duration: 0,
      volume: 100
    }
  },
  computed: {
    has_previous() {
      return this.playlist && this.activeSongIndex > 0
    },
    has_next() {
      return this.playlist && this.activeSongIndex < this.playlist.acf.songs.length - 1
    },
    ...mapGetters({
      playlist: 'audio:active_playlist',
      activeSongIndex: 'audio:active_song_index'
    })
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
        this.duration = getTimeFromSeconds(this.sound.duration())
      })
      this.sound.on('end', () => {
        this.is_playing = false
        this.progress = 0
        if (this.has_next) {
          this.nextTrack()
        } else {
          this.$store.dispatch('pause_audio')
        }
      })
    },
    play() {
      this.sound.play()
      this.is_playing = true
      this.step()
      this.$store.dispatch('play_audio')
    },
    pause() {
      this.sound.pause()
      this.is_playing = false
      this.$store.dispatch('pause_audio')
    },
    stop() {
      this.is_playing = false
      this.sound.stop()
      this.$store.dispatch('pause_audio')
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
          this.time = getTimeFromSeconds(sec)
          this.progress = (sec / this.sound.duration()) * 100
        }
        await sleep(600)
        this.step()
      }
    },
    onVolumeChange(value) {
      Howler.volume(value / 100)
    },
    prevTrack() {
      if (this.has_previous) {
        const { playlist } = this
        const { song } = this.playlist.acf.songs[this.activeSongIndex - 1]
        this.playAudio({ song, playlist })
      }
    },
    nextTrack() {
      if (this.has_next) {
        const { playlist } = this
        const { song } = this.playlist.acf.songs[this.activeSongIndex + 1]
        this.playAudio({ song, playlist })
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/variables';

$progress-bar-height: 10px;
$progress-bar-border-radius: 100px;

.player {
  display: flex;
  height: $player-height;
  padding: 0 30px;
  background: darken($color-background-dark, 8%);

  .main {
    display: flex;
    position: relative;
    width: 100%;
    height: inherit;
    align-items: center;
    z-index: 3;

    & > div:not(:last-child) {
      padding-right: 30px;
    }

    .info {
      position: relative;
      display: flex;
      flex-grow: 1;
      height: inherit;
      align-items: center;
      min-width: 26vw;

      .info-inner {
        overflow: hidden;
      }
    }

    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.75em;
      color: $color-text-light;
    }
  }

  .controls {
    display: flex;

    button:not(:last-child) {
      margin-right: 4px;
    }
  }

  .playpause {
    flex-shrink: 0;
    width: 50px;
    border-radius: 100%;
    overflow: hidden;

    ::v-deep {
      path.background {
        fill: $color-background-dark;
      }
      .play, .pause rect {
        fill: $color-highlight;
      }
    }
  }

  .seek {
    width: 40px;
  }

  .readout {
    position: relative;
    z-index: 2;
    width: 100%;
    padding-left: 10px;
    pointer-events: none;
  }

  .progress-container {
    display: flex;
    width: 100%;

    .time, .duration {
      width: 80px;
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.9em;
      color: $color-text-light;
    }
  }

  .progress-bar {
    height: $progress-bar-height;
    width: 100%;
    margin-top: 3px;
    background: $color-background-dark;
    border-radius: $progress-bar-border-radius;
    overflow: hidden;

    &:hover {
      cursor: pointer;
    }

    .progress {
      height: inherit;
      background: $color-highlight;
      pointer-events: none;
      border-radius: $progress-bar-border-radius
    }
  }
}
</style>
