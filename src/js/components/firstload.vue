<template>
  <div class="firstload">
    <div class="center">
      <logo />
      <div class="tagline">
        A Digital Musem
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'
import Logo from '@/components/logo'

export default {
  name: 'firstload',
  mounted() {
    this.startCountdown()
  },
  methods: {
    async startCountdown() {
      await sleep(2000)
      this.emitLoaded()
    },
    emitLoaded() {
      this.$emit('loaded')
    }
  },
  components: {
    Logo
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.firstload {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $color-background-dark;
  color: $color-text-light;
  text-align: center;
}
.center {
  position: absolute;
  width: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
// .logo {
// }
.tagline {
  margin-top: 20px;
}
</style>
