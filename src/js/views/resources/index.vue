<template>
  <div v-if="fetched">
    <header>
      <h1>Resources</h1>
    </header>
    <div class="content">
      <!-- <pre>{{ data }}</pre> -->
      <div class="bibliography" v-html="data.content.rendered" />
    </div>
  </div>
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'resources',
  data() {
    return {
      fetched: false,
      data: null
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request('wp/v2/pages?slug=resources&_embed'))[0]
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.bibliography {
  p {
    padding-left: 1.5em;
    text-indent: -1.5em;
  }
}
</style>

<style scoped lang="scss">
.content {
  margin: 20px;
  // width: 50%;
}
</style>
