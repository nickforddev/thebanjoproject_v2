<template>
  <div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Region from '@/models/region'

export default {
  name: 'region',
  models: {
    region() {
      return new Region()
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      console.log(this.$route.params.region)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>