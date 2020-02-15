<template>
  <svg viewBox="0 0 100 88.1">
    <g>
      <path d="M53.9,2.9L24.1,25.7L2.5,27.6v31.2l21.6,1.9l29.8,22.8V2.9z"/>
      <path v-if="value > 0" d="M72.3,17.1l-6.7,6.1c4.8,5.3,7.7,12.3,7.7,20s-2.9,14.8-7.7,20l6.7,6.1c6.3-6.9,10.1-16.1,10.1-26.1S78.6,24,72.3,17.1z"/>
      <path v-if="value > 60" d="M83.5,6.9L76.8,13c7.2,8,11.7,18.6,11.7,30.2c0,11.6-4.4,22.2-11.7,30.2l6.7,6.1c8.7-9.6,14-22.3,14-36.3S92.2,16.5,83.5,6.9L83.5,6.9z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'icon-volume',
  props: {
    value: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  fill: currentColor;
  width: 20px;
}
</style>
