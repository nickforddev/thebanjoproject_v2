<template>
  <div>
    <div class="type">
      {{ typeName }}
    </div>
    <div class="title" v-html="title" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'result-title',
  props: {
    typeName: String,
    title: String
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
