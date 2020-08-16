<template>
  <div class="playlist">
    <div class="play">
      <playpause
        :playing="isPlaying && isActivePlaylist"
        @click="togglePlaylist"
      />
    </div>
    <div class="main">
      <h2 v-html="playlist.title.rendered"></h2>
      <ul v-if="playlist.acf.songs">
        <li v-for="({ song }, index) in playlist.acf.songs" :key="index">
          <span class="number">{{ index + 1 }}</span>
          <a
            href="#"
            @click.prevent="playAudio({ song, playlist })"
          >
            {{ song.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Playpause from '@/components/controls/playpause'

export default {
  name: 'playlist',
  props: {
    playlist: Object
  },
  computed: {
    isActivePlaylist() {
      return this.activePlaylist && this.activePlaylist.ID === this.playlist.ID
    },
    ...mapGetters({
      activePlaylist: 'audio:active_playlist',
      isPlaying: 'audio:playing'
    })
  },
  methods: {
    togglePlaylist() {
      if (this.isActivePlaylist) {
        if (this.isPlaying) {
          window.$player.$refs.player.pause()
        } else {
          window.$player.$refs.player.play()
        }
      } else {
        const { song } = this.playlist.acf.songs[0]
        const { playlist } = this
        this.playAudio({ song, playlist })
      }
    }
  },
  components: {
    Playpause
  }
}
</script>

<style scoped lang="scss">
.playlist {
  display: flex;
  padding: 14px;
  background: #dedcdc;
  border: 1px solid #cdcdcd;
  border-radius: 6px;

  .play {
    width: 80px;

    button {
      width: 100%;
    }
  }

  .main {
    margin-left: 16px;
  }

  ul {
    margin-bottom: 0;

    li:last-child {
      margin-bottom: 0;
    }
  }

  .number {
    display: inline-block;
    width: 20px;
    font-family:'Courier New', Courier, monospace;
    font-weight: bold;
    color: #ababab;
  }
}
</style>
