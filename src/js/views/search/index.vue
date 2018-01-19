<template>
  <div>
    <h1>Search</h1>
    <form @submit.prevent="validate">
      <input type="search" v-model="search_term" v-validate.disable="'required'">
      <button>Search</button>
      {{ errors }}
    </form>
    <div class="results" v-if="results">
      <pre>{{ results }}</pre>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'search',
  data() {
    return {
      search_term: null,
      results: null
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
      const response = await this.$request(`wp/v2/search/${term}`)
      this.results = response
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
