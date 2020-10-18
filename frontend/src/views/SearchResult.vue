<template>
  <div id="SearchResult" >
    <Search :infolist="Array.from(infolist)" :key="$router.fullpath" @keychange="KeyChange"/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import axios from 'axios'
import '@/mock/index'
export default {
  name: 'SearchResult',
  components: {
    Search
  },
  data () {
    return {
      activeindex: 0,
      infolist: {
        type: Array
      }
    }
  },
  created () {
    axios.get('/index/search', {
      params: {
        query: encodeURI(this.$route.params.keyword)
      }
    }).then(ret => {
      this.infolist = ret.data.infolist
    }, error => {
      console.log(error)
      alert('服务器忙')
    })
  },
  methods: {
    KeyChange: function (newkey) {
      axios.get('/index/search', {
        params: {
          query: encodeURI(newkey)
        }
      }).then(ret => {
        this.infolist = ret.data.infolist
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
