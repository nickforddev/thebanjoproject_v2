<template>
  <div class="field-group">
    <legend>{{ name }}</legend>
    <slot></slot>
    <validation v-if="errors" :name="name" :errors="errors" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'field',
  props: {
    name: String,
    errors: Object
  },
  beforeCreate() {
    // HACK: vee-validate creates an instance of itself on all nested components
    // so this.errors is conflicting between the prop and the computed property
    delete this.$options.computed.errors
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.field-group {
  position: relative;
  margin-bottom: 10px;
}
legend {
  text-transform: capitalize;
  margin-bottom: 8px;
}
</style>
