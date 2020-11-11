<template>
  <div id="LoginPage" >
      <Login @succeed="Succeed"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login
  },
  methods: {
    Succeed: function () {
      // 解析redirect部分的量
      const redirect = decodeURIComponent(this.$route.query.redirect || '/')
      this.$router.push({ path: redirect })
    }
  }
}
</script>

<style lang="less" scoped>
#LoginPage {
  height: 100%;
}
</style>
