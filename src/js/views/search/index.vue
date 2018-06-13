<template>
  <div>
    <header>
      <h1>Search</h1>
    </header>
    <div class="content">
      <form @submit.prevent="validate">
        <field name="search" :errors="errors">
          <input type="search" v-model="search_term" v-validate.disable="'required'" name="search">
        </field>
        <button>Search</button>
      </form>
      <div class="results" v-if="results">
        <div v-if="results.length">
          <h2>
            Results
            {{ results && `(${results.length})` }}
          </h2>
          <!-- <pre>{{ results }}</pre> -->

          <result
            v-for="(result, index) in results"
            :key="index"
            :data="result" />
        </div>
        <div v-else>
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { convertPermalinks } from '@/utils'
import Result from './result'

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
      // const response = await this.$request(`wp/v2/search/${term}`)
      const response = await this.$request(`swp_api/search?s=${term}&posts_per_page=99&_embed`)
      this.results = response.sort((a, b) => {
        return a.type < b.type ? -1 : 1
      })
    }
  },
  components: {
    Result
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/colors';

.results {
  margin-top: 30px;
}
</style>
