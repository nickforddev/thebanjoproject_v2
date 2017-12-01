<template>
  <div class="style">
    {{ $style.name }}
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Style from '@/models/tag'
export default {
  name: 'style',
  props: ['uid'],
  models: {
    style() {
      return new Style({
        id: this.uid
      }, {
        basePath: 'wp/v2/style'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$style.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>