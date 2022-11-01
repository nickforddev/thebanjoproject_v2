<template>
  <div class="container" v-if="visible">
    <div class="tutorial" :class="[visible && 'visible']">
      <div class="center">
        <p class="message" :class="[playing && 'hidden']">
          It looks it's your first time visiting the Banjo Project, would you like a quick tour?
        </p>
        <div class="video-container" :class="[playing && 'playing']">
          <button class="skip warning" @click="dismiss">Skip</button>
          <video
            class="video"
            ref="video"
            :src="tutorialVideo.url"
            @play="playing = true"
            @pause="playing = false"
            @ended="dismiss"
            controls
          />
        </div>
      </div>
      <div class="backdrop" :class="[playing && 'visible']" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'tutorial',
  data() {
    return {
      visible: false,
      videoUrl: null,
      playing: false
    }
  },
  computed: {
    ...mapGetters({
      tutorialVideo: 'video:tutorial_video'
    })
  },
  async mounted() {
    const { acf } = await this.$request('acf/v3/options/options')
    this.$store.dispatch('set_tutorial_video', acf.tutorial_video)
    if (!JSON.parse(localStorage.getItem('tutorial_viewed'))) {
      await sleep(1)
      await this.showTutorial()
    }
  },
  methods: {
    async showTutorial() {
      this.visible = true
      localStorage.setItem('tutorial_viewed', true)
    },
    playVideo() {
      this.$refs.video.play()
    },
    dismiss() {
      this.$refs.video.pause()
      this.visible = false
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.tutorial {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $color-background-dark;
  color: $color-text-light;
  text-align: center;
  z-index: 99999999999;
  opacity: 0;
  transition: opacity 1s;

  &.visible {
    opacity: 1;
  }

  .message {
    margin-bottom: 20px;
    opacity: 1;
    transition: opacity 1s;

    &.hidden {
      opacity: 0;
      transition: opacity 1s;
    }
  }

  .video {
    width: 80vw;
  }
}
.center {
  position: absolute;
  width: 80%;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}

.backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000;
  opacity: 0;
  transition: opacity 0.8s;

  &.visible {
    opacity: 1;
    transition: opacity 0.8s;
  }
}

.video-container {
  position: relative;

  .skip {
    position: absolute;
    // bottom: 54px;
    bottom: 72px;
    right: 12px;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.8s;
    z-index: 10;
  }

  &.playing {
    .skip {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.8s;
    }
  }

  &:hover {
    .skip {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.8s;
    }
  }
}
</style>
