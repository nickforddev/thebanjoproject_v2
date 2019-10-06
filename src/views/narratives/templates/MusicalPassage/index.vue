<template>
  <div v-if="data">
    <header>
      <h1>Narratives</h1>
    </header>
    <div class="subheader">
      <span v-html="data.title.rendered" />
    </div>
    <div class="intro padded" v-html="data.content.rendered" />
    <!-- <pre>{{data}}</pre> -->
    <div class="book-container">
      <div class="book">
        <img :src="currentBookImage" usemap="#image-map">
        <map name="image-map">
          <area @click.prevent target="" alt="" title="" href="" coords="505,143,631,179" shape="rect">
          <area @click.prevent target="" alt="" title="" href="" coords="633,182,716,217" shape="rect">
          <area @click.prevent target="" alt="" title="" href="" coords="202,220,278,256" shape="rect">
          <area @click.prevent target="" alt="" title="" href="" coords="285,255,472,295" shape="rect">
          <area @click.prevent target="" alt="" title="" href="" coords="429,323,558,359" shape="rect">
          <area @click.prevent target="" alt="" title="" href="" coords="381,416,561,456" shape="rect">
          <area
            @mouseenter="swapImage(1)"
            @mouseleave="swapImage(null)"
            @click.prevent
            target=""
            alt="Angola"
            title="Angola"
            href="#"
            coords="187,526,728,945"
            shape="rect"
          >
          <area
            @mouseenter="swapImage(2)"
            @mouseleave="swapImage(null)"
            @click.prevent
            target=""
            alt="Papa"
            title="Papa"
            href=""
            coords="187,950,728,1070"
            shape="rect"
          >
          <area
            @mouseenter="swapImage(3)"
            @mouseleave="swapImage(null)"
            @click.prevent
            target=""
            alt="Koromanti 1"
            title="Koromanti 1"
            href=""
            coords="907,116,1433,119,1433,306,1249,306,1249,385,907,382"
            shape="poly"
          >
          <area
            @mouseenter="swapImage(4)"
            @mouseleave="swapImage(null)"
            @click.prevent
            target=""
            alt="Koromanti 2"
            title="Koromanti 2"
            href=""
            coords="907,385,1250,388,1251,306,1432,308,1434,551,908,552"
            shape="poly"
          >
          <area
            @mouseenter="swapImage(5)"
            @mouseleave="swapImage(null)"
            @click.prevent
            target=""
            alt="Koromanti 3"
            title="Koromanti 3"
            href=""
            coords="904,555,1433,955"
            shape="rect"
          >
        </map>
      </div>
    </div>
  </div>
</template>

<script>
import ImageMap from 'image-map'
import { sleep } from '@/utils'

export default {
  name: 'musical-passage',
  data() {
    return {
      data: null,
      currentImage: null
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    currentBookImage() {
      const filename = this.currentImage
        ? `blur${this.currentImage}`
        : 'normal'
      return `/static/musical-passage/${filename}.jpg`
    }
  },
  methods: {
    async fetch() {
      this.data = (await this.$request('wp/v2/narratives?slug=musical-passage&_embed'))[0]
      await this.$nextTick()
      ImageMap('img[usemap]', 0)
      await sleep(800)
      window.dispatchEvent(new Event('resize'))
    },
    swapImage(number) {
      this.currentImage = number
    },
    test() {
      console.log('test')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.padded {
  padding: 20px;
}
.book-container {
  background: darken($color-background-dark, 5%);
  padding: 20px;

  .book {
    width: 100%;

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
