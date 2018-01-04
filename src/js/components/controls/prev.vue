<template>
  <div class="controls-prev" @click="emitClick" :class="[is_disabled]">
    <div class="arrow" />
    <div class="background" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'control-prev',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is_disabled() {
      if (this.disabled) {
        return 'disabled'
      }
    }
  },
  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.disabled {
  opacity: 0.25;
  pointer-events: none;
}
// @import '~%/colors';

// .controls-prev {
//   overflow: hidden;
//   background-color: $color-controls-background;

//   &:hover {
//     cursor: pointer;
//   }
// }
</style>