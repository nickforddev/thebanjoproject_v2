<template>
  <div class="controls-next" @click="emitClick">
    <div class="arrow" />
    <div class="background" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'control-next',
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

// .controls-next {
//   overflow: hidden;
//   background-color: $color-controls-background;

//   &:hover {
//     cursor: pointer;
//   }
// }
</style>