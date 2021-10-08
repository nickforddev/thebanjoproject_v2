<template>
  <div v-if="data">
    <header>
      <h1>Narratives</h1>
    </header>
    <div class="subheader">
      <span v-html="data.title.rendered" />
    </div>
    <div class="musical-passage">
      <div class="intro padded" v-html="data.content.rendered" />
      <div class="book-container">
        <div class="book">
          <img :src="currentBookImage" usemap="#image-map">
          <map name="image-map">
            <area @click.prevent="modals.festivals = true" target="" alt="" title="" href="" coords="505,143,631,179" shape="rect">
            <area @click.prevent="modals.musicians = true" target="" alt="" title="" href="" coords="633,182,716,217" shape="rect">
            <area @click.prevent="modals.musicians = true" target="" alt="" title="" href="" coords="202,220,278,256" shape="rect">
            <area @click.prevent="modals.baptiste = true" target="" alt="" title="" href="" coords="285,255,472,295" shape="rect">
            <area @click.prevent="modals.music = true" target="" alt="" title="" href="" coords="429,323,558,359" shape="rect">
            <area @click.prevent="modals.clap = true" target="" alt="" title="" href="" coords="381,416,561,456" shape="rect">
            <area
              @mouseenter="swapImage(1)"
              @mouseleave="swapImage(null)"
              @click.prevent="modals.angola = true"
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
              @click.prevent="modals.papa = true"
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
              @click.prevent="modals.koromanti1 = true"
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
              @click.prevent="modals.koromanti2 = true"
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
              @click.prevent="modals.koromanti3 = true"
              target=""
              alt="Koromanti 3"
              title="Koromanti 3"
              href=""
              coords="904,555,1433,955"
              shape="rect"
            >
          </map>
          <mp-modal
            side="right"
            v-if="modals.festivals"
            @close="modals.festivals = false"
          >
            <div slot="title" v-html="data.acf.festivals_modal_title" />
            <div slot="body" v-html="data.acf.festivals_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.musicians"
            @close="modals.musicians = false"
          >
            <div slot="title" v-html="data.acf.musicians_modal_title" />
            <div slot="body" v-html="data.acf.musicians_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.baptiste"
            @close="modals.baptiste = false"
          >
            <div slot="title" v-html="data.acf.baptiste_modal_title" />
            <div slot="body" v-html="data.acf.baptiste_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.music"
            @close="modals.music = false"
          >
            <div slot="title" v-html="data.acf.music_modal_title" />
            <div slot="body" v-html="data.acf.music_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.clap"
            @close="modals.clap = false"
          >
            <div slot="title" v-html="data.acf.clap_modal_title" />
            <div slot="body" v-html="data.acf.clap_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.angola"
            @close="modals.angola = false"
            :audio="data.acf.angola_modal_audio"
          >
            <div slot="title" v-html="data.acf.angola_modal_title" />
            <div slot="body" v-html="data.acf.angola_modal_content" />
          </mp-modal>
          <mp-modal
            side="right"
            v-if="modals.papa"
            @close="modals.papa = false"
            :audio="data.acf.papa_modal_audio"
          >
            <div slot="title" v-html="data.acf.papa_modal_title" />
            <div slot="body" v-html="data.acf.papa_modal_content" />
          </mp-modal>
          <mp-modal
            side="left"
            v-if="modals.koromanti1"
            @close="modals.koromanti1 = false"
            :audio="data.acf.koromanti_modal_1_audio"
          >
            <div slot="title" v-html="data.acf.koromanti_modal_1_title" />
            <div slot="body" v-html="data.acf.koromanti_modal_1_content" />
          </mp-modal>
          <mp-modal
            side="left"
            v-if="modals.koromanti2"
            @close="modals.koromanti2 = false"
            :audio="data.acf.koromanti_modal_2_audio"
          >
            <div slot="title" v-html="data.acf.koromanti_modal_2_title" />
            <div slot="body" v-html="data.acf.koromanti_modal_2_content" />
          </mp-modal>
          <mp-modal
            side="left"
            v-if="modals.koromanti3"
            @close="modals.koromanti3 = false"
            :audio="data.acf.koromanti_modal_3_audio"
          >
            <div slot="title" v-html="data.acf.koromanti_modal_3_title" />
            <div slot="body" v-html="data.acf.koromanti_modal_3_content" />
          </mp-modal>
        </div>
      </div>
    </div>
    <div class="narrative-parts" v-if="parts && parts.length">
      {{ parts }}
    </div>
  </div>
</template>

<script>
import ImageMap from 'image-map'
import MpModal from './modal'
import { sleep } from '@/utils'

export default {
  name: 'musical-passage',
  components: { MpModal },
  data() {
    return {
      data: null,
      parts: null,
      currentImage: null,
      modals: {
        festivals: false,
        musicians: false,
        baptiste: false,
        music: false,
        clap: false,
        angola: false,
        papa: false,
        koromanti1: false,
        koromanti2: false,
        koromanti3: false
      }
    }
  },
  async mounted() {
    await this.fetch()
    await this.fetchParts()
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
    async fetchParts() {
      this.parts = (await this.$request(`wp/v2/narratives?parent=${this.data.id}&_embed&order=asc`))
    },
    swapImage(number) {
      this.currentImage = number
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.musical-passage {
  max-width: 1200px;
}
.padded {
  padding: 20px;
}
.book-container {
  background: darken($color-background-dark, 5%);
  padding: 20px;

  .book {
    position: relative;
    width: 100%;

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
