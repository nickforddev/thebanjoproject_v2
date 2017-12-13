<template>
  <div>
    <h1>Maps</h1>
    <div v-if="fetched" class="grid">
      <div v-for="(region, index) in collection" :key="index" class="region grid__col grid__col--1-of-4" @click="goToMap(region)">
        <div class="thumbnail"></div>
        {{ region.name }}
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

export default {
  name: 'maps',
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/region',
      id_attribute: 'slug'
    })
  },
  async created() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    goToMap(region) {
      console.log(region)
      this.$router.push(`/maps/${region.slug}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.region {
  // height: 100px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }

  .thumbnail {
    height: 0;
    padding-top: 75%;
    background: grey;
  }
}
</style>