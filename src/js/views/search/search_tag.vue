<template>
  <a href="#" class="search-tag" @click.prevent="emitClick">{{ term }}</a>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'search-tag',
  props: {
    term: String,
    set: Function
  },
  methods: {
    emitClick(e) {
      // this.$emit('select', this.term)
      this.set(this.term)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/colors';

// .search-tag {
//   display: inline-block;
//   background: $color-links;
//   color: $color-text-light;
//   padding: 3px 5px;
//   border-radius: 3px;
// }
</style>
