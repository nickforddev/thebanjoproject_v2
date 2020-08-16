import { sleep } from '@/utils'

export default {
  methods: {
    playAudio({ song, playlist }) {
      this.$nextTick(async() => {
        this.$store.dispatch('play_song', { song, playlist })
        await sleep(500)
        window.$player.$refs.player.play()
      })
    }
  }
}
