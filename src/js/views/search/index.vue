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
      <div class="result" v-for="(result, index) in results" :key="index">
        {{ result.type }}: {{ result.title.rendered }}
      </div>
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
.page {
  padding: 20px;
}
.results {
  margin-top: 30px;

  .result {
    margin-bottom: 10px;
  }
}
</style>
