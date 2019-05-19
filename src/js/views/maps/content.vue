<template>
  <div v-if="data">
    <h1 v-html="data.title.rendered" />

    <div class="body" v-html="data.acf.content" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'map-content',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    console.log('mount')
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request(`wp/v2/maps?slug=${this.$route.params.slug}`))[0]
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
