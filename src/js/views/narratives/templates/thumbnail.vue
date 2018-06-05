<template>
  <thumbnail v-if="fetched" :data="data" />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Thumbnail from '@/views/videos/thumbnail'

export default {
  name: 'video-thumnail',
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      fetched: false,
      data: null
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = await this.$request(`wp/v2/videos/${this.id}`)
      this.fetched = true
    }
    // goToVideo() {
    //   this.$store.dispatch('set_active_video', this.data.slug)
    //   // this.$router.push(`/videos/watch/${this.data.slug}`)
    // }
  },
  components: {
    Thumbnail
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
