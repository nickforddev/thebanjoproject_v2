<template>
  <div>
    <header>
      <h1>Search</h1>
    </header>
    <div class="content">
      <p>
        Is there a banjo-related story you want to explore?
      </p>
      <p>
        For example, search for a player (<search-tag :set="setTerm" term="Earl Scruggs" />,
        <search-tag :set="setTerm" term="Lotta Crabtree" />,
        <search-tag :set="setTerm" term="Danny Barker" />),
        a style (<search-tag :set="setTerm" term="bluegrass" />,
        <search-tag :set="setTerm" term="jazz" />,
        <search-tag :set="setTerm" term="classic" />),
        or a theme (<search-tag :set="setTerm" term="folk revival" />,
        <search-tag :set="setTerm" term="banjo as African diaspora instrument" />,
        <search-tag :set="setTerm" term="banjo and dance" />)
      </p>
      <form @submit.prevent="validate">
        <field name="search" :errors="errors">
          <input type="search" v-model="search_term" v-validate.disable="'required'" name="search">
        </field>
        <button>Search</button>
      </form>
      <loading v-if="loading" />
      <div v-else>
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
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Result from './result'
import SearchTag from './search_tag'

export default {
  name: 'search',
  data() {
    return {
      loading: false,
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
  computed: {
    term() {
      return this.search_term.split(' ').join('+')
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
      this.loading = true
      const term = this.term
      this.$router.push(`/search/${term}`)
      const response = await this.$request(`swp_api/search?s=${term}&posts_per_page=99&_embed`)
      this.results = response.sort((a, b) => {
        return a.type < b.type ? -1 : 1
      })
      this.loading = false
    },
    setTerm(term) {
      this.search_term = term
      this.search()
    }
  },
  components: {
    Result,
    SearchTag
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
