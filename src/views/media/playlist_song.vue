<template>
  <li :class="[isActiveSong && 'active']">
    <span class="number">{{ index + 1 }}</span>
    <a
      href="#"
      @click.prevent="playAudio({ song, playlist })"
    >
      {{ song.title }}
    </a>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'song',
  props: {
    song: Object,
    index: Number,
    playlist: Object,
    isActivePlaylist: Boolean
  },
  computed: {
    isActiveSong() {
      return this.isActivePlaylist && this.activeSongIndex === this.index
    },
    ...mapGetters({
      activeSongIndex: 'audio:active_song_index'
    })
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

li {
  display: flex;

  :last-child {
    margin-bottom: 0;
  }
}
.number {
  display: inline-block;
  width: 20px;
  flex-shrink: 0;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: #ababab;
}
.active {
  .number {
    color: #666;
  }
  a {
    flex-shrink: 1;
    color: darken($color-links, 20%);
  }
}
</style>
