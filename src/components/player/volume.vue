<template>
  <div
    class="volume-container"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button @click="toggle">
      <icon-volume class="icon-volume" :value="value" />
    </button>
    <div v-if="open" class="slider-container">
      <div class="slider">
        <slider
          :value="value"
          class="slider-input"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script>
import iconVolume from '@/components/icons/volume'
import slider from '@/components/controls/slider'

export default {
  name: 'volume-controls',
  data() {
    return {
      open: false
    }
  },
  props: {
    value: {
      type: Number
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    emit(value) {
      this.$emit('input', value)
    }
  },
  components: {
    iconVolume,
    slider
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

$height: 140px;

.volume-container {
  position: relative;

  button {
    padding: 8px;
    background: none;
    border-radius: 100px;
    box-shadow: none;

    &:focus {
      box-shadow: none;
    }
  }

  .icon-volume {
    fill: $color-highlight;
  }

  .slider-container {
    position: absolute;
    bottom: 90%;
    left: 2px;
    width: 30px;
    height: $height + 20px;
    background: darken($color-background-dark, 8%);
    border-radius: 100px;
    z-index: 9999;

    .slider {
      position: relative;
      top: 72px;
      left: -57px;

      .slider-input {
        width: $height !important;
      }
    }
  }
}
</style>
