<template>
  <div class="result-title">
    <div class="type">
      {{ typeName }}
    </div>
    <div class="title" v-if="showTitle" v-html="title" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'result-title',
  props: {
    typeName: String,
    title: String,
    showTitle: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.result-title {
  // margin-bottom: 10px;
  color: $color-links;
}
</style>
