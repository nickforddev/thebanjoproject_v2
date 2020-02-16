<template>
  <div class="global-audio-player" v-if="loaded">
    <player ref="player" :data="active_song" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Player from './new_player'

export default {
  name: 'global-audio-player',
  components: { Player },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters({
      active_song: 'audio:active_song',
      is_playing: 'audio:playing'
    })
  },
  async mounted() {
    const { acf } = await this.$request('acf/v3/options/options')
    this.$store.dispatch('set_active_song', acf.default_audio_track)
    this.loaded = true
    window.$player = this
  }
}
</script>

<style scoped lang="scss">
@import '~%/variables';

.global-audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: $player-height;
  z-index: 100;
}
</style>
