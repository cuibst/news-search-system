<template>
  <div id="RegisterPage" >
      <Register/>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'

export default {
  name: 'RegisterPage',
  components: {
    Register
  }
}
</script>

<style lang="less" scoped>
#RegisterPage {
  background-color: #66CCFF;
  height: 100%;
}
</style>
