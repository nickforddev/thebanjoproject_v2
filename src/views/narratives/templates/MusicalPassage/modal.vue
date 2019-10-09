<template>
  <div class="modal-container" @click.self="$emit('close')">
    <div class="modal" :class="className">
      <div class="close-button" @click="$emit('close')">×</div>
      <div class="content">
        <div class="title">
          <slot name="title" />
        </div>
        <div v-if="audio" class="audio">
          <div class="audio-track" v-for="(audio, index) in audio" :key="index">
            <a href="#" @click.prevent="playAudio(audio.audio)">{{ audio.audio.title }}</a>
          </div>
        </div>
        <div class="body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sleep } from '@/utils'
export default {
  name: 'mp-modal',
  props: {
    audio: {
      type: Array,
      default: null
    },
    side: {
      type: String,
      default: null
    }
  },
  computed: {
    className() {
      return [this.side]
    }
  },
  methods: {
    playAudio(songData) {
      this.$store.dispatch('set_active_song', songData)
      this.$nextTick(async() => {
        await sleep(500)
        window.$player.$refs.player.play()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .modal {
    position: relative;
    width: 100%;
    max-height: calc(100% - 40px);
    margin: 20px;
    padding: 30px;
    background-color: #f4f3ef;
    color: #666;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;

    &.left, &.right {
      width: calc(50% - 40px);
    }

    &.right {
      right: 0;
    }

    .title {
      color: #a24438;
      font-size: 24px;
      margin: 10px 0;
    }

    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
      font-family: Times;
      font-weight: 800;
      font-size: 30px;
      color: #a24438;

      &:hover {
        cursor: pointer;
      }
    }

    .audio {
      margin: 16px 0;
      padding-top: 16px;
      border-top: 3px solid #a24438;

      .audio-track {
        margin-bottom: 8px;
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .modal-container {
    .modal {
      width: calc(100% - 40px) !important;
    }
  }
}
</style>
