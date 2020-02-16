<template>
  <div
    class="volume-container"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button @click="toggle">
      <icon-volume class="icon-volume" :value="value" />
    </button>
    <transition name="fade">
      <div v-if="open" class="slider-container">
        <div class="slider">
          <slider
            :value="value"
            class="slider-input"
            v-on="$listeners"
          />
        </div>
        <div class="pointer" />
      </div>
    </transition>
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
$background: darken($color-background-dark, 8%);

.volume-container {
  position: relative;

  button {
    height: 60px;
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
    bottom: calc(100% - 6px);
    left: 0;
    width: 41px;
    height: $height + 20px;
    background: darken($color-background-dark, 8%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    border-radius: 2px;
    z-index: 999999;

    .pointer {
      position: absolute;
      top: 100%;
      left: 14px;
      width: 12px;
      height: 18px;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: -8px;
        width: 12px;
        height: 12px;
        background-color: $background;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        transform: rotate(45deg);
      }
    }

    .slider {
      position: relative;
      top: 72px;
      left: -52px;

      .slider-input {
        width: $height !important;
      }
    }
  }
}
</style>
