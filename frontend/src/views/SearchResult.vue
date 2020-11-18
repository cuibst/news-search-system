<template>
  <div id="SearchResult" >
    <Search/>
    <Endbar style="bottom:0px;position:relative"></Endbar>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Endbar from '@/components/Endbar.vue'
export default {
  name: 'SearchResult',
  components: {
    Search,
    Endbar
  }
}
</script>
<style lang="less" scoped>
#SearchResult {
  height: 100%;
}
</style>
