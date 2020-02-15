<template>
  <input
    class="range vertical-highest-first round"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    @input="emitInput"
    @change="emitChange"
  >
</template>

<script>
export default {
  name: 'input-range',
  props: {
    value: {
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  methods: {
    emitInput(e) {
      this.$emit('input', +e.target.value)
    },
    emitChange(e) {
      this.$emit('change', +e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

input[type="range"].range {
  cursor: pointer;
  width: 100px !important;
  -webkit-appearance: none;
  z-index: 200;
  width: 50px;
  padding: 0;
  background-color: $color-background-dark;
  border: 0 !important;
  border-radius: 20px;
}

/*customised range when focusing on input */
input[type="range"].range:focus {
  border: 0 !important;
  outline: none !important;
}

/* icon */
input[type="range"].range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  background-color: $color-highlight;
  border-radius: 5px;
}

/* set range from 0 - 1 horizontal as by default */
.horizontal-lowest-first {
  transform: rotate(0deg);
}

/* set range from 1 - 0 horizontal (highest first) */
.horizontal-highest-first {
  transform: rotate(180deg);
}

/* set range from 0 - 1 vertically (lowest on top) */
.vertical-lowest-first {
  transform: rotate(90deg);
}

/* set range from 1 - 0 vertically (highest on top) */
.vertical-highest-first {
  transform: rotate(270deg);
}
</style>
