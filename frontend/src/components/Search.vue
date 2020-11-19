<template>
<div>
<el-row style="padding:10px; border-bottom:1px solid #ccc;" >
  <el-col :span="6"  :offset="18" style="text-align:right;" v-if="!login">
      <el-col :span="4"  :offset="16" class="head_nav_h" >
        <div class="head_btn" @click="tologin">登录</div>
      </el-col>
      <el-col :span="4"  class="head_nav_h"  >
        <div class="head_btn" @click="toregister">注册</div>
      </el-col>
  </el-col>
  <div style="float:right;font-family:'pingfang'" v-if="login">
    <div class="head_nav_user">
      欢迎您，<a href="#/user" class="login_btn">{{this.$store.state.username}}</a>
    </div>
    <div class="head_nav_h" style="display:inline;float:right">
      <div class="quit_btn" @click="quituser"> 退出登录</div>
    </div>
  </div>
</el-row>
<div style="padding:  1rem;" class="news">
  <div class="nav">
      <el-row>
        <el-col :span="24">
            <el-col :xs="{span: 20, offset: 4}" :sm=" {span: 4, offset: 2}" :md=" {span: 2.5, offset: 1.5}" :lg=" {span: 2, offset: 1.5}">
              <a href='/'>
                <img src="@/assets/logo3.png" alt="" class="searchlogo" width="100%" height="100%" >
              </a>
            </el-col>
            <el-col :xs="{span: 10, offset: 4}" :sm="8" class="searchinput">
              <el-autocomplete
                class="inline-input searchinput"
                suffix-icon = "el-icon-search"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                v-model.lazy="keyword"
                @keyup.enter.native="search"
                style="width: 100%"
                >
                <el-button slot="append" class="btn_search" @click="search">搜索</el-button>
              </el-autocomplete>
            </el-col>
            <el-col :xs="10" :sm="4">
              <el-dropdown @command="handleCommand" class="choice">
                <span class="el-dropdown-link">
                  搜索工具<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="false" :class="time?'':'selected'">按相关排序</el-dropdown-item>
                  <el-dropdown-item command="true" :class="time?'selected':''">按时间排序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="{span: 18, offset: 4}" :sm="{span: 18, offset: 6}" :lg=" {span: 18, offset: 4}" style="font-size:10px">
          共搜索到{{count}}个结果<span v-if="removecnt === 0">。</span><span v-else>，并为您去除了本页中的{{removecnt}}条重复结果</span>
        </el-col>
      </el-row>
  </div>
  <div class="content">
      <el-row>
        <el-col :xs="22" :sm="12" :offset="4">
          <el-col :span="24" v-for="(item,index) in infolist" :key="index">
            <div class="box">
              <h4 class="titles" v-html="item.title" @click="goto(item)">{{item.title}}</h4>
              <!-- Do not show anything if no image in the web -->
              <el-col :xs="12" :sm="12" :md="5" v-if="(item.img!='empty'&&item.img!='unknown img'&&item.source!='xinhua')">
                <div :style="{'background-image': 'url('+item.img+')' }" class="news_img"></div>
              </el-col>
              <el-col :xs="20" :sm="20" :md="(item.img=='empty'||item.img=='unknown img'||item.source=='xinhua')?24:19" class="news_info">
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
      count: 0,
      removecnt: 0,
      login: false,
      time: false,
      history: []
    }
  },
  mounted () {
    this.login = (typeof (this.$store.state.token) !== 'undefined') && (this.$store.state.token !== '')
    this.keyword = this.$route.params.keyword
    document.title = this.$route.meta.title + this.keyword
    this.KeyChange(this.keyword)
    this.getHistory()
  },

  watch: {
    '$route' (to, from) {
      document.title = to.meta.title + to.params.keyword
      this.KeyChange(to.params.keyword)
    }
  },
  methods: {
    handleCommand: function (command) {
      this.time = command === 'true'
      this.KeyChange(this.keyword)
    },
    goto: async function (item) {
      // 此处将用户关注的新闻分词提取出来
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
      axios.post('/api/views/',
        {
          like: particle
        })
      window.open(item.news_url, '_blank')
    },
    unique (arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.title) && res.set(arr.title, 1))
    },
    KeyChange: async function (newkey) {
      await axios.get('https://news-search-lucene-rzotgorz.app.secoder.net/index/search',
        {
          params: {
            query: newkey,
            time: this.time
          }
        }).then(ret => {
        this.infolist = ret.data.infolist
        this.removecnt = this.infolist.length
        this.infolist = this.unique(this.infolist)
        this.removecnt = this.removecnt - this.infolist.length
        this.count = ret.data.count
        this.pages = Math.ceil(this.count / 20)
        this.currentpage = 1
      }, error => {
        console.log(error)
        this.infolist = []
        alert('服务器忙')
      })
      axios.post('/api/postrecord/',
        {
          content: newkey
        })
    },
    getHistory () {
      axios.get('/api/getrecord/').then(ret => {
        console.log(history)
        this.history = ret.data.data
      }, error => {
        this.history = []
        console.log(error)
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
            start: (currentPage - 1) * 20,
            time: this.time
          }
        }).then(ret => {
        this.infolist = []
        this.removecnt = 0
        for (var i = 0; i < ret.data.infolist.length; i++) {
          if (i === 0 || ret.data.infolist[i - 1].title !== ret.data.infolist[i].title) { this.infolist.push(ret.data.infolist[i]) } else { this.removecnt += 1 }
        }
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
    },
    querySearch (queryString, cb) {
      var history = this.history
      var result = queryString ? history.filter(this.createFilter(queryString)) : history.slice(0, 10)
      var results = []
      for (const item of result) {
        results.push({ value: item })
      }
      cb(results)
    },
    createFilter (queryString) {
      return (history) => {
        return (history.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchlogo {
  height: 50px;
  width: 50px;
  transform: translate(100%,0);
}
.nav{
  padding:20px 0px;
  // width: 1784px;
  margin: 0 auto;
  margin-top: 20px;
}
.content{
  padding:20px 0px;
  // width: 1784px;
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
  padding: 20px 0;
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
  padding-right: 0%;
  margin-right: 0px;
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.choice{
  padding-left: 10px;
  padding-top: 10px;
}
.selected{
  background-color: rgb(64, 158, 255);
  color: white
}
</style>
