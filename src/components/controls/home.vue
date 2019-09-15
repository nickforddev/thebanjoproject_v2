<template>
  <div class="home-btn" v-on="$listeners">
    <home-icon />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import HomeIcon from '@/components/icons/home'

export default {
  name: 'close-btn',
  components: {
    HomeIcon
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.home-btn {
  width: 34px;
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  padding: 5px;
  color: black;

  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }
}
</style>
