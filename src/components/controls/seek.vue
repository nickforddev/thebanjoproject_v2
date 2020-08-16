<template>
  <button class="plain seek" @click.prevent="emit">
    <svg
      viewBox="0 0 83.373 82.196"
      :class="[
        disabled && 'disabled',
        $attrs.reverse && 'reverse'
      ]"
    >
      <circle cx="41.982" cy="40.915" r="40.829"/>
      <path data-name="Compound Path" d="M 54.596 58.869 L 49.496 58.869 L 49.496 45.669 L 28.596 64.669 L 28.596 18.069 L 49.496 37.069 L 49.496 23.869 L 54.596 23.869 L 54.596 58.869 Z" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'control-seek',
  props: {
    disabled: Boolean
  },
  methods: {
    emit(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.seek {
  &:hover {
    cursor: pointer;
  }
}

circle {
  fill: $color-background-dark;
}

path {
  fill: $color-highlight;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;

  &:hover {
    cursor: normal;
  }
}
[reverse] {
  transform: scale(-1, -1);
}
</style>
