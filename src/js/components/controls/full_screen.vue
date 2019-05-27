<template>
  <icon-full-screen 
    class="controls-full-screen"
    @click="emitClick"
    :class="[is_disabled]" />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import IconFullScreen from '@/components/icons/full_screen'

export default {
  name: 'controls-fullscreen',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is_disabled() {
      if (this.disabled) {
        return 'disabled'
      }
    }
  },
  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  },
  components: {
    IconFullScreen
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.disabled {
  opacity: 0.25;
  pointer-events: none;
}
.controls-full-screen {
  width: 30px;
  color: $color-text-light;
  background: rgba(0,0,0, 0.3);
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
}
</style>
