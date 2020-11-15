<template>
<div>
<el-row style="padding:10px; border-bottom:1px solid #ccc;">
  <el-col :span="6"  :offset="22" style="text-align:right;" v-show="!login">
      <el-col :span="4"  class="head_nav_h"  >
        <div class="head_btn" @click="tologin">登录</div>
      </el-col>
      <el-col :span="4"  class="head_nav_h"  >
        <div class="head_btn" @click="toregister">注册</div>
      </el-col>
  </el-col>
  <el-col :span="7" :offset="17" style="text-align:right;" v-if="login">
    <el-col :span="14" class="head_nav_h" >
      欢迎您,<a href="#/user" class="login_btn">{{this.$store.state.username}}</a>
    </el-col>
    <el-col :span="10" class="head_nav_h" >
      <div class="head_btn" @click="quituser">退出登录</div>
    </el-col>
  </el-col>
</el-row>
<div style="padding:  1rem;" class="news">
  <div class="nav">
      <el-row>
        <el-col :span="24">
            <el-col :span="2" :offset="1">
              <a href='/'>
                <img src="@/assets/logo2.jpg" alt="" class="searchlogo" width="100%" height="100%">
              </a>
            </el-col>
            <el-col :span="8" class="searchinput">
              <el-input placeholder = "请输入内容"
                suffix-icon = "el-icon-search"
                v-model = "keyword"
                @keyup.enter.native="search">
                <el-button slot="append" class="btn_search" @click="search">搜索</el-button>
              </el-input>
            </el-col>
        </el-col>
      </el-row>
  </div>
  <div class="content">
      <el-row>
        <el-col :span="12" :offset="2">
          <el-col :span="24" v-for="(item,index) in infolist" :key="index">
            <div class="box">
              <h4 class="titles" v-html="item.title" @click="goto(item)">{{item.title}}</h4>
              <!-- Do not show anything if no image in the web -->
              <el-col :span="5" v-if="(item.img!='empty'&&item.img!='unknown img')">
                <div :style="{'background-image': 'url('+item.img+')' }" class="news_img"></div>
              </el-col>
              <el-col :span="(item.img=='empty'||item.img=='unknown img')?25:19" class="news_info">
                <div>
                  <span class="srouces">{{item.media}}</span>
                  <span class="publish_time">{{item.pub_date}}</span>
                </div>
                <div class="detal" v-html="item.summary">
                  {{item.summary}}
                </div>
              </el-col>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <div class="paginator">
        <el-pagination background layout="prev, pager, next" :page-count="pages"
          @current-change="handleCurrent" :current-page.sync="currentpage">
        </el-pagination>
      </div>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      infolist: [],
      currentpage: 1,
      pages: 0,
      login: false
    }
  },
  mounted () {
    this.login = (typeof (this.$store.state.token) !== 'undefined') && (this.$store.state.token !== '')
    this.keyword = this.$route.params.keyword
    document.title = this.$route.meta.title + this.keyword
    this.KeyChange(this.keyword)
  },

  watch: {
    '$route' (to, from) {
      document.title = to.meta.title + to.params.keyword
      this.KeyChange(to.params.keyword)
    }
  },
  methods: {
    goto: async function (item) {
      var reg = new RegExp('<span style="color:#F96600">(.+?)</span>')
      var particle = []
      var totest = item.summary + item.title
      var r = reg.exec(totest)
      while (r) {
        if (particle.indexOf(r[1]) === -1) {
          particle.push(r[1])
        }
        totest = totest.replace(reg, '')
        r = reg.exec(totest)
      }
      console.log(particle)
      axios.post('/api/views/',
        {
          like: particle
        })
      window.open(item.news_url, '_blank')
    },
    KeyChange: async function (newkey) {
      await axios.get('https://news-search-lucene-rzotgorz.app.secoder.net/index/search',
        {
          params: {
            query: newkey
          }
        }).then(ret => {
        this.infolist = ret.data.infolist
        this.count = ret.data.count
        this.pages = Math.ceil(this.count / 20)
        this.currentpage = 1
      }, error => {
        console.log(error)
        this.infolist = []
        alert('服务器忙')
      })
    },
    search () {
      // 此处处理搜索路径变更
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword } })
    },
    // 此处处理页码变更
    handleCurrent: async function (currentPage) {
      await axios.get('https://news-search-lucene-rzotgorz.app.secoder.net/index/search',
        {
          params: {
            query: this.keyword,
            start: (currentPage - 1) * 20
          }
        }).then(ret => {
        this.infolist = ret.data.infolist
      }, error => {
        console.log(error)
        this.infolist = []
        alert('服务器忙')
      })
      scrollTo(0, 0)
    },
    quituser () {
      this.$store.commit('rm_token')
      this.login = false
    },
    tologin () {
      this.$router.push({
        path: '/login',
        query: { redirect: this.$route.path }
      })
    },
    toregister () {
      document.location = '#/register'
    }
  }
}
</script>

<style lang="less" scoped>
.searchlogo {
  height: 50px;
}
.nav{
  padding:20px 0px;
  width: 1784px;
  margin: 0 auto;
  margin-top: 20px;
}
.content{
  padding:20px 0px;
  width: 1784px;
  margin: 0 auto;
  margin-top: 20px;
}
.totalinfo{
  padding:1rem 0;
}
.mg2{
  margin-right:10px;
  color:#626675;
  padding:3px 0;
  cursor: pointer;
}
.box{
  line-height: 25px;
  overflow: hidden;
}
.titles{
  text-decoration:underline;
  color: #2440b3;
  font-weight: 500;
  font-size: 20px;
  font-family: "微软雅黑";
  margin: 12px 5px;
  cursor: pointer;
}
.news_img{
  width:100%;
  height:0;
  padding-bottom: 80%;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
.news_info{
  padding:0 10px;
}
.publish_time{
  color: #9194a0;
  margin-left: 30px;
}
.active_nav{
  border-bottom: 2px solid #38f;
}
.paginator{
  margin-top: 5%;
  margin-left: 20%;
}
.login_btn {
  color: black
}
.login_btn:visited {
  color: black
}
.head_btn {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}
</style>
