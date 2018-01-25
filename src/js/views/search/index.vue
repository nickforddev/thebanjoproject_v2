<template>
  <div class="page">
    <h1>Search</h1>
    <form @submit.prevent="validate">
      <field name="search" :errors="errors">
        <input type="search" v-model="search_term" v-validate.disable="'required'" name="search">
      </field>
      <button>Search</button>
    </form>
    <div class="results" v-if="results">
      <h2>Results</h2>
      <!-- <pre>{{ results }}</pre> -->
      <router-link class="result" v-for="(result, index) in results" :to="`/${convertPermalinks(result.type)}/${result.slug}`" :key="index">
        <div class="type">
          {{ convertPermalinks(result.type) }}
        </div>
        <div class="title" v-html="result.title.rendered" />
        
      </router-link>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { convertPermalinks } from '@/utils'

export default {
  name: 'search',
  data() {
    return {
      search_term: null,
      results: null
    }
  },
  mounted() {
    const term = this.$route.params.term
    if (term) {
      this.search_term = term.split('+').join(' ')
      this.search()
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.search()
      }
    },
    async search() {
      const term = this.search_term.split(' ').join('+')
      this.$router.push(`/search/${term}`)
      const response = await this.$request(`wp/v2/search/${term}`)
      this.results = response
    },
    convertPermalinks(type) {
      return convertPermalinks(type)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.page {
  padding: 20px;
}
.results {
  margin-top: 30px;

  .result {
    display: block;
    margin-bottom: 10px;
  }

  .type {
    display: inline-block;
    background: grey;
    padding: 4px 6px;
    border-radius: 4px;
    color: $color-text-light;
  }

  .title {
    display: inline-block;
  }
}
</style>
