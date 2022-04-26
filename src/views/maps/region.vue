<template>
  <router-link
    :to="`/maps/region/${region.slug}`"
    class="region-name"
    :class="[active && 'active']"
    @click="e => $emit('click', e)"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'region-link',
  props: {
    region: Object,
    currentRegions: Array
  },
  computed: {
    active() {
      return this.currentRegions.includes(this.region.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.region-name {
  display: inline-block;
  padding: 2px;
  border-radius: 3px;
  user-select: none;

  &:hover, &.active, &.router-link-exact-active {
    color: $color-background-dark;
    background: $color-highlight;
    text-decoration: none;
  }
}
</style>
