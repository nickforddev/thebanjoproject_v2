<template>
  <div @click="playVideo">
    <result-title :typeName="typeName" :title="data.title.rendered" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepLeft } from 'ramda'
import base from './base'

export default mergeDeepLeft(base, {
  name: 'videos-result',
  methods: {
    playVideo() {
      this.$store.dispatch('set_active_video', this.data.slug)
    }
  }
})
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
