<template>
<div style="padding:  1rem;" class="news">
    {{keyword}}
</div>
</template>

<script>
export default {
  name: 'Search',
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
