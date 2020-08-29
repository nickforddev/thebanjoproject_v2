<template>
  <div class="playlist">
    <div class="play">
      <playpause
        :playing="isPlaying && isActivePlaylist"
        @click="togglePlaylist"
      />
    </div>
    <div class="main">
      <h2 v-html="playlist.title.rendered" />
      <ul v-if="playlist.acf.songs">
        <playlist-song
          v-for="({ song }, index) in playlist.acf.songs"
          :key="index"
          :index="index"
          :song="song"
          :playlist="playlist"
          :is-active-playlist="isActivePlaylist"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Playpause from '@/components/controls/playpause'
import PlaylistSong from './playlist_song'

export default {
  name: 'playlist',
  props: {
    playlist: Object
  },
  computed: {
    isActivePlaylist() {
      return this.activePlaylist && this.activePlaylist.id === this.playlist.id
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
    Playpause,
    PlaylistSong
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

  &:not(:last-child) {
    margin-bottom: 20px;
  }

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
  }
}
</style>
