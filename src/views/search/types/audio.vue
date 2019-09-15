<template>
  <div>
    <result-title
      :typeName="typeName"
      :title="data.title.rendered"
      :show-title="false" />
    <audio-link :uid="data.id" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepLeft } from 'ramda'
import base from './base'
import AudioLink from '@/components/audio'

export default mergeDeepLeft(base, {
  name: 'audio-result',
  created() {
    console.log(this.data)
  },
  components: {
    AudioLink
  }
})
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
