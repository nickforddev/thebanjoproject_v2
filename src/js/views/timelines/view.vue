<template>
  <div>
    <div class="content" v-if="fetched">
      <h2 v-html="event.title.rendered"></h2>
      <div class="body" v-html="event.content.rendered"></div>
    </div>
    <!-- <pre>{{ event }}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'timeline-view',
  data() {
    return {
      event: null,
      fetched: false
    }
  },
  async created() {
    this.fetch()
  },
  watch: {
    $route() {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.event = null
      const response = await this.$request(`wp/v2/timelines?slug=${this.$route.params.slug}`)
      this.event = response[0]
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>