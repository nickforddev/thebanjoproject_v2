<template>
  <svg viewBox="0 0 30 30" class="icon-full-screen" v-on="$listeners">
    <polygon class="st0" points="22.2,14 22.2,7.8 16,7.8 "/>
    <rect x="16.5" y="9.5" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 21.531 33.508)" class="st0" width="2.4" height="5.6"/>
    <polygon class="st0" points="7.8,16 7.8,22.2 14,22.2 "/>
    <rect x="11.1" y="14.9" transform="matrix(0.7071 0.7071 -0.7071 0.7071 16.1205 -3.508)" class="st0" width="2.4" height="5.6"/>
  </svg>

</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'icon-fullscreen'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
svg {
  fill: currentColor;
}
</style>
