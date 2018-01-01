<template>
  <div class="slideshow-images">
    <div
      :class="['slide', isActive(index)]"
      v-for="({ image }, index) in images"
      :key="index">
      <img :src="image.url" :alt="image.title">
    </div>
    <div class="controls" v-if="images.length > 1">
      <next @click="next" />
      <prev @click="prev" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Next from '@/components/controls/next'
import Prev from '@/components/controls/prev'

export default {
  name: 'slideshow-images',
  props: {
    data: Object
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {
    images() {
      return this.data.acf.images.length
        ? this.data.acf.images
        : [{
          image: {
            url: this.data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
            title: this.data._embedded['wp:featuredmedia'][0].title.rendered
          }
        }]
    }
  },
  methods: {
    next() {
      if (this.active < this.images.length - 1) {
        this.active++
      }
    },
    prev() {
      if (this.active) {
        this.active--
      }
    },
    isActive(index) {
      if (index === this.active) {
        return 'active'
      }
    }
  },
  components: {
    Next,
    Prev
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.slideshow-images {
  position: relative;
  height: 100%;
  max-height: inherit;
}
.slide {
  height: 100%;
  max-height: inherit;
  display: none;

  &.active {
    display: flex;
  }
}
// .image {
//   height: 100%;
//   background-size: cover;
//   background-position: center center;
// }
img {
  max-width: 100%;
  // max-height: 100%;
  max-height: inherit;
  margin: auto;
}
</style>