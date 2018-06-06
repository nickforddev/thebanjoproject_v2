<template>
  <div class="sidebar">
    <slot />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'sidebar'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/variables';

.sidebar {
  display: inline-block;
  width: $sidebar-width;
  vertical-align: top;

  h3 {
    font-family: 'League Gothic', sans-serif;
    font-size: 1.4em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  img {
    width: 100%;
  }

  .group {
    margin-bottom: 30px;
  }
}
</style>
