<template>
  <div v-if="fetched">
    <h1 v-html="data.title.rendered" />
    <!-- <pre>{{ data }}</pre> -->
    <img :src="data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" >
    <div v-html="data.content.rendered"></div>
    <div v-if="fetched_parts" v-for="(part, index) in parts" :key="index">
      <h2 v-html="part.title.rendered" />
      <div v-html="part.content.rendered"/>
      <pre>{{ part }}</pre>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'three-banjo-songsters',
  data() {
    return {
      fetched: false,
      fetched_parts: false,
      data: null,
      parts: null
    }
  },
  async mounted() {
    await this.fetch()
    this.fetchParts()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.data = (await this.$request('wp/v2/narratives?slug=three-banjo-songsters&_embed'))[0]
      this.fetched = true
    },
    async fetchParts() {
      this.fetched_parts = false
      this.parts = (await this.$request(`wp/v2/narratives?parent=${this.data.id}&_embed`))
      this.fetched_parts = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
