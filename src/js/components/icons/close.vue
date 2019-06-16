<template>
  <svg class="icon-close" viewBox="0 0 22 22" @click="$emit('click')">
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
      <g transform="translate(-154.000000, -285.000000)">
        <path
          d="M166,295 L166,286 L164,286 L164,295 L155,295 L155,297 L164,297 L164,306 L166,306 L166,297 L175,297 L175,295 L166,295 Z"
          transform="translate(165.000000, 296.000000) rotate(-45.000000) translate(-165.000000, -296.000000) " />
      </g>
    </g>
  </svg>

</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'icon-close'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
svg {
  width: 100%;
  fill: currentColor;
}
</style>
