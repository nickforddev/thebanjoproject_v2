<template>
  <svg @click="toggle" class="playpause" viewBox="0 0 34.142 34.199">
    <path d="M17.081,0.039c-9.423,0-17.06,7.638-17.06,17.06c0,9.423,7.638,17.06,17.06,17.06c9.422,0,17.06-7.638,17.06-17.06C34.142,7.677,26.504,0.039,17.081,0.039z"/>
    <polygon v-if="!playing" class="play" points="13.788,23.164 13.789,11.035 23.81,17.1 "/>
    <g v-if="playing" class="pause">
      <rect x="11.88" y="9.142" width="3.557" height="15.916"/>
      <rect x="18.726" y="9.142" width="3.557" height="15.916"/>
    </g>
  </svg>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'playpause',
  props: {
    playing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle(e) {
      const method = this.playing
        ? 'pause'
        : 'play'
      this[method](e)
    },
    play(e) {
      this.$emit('play', e)
    },
    pause(e) {
      this.$emit('pause', e)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

svg {
  display: inline-block;
  // width: 20px;
  width: 18px;
  margin-bottom: -2px;

  &:hover {
    cursor: pointer;
  }
}
path {
  fill: $color-highlight;
}
polygon, rect {
  fill: $color-text-dark;
}
</style>
