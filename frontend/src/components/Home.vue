
<template>
    <el-container>
        <el-header>
            <div>
                <img src="../assets/systemlogo.png" alt="" width = "300px" height="40px"/>
            </div>
            <input placeholder="检索一下" v-model="searchitem">
        </el-header>
        <el-container class = "home-main">
            <el-aside width="200px">重要新闻推介</el-aside>
            <el-main>图片新闻</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    login () {
      document.location = '/log'
    }
  },
  data () {
    return {
      searchitem: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-main{
    height: 100%
}
.el-header{
    display:flex;
    justify-content: space-between;
    align-items:center;
    background-color: #373d41;
    color:white;
    font-size : auto;

}
</style>
