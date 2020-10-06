
<template>
    <el-container>
        <el-header>
          <div class="toollist">
            <div class="searcharea">
                  <img src="../assets/systemlogo.png" alt="" width = "150px" height="30px" style="vertial-align:bottom;"/>
                  <input placeholder="检索一下" v-model="searchitem" size="42" max-length="100" class="searchbar" @keyup.enter="search">
                  <input class="btn" @click="search" value="搜索新闻">
            </div>
            <div style="float:right">
              <a v-if="loginstate" href="/login" style="color:gray">登录</a>
              <span v-else>欢迎您，<a href="/user" style="color: gray">{{username}}</a></span>
            </div>
          </div>
          <div class="indexlist">
            <el-row>
              <a v-for="(item,index) in menulist" v-bind:key="index" :href="item.url">
                <el-col :span="1" >
                  <div :class="['grid-content',nowindex == index?'nowgrid':'']">{{item.data}}</div>
                </el-col>
              </a>
              </el-row>
          </div>
        </el-header>
        <el-container class = "home-main">
            <!---<router-view></router-view>--->
            <el-aside width="35%">
              <li class="typelabel">
                <span class="shorttypelabel">热点要闻</span>
              </li>
              <ul v-for="(item,index) in textnews" v-bind:key="index">
                <a :class="item.importance?'impnews':'simnews'" :href="item.url"> {{item.title}} </a>
              </ul>
            </el-aside>
            <el-main>
              <li class="typelabel">图片新闻</li>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      searchitem: '',
      username: '您尚未登录',
      loginstate: true,
      menulist: [
        {
          data: '首页',
          url: '/home'
        },
        {
          data: '历史',
          url: '/home/history'
        },
        {
          data: '国际',
          url: '/home/global'
        },
        {
          data: '国内',
          url: '/home/domes'
        }],
      nowindex: 0,
      picnews: [],
      textnews: []
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
    },
    search () {
      this.$router.push('/search?' + this.searchitem)
    }
  },
  created () {
    this.picnews = []
    this.textnews = [
      {
        title: '习近平新时代中国特色社会思想进入高校思政课',
        url: '/news/111',
        importance: true
      },
      {
        title: '特朗普夫妇确诊新冠肺炎',
        url: '/news/112',
        importance: false
      }
    ]
  }
}
</script>

<style lang="less" scoped>
.home-main{
    height: 100%;
    margin: 15px;
}
.el-header{
    align-items:center;
    background-color: white;
    color:black;
    font-size : auto;
    height : auto;
    padding : 10px;
    margin-left : 0;
    margin-bottom: 50px;
}
.toollist{
    align-items: center;
    padding : 0;
    margin-bottom : 15px;
    display: block;
}
.searcharea{
    position: relative;
    //vertical-align: bottom;
    display: inline-block;
    margin-left: 30%;
    margin-right: 0;
}
.searchbar{
    line-height: 30px;
    vertical-align: bottom;
}
.btn{
    background-color: #38f;
    width : 104px;
    height : 42ox;
    line-height : 32px;
    font-size: 16px;
    cursor: pointer;
    outline: 0;
    padding : 0;
    box-shadow: none;
    color : #fff;
    font-family: Arial;
    border: 1px solid #38f;
    border-bottom: 1px solid #2e7ae5;
    vertical-align: bottom;
    text-align: center;
}
.indexlist{
  background-color: darkblue;
  vertical-align: middle;
  margin:0 -10px;
  padding-left: 0;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    font-weight: bold;
}
.nowgrid{
  background-color: darkred;
}
.typelabel{
  height : 36px;
  line-height: 36px;
  text-align: center;
  list-style: none;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.shorttypelabel{
   float: left;
   border-bottom: 2px solid #2f63ba;
   color: #2f63ba;
   font-size: 18px;
   font-weight: 700;
   padding: 0 20px;
   vertical-align: baseline;
}
.impnews{
  font-weight: bold;
  font-size:20px;
  color:black;
  text-decoration: none;
}
.simnews{
  font-weight:500;
  font-size:auto;
  color:black;
  text-decoration: none;
}
</style>
