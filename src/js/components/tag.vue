<template>
  <div class="tag">
    {{ $tag.name }}
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Tag from '@/models/tag'
export default {
  name: 'tag',
  props: ['uid'],
  models: {
    tag() {
      return new Tag({
        id: this.uid
      }, {
        basePath: 'wp/v2/tags'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$tag.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>