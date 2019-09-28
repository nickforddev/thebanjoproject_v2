<template>
  <div class="slideshow-models">
    <iframe
      :src="`${data.acf['3d_model']}/embed`"
      frameborder="0"
      allowvr
      allowfullscreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true">
    </iframe>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'slideshow-models',
  props: {
    data: Object
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.slideshow-models {
  height: inherit;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
