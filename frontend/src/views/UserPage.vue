<template>
  <div id="SearchResult" >
    <User :user="user" />
  </div>
</template>

<script>
import User from '@/components/User.vue'
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'UserPage',
  components: {
    User
  },
  data () {
    return {
      user: {
        type: Object,
        default: () => {}
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser: function () {
      axios.get('/api/user/').then(ret => {
        this.user = ret.data.user
      }, error => {
        console.log(error)
        alert('服务器忙')
      })
    }
  }
}
</script>

// <style lang="less" scoped>
// </style>
