<template>
  <div v-if="data">
    <div v-html="data.name"></div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'map-topic',
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request(`wp/v2/topic/${this.id}`))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
