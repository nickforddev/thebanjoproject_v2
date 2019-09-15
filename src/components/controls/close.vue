<template>
  <div class="close-btn" v-on="$listeners">
    <close />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import close from '@/components/icons/close'

export default {
  name: 'close-btn',
  components: {
    close
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.close-btn {
  width: 30px;
  padding: 6px;
  z-index: 99999;
  color: white;
  background: $color-background-dark;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
}
</style>
