<template>
  <div v-if="fetched">
    <header>
      <h1>About</h1>
    </header>
    <pre>{{ data }}</pre>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'about',
  data() {
    return {
      fetched: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request('wp/v2/pages?slug=about'))[0]
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
