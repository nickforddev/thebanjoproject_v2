<template>
  <div
    class="controls-prev"
    :class="[is_disabled]">
    <div class="arrow" />
    <div class="background"
      @click="emitEvent($event, 'click')"
      @mouseover="emitEvent($event, 'mouseover')"
      @mouseout="emitEvent($event, 'mouseout')"/>
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
      return this.disabled && 'disabled'
    }
  },
  methods: {
    emitEvent(e, type) {
      this.$emit(type, e)
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
.arrow {
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
