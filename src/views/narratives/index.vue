
<template>
  <div>
    <header>
      <h1>Narratives</h1>
    </header>
    <div class="content">
      <div>
        <div v-if="fetched_page">
          <div v-html="data.content.rendered" />
        </div>
        <div v-if="fetched_collection">
          <div class="divider" />
          <h2>Guided Narratives</h2>
          <div class="narrative" v-for="(model, index) in collection" :key="index">
            <router-link class="thumbnail" :to="`/narratives/${model.slug}`">
              <img :src="model._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url" />
            </router-link>
            <div class="meta">
              <router-link :to="`/narratives/${model.slug}`">
                <h3 v-html="model.title.rendered" />
              </router-link>
              <div class="excerpt" v-html="model.excerpt.rendered" />
              <router-link class="button small" :to="`/narratives/${model.slug}`">Explore</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
// import Sidebar from '@/components/sidebar'
// import Dvd from '@/components/sidebar/dvd'

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
  // components: {
  //   Sidebar
  //   // Dvd
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/variables';

.narrative {
  display: flex;
  margin-bottom: 20px;

  .thumbnail {
    flex: 1 0 auto;
    flex-grow: 0;
    width: 280px;

    img {
      width: 100%;
    }
  }
  .meta {
    padding-left: 14px;

    .excerpt {
      font-size: 0.85em;
    }
  }
}
.divider {
  margin: 30px 0;
}

@media screen and (max-width: 560px) {
  .narrative {
    display: block;

    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }

    .thumbnail {
      width: 100%;
    }

    .meta {
      padding: 20px 0 20px 0;

      .excerpt {
        font-size: 1em;
      }
    }
  }
}
</style>
