<template>
<div style="padding:  1rem;" class="news">
  <div v-for="(item,index) in infolist" :key="index">
    {{item.title}}
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    infolist: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    this.keyword = this.$route.params.keyword
  }
}
</script>

<style lang="less" scoped>
</style>
