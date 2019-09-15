<template>
  <router-link :to="`${typeSlug}/${data.slug}`">
    <result-title :typeName="typeName" :title="data.title.rendered" />
  </router-link>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepLeft } from 'ramda'
import base from './base'

export default mergeDeepLeft(base, {
  name: 'timelines-result'
})
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
