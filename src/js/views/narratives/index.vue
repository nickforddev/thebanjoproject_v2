
<template>
  <div class="content">
    <h1>Narratives</h1>
    <div v-if="fetched_page">
      <div v-html="data.content.rendered" />
    </div>
    <div v-if="fetched_collection">
      <h2>Guided Narratives</h2>
      <div class="narrative" v-for="(model, index) in collection" :key="index">
        <router-link class="thumbnail" :to="`/narratives/${model.slug}`">
          <img :src="model._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url" />
        </router-link>
        <div class="meta">
          <h3 v-html="model.title.rendered" />
          <div v-html="model.excerpt.rendered"></div>
          <router-link :to="`/narratives/${model.slug}`">Explore</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
export default {
  name: 'narratives',
  data() {
    return {
      fetched_page: false,
      fetched_collection: false,
      data: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/narratives?parent=0&_embed&order=asc'
    })
  },
  async mounted() {
    await this.fetchPage()
    await this.fetchCollection()
  },
  methods: {
    async fetchPage() {
      this.fetched_page = false
      this.data = (await this.$request('wp/v2/pages?slug=narratives'))[0]
      this.fetched_page = true
    },
    async fetchCollection() {
      this.fetched_collection = false
      await this.$collection.fetch()
      this.fetched_collection = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  max-width: 1068px;
  margin: 20px;
}
.narrative {
  display: flex;
  margin-bottom: 20px;

  .thumbnail {
    // display: inline-block;
    flex: 1 0 auto;
    width: 280px;

    img {
      width: 100%;
    }
  }
  .meta {
    // flex: 1 0 auto;
    padding-left: 14px;
    // flex-grow: 1;
    // display: inline-block;
    // width: calc(100% - 285px);
  }
}
</style>
