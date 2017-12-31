<template>
  <div>
    <div v-for="({ image }, index) in data" :key="index">
      <img :src="image.url" :alt="image.title">
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'slideshow-images',
  props: {
    data: Array
  },
  created() {
    console.log(this.data)
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  img {
    width: 100%;
  }
</style>