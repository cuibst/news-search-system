<template>
  <div id="LoginPage" >
      <Login/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login
  }
}
</script>

<style lang="less" scoped>
#LoginPage {
  background-color: #66CCFF;
  height: 100%;
}
</style>
