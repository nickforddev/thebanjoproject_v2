<template>
  <button class="plain seek" @click.prevent="emit">
    <svg
      :class="[
        disabled && 'disabled',
        $attrs.reverse && 'reverse'
      ]"
      viewBox="0 0 100 125"
    >
      <path data-name="Compound Path"
        d="M50,10.5A39.5,39.5,0,1,0,89.5,50,39.5,39.5,0,0,0,50,10.5Zm13,57H57.9V54.3L37,73.3V26.7l20.9,19V32.5H63Z" />
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

path {
  fill: $color-text-dark;
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
