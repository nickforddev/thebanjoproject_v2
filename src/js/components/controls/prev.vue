<template>
  <div class="controls-prev" @click="emitClick">
    <div class="arrow" />
    <div class="background" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'control-prev',
  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/colors';

// .controls-prev {
//   overflow: hidden;
//   background-color: $color-controls-background;

//   &:hover {
//     cursor: pointer;
//   }
// }
</style>