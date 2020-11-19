<template>
  <div style="padding: 0 15px;" class="news">
    <div>
      <el-row style="padding:10px; border-bottom:1px solid #ccc;">
        <el-col :span="6"  :offset="18" style="text-align:right;min-width:200px" v-if="!login">
          <el-col :span="4"  :offset="16" class="head_nav_h"  >
            <a href="#/userhome" class="login_btn" >登录</a>
          </el-col>
          <el-col :span="4"  class="head_nav_h"  >
            <a href="#/register" class="login_btn" >注册</a>
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

      <el-row class="search">
        <el-col :span="24" >
          <div>
            <el-col :span="4">
              <img src="@/assets/logo3.png" id="logo" alt="">
            </el-col>
            <el-col :span="16" :offset="-2">
              <el-autocomplete
                class="inline-input searchinput"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                v-model="keyword"
                @keyup.enter.native="search"
                style="width: 100%"
                @select="search"
                >
                <el-button slot="append" class="btn_search" @click="search">Search</el-button>
              </el-autocomplete>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <el-row :class="headcss">
        <div style="overflow:hidden;height:47px;line-height:47px;width: 1084px;margin: 0 auto;">
          <div :class="(activenav==index|| selactive==index)?'nav_active':'nav_tab'"
            @mouseover="selectStyle (index) " @mouseout="outStyle(index)"
            v-for="(item,index) in navlist" :key="index">
            <div @click="selectclass(index)" class="type">
              <i class="el-icon-s-home" v-if="index==0"></i>{{item}}</div>
          </div>
        </div>
      </el-row>
    </div>

    <div class="content">
      <el-row>
        <el-col :span="10">
          <el-col :span="24">
            <h2 class="news_tit">{{(activenav == 0 )?'热点要闻':'实时新闻'}}</h2>
            <div class="box">
              <ul v-for="(item,index) in textnews" :key="index" >
                <li @click="goto(item.news_url)">
                  <i class="dot"></i>
                  <span :style="{'font-weight': index%5==0?'bold':''}">{{item.title}}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-col>

        <el-col :span="14" style="padding-left:60px">
          <el-col :span="24">
            <div class="imgs">
              <el-carousel :interval="5000" arrow="always" indicator-position="outside">
                <el-carousel-item v-for="(item,index) in imgnews" :key="index">
                  <a :href="item.news_url" target="_blank">
                    <div style="width: 572px; height: 400px;overflow:hidden">
                      <img :src="item.img" style="width:572px;min-height: 400px" alt="" srcset="">
                    </div>
                    <div class="img_title_box">
                      <span class="img_title"> {{item.title}}</span>
                    </div>
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>

          <el-col :span="24">
            <h3 class="tit2">热搜新闻词 <span>HOT WORDS</span></h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" class="news_word"  @click.native="getsearch(hotwords[0])">{{hotwords[0]}}</el-col>
            <el-col :span="8" class="news_word1"  @click.native="getsearch(hotwords[1])">{{hotwords[1]}}</el-col>
            <el-col :span="4" class="news_word_small"  @click.native="getsearch(hotwords[2])">{{hotwords[2]}}</el-col>
            <el-col :span="4" class="news_word_small1"  @click.native="getsearch(hotwords[3])">{{hotwords[3]}}</el-col>
            <el-col :span="4" class="news_word_small"  @click.native="getsearch(hotwords[4])">{{hotwords[4]}}</el-col>
            <el-col :span="4" class="news_word_small1"  @click.native="getsearch(hotwords[5])">{{hotwords[5]}}</el-col>
            <el-col :span="4" class="news_word_small"  @click.native="getsearch(hotwords[6])">{{hotwords[6]}}</el-col>
            <el-col :span="4" class="news_word_small1"  @click.native="getsearch(hotwords[7])">{{hotwords[7]}}</el-col>
            <el-col :span="4" class="news_word_small"  @click.native="getsearch(hotwords[8])">{{hotwords[8]}}</el-col>
            <el-col :span="4" class="news_word_small1"  @click.native="getsearch(hotwords[9])">{{hotwords[9]}}</el-col>
          </el-col>
          <div v-show="login">
          <el-col :span="24">
            <h3 class="tit2">猜你喜欢 <span>LIKE</span></h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <div class="imgs">
                <a :href="likeimgnews.news_url" target="_blank">
                <div :style="{'background-image': 'url('+likeimgnews.img+')' }" class="news_img"></div>
                <h5 class="img_tit1">{{likeimgnews.title}}</h5>
                </a>
              </div>
            </el-col>
            <el-col :span="14" class="box2">
              <ul>
                <li v-for="(item,index) in likenews" :key="index">
                  <span class="child_tit" @click="goto(item.news_url)">{{item.title}}</span>
                </li>
              </ul>
            </el-col>
          </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <Endbar></Endbar>
  </div>
</template>

<script>
import axios from 'axios'
import Endbar from '@/components/Endbar.vue'
// import '@/mock/index'
export default {
  name: 'homepage',
  components: {
    Endbar
  },
  props: {
    news: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goto (url) {
      window.open(url, '_blank')
    },
    // he是为了方便单元测试 默认传参不影响
    handleScrollx (event, he = -1) {
      var height = window.pageYOffset
      if (he !== -1) {
        height = 300
      }
      if (height > 144) {
        this.headcss = 'nav2'
      } else {
        this.headcss = 'nav'
      }
    },
    unique (arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.title) && res.set(arr.title, 1))
    },
    selectclass: async function (index) {
      this.activenav = index
      var that = this
      await axios.get('/api/getnews/',
        {
          params: {
            type: index
          }
        }).then(ret => {
        that.imgnews = ret.data.data.imgnews
        that.textnews = ret.data.data.textnews
        that.likewords = ret.data.data.likeword || '习近平'
        this.getLikenews()
      }, error => {
        that.imgnews = []
        that.textnews = []
        that.likewords = '习近平'
        console.log(error)
        alert('服务器忙')
      })
      scrollTo(0, 0)
    },
    getLikenews () {
      axios.get('https://news-search-lucene-rzotgorz.app.secoder.net/index/search',
        {
          params: {
            query: this.likewords
          }
        }).then(ret => {
        this.likenews = ret.data.infolist
        var reg = new RegExp('<span style="color:#F96600">(.+?)</span>')
        var j = 0
        var len = 0
        for (j = 0, len = this.likenews.length; j < len; j++) {
          var r = reg.exec(this.likenews[j].title)
          while (r) {
            this.likenews[j].title = (this.likenews[j].title).replace(reg, r[1])
            r = reg.exec(this.likenews[j].title)
          }
        }
        this.likenews = this.unique(this.likenews)
        for (j = 0, len = this.likenews.length; j < len; j++) {
          if (this.likenews[j].img !== 'empty' && this.likenews[j].img !== 'unknown img' && this.likenews[j].img.indexOf('http://') === -1) {
            this.likeimgnews = this.likenews[j]
            this.likenews.splice(j, 1)
            break
          }
        }
        this.likenews = this.likenews.slice(0, (this.likenews.length > 6) ? 6 : (this.likenews.length))
      }, error => {
        this.likenews = this.imgnews
        console.log(error)
      })
    },
    selectStyle (index) {
      if (index !== this.selactive) {
        this.selactive = index
      }
    },
    search () {
      // 此处变更搜索路径
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword } })
    },
    getsearch (keyword) {
      this.keyword = keyword
      this.search()
    },
    outStyle (index) {
      this.selactive = -1
    },
    quituser () {
      this.$store.commit('rm_token')
      this.login = false
      document.location = '#/home'
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
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  created () {
    this.login = (typeof (this.$store.state.token) !== 'undefined') && (this.$store.state.token !== '')
    var that = this
    axios.get('/api/getnews/',
      {
        params: {
          type: 0
        }
      }).then(ret => {
      that.imgnews = ret.data.data.imgnews
      that.textnews = ret.data.data.textnews
      that.likewords = ret.data.data.likeword || '习近平'
      this.getLikenews()
    }, error => {
      that.imgnews = []
      that.textnews = []
      that.likewords = '习近平'
      console.log(error)
      alert('服务器忙')
    })
    axios.get('/api/gethotwords/').then(
      ret => {
        this.hotwords = ret.data.data
      }, error => {
        console.log(error)
        this.hotwords = []
      }
    )
    axios.get('/api/getrecord/').then(ret => {
      this.history = ret.data.data
    }, error => {
      this.history = []
      console.log(error)
    })
  },
  data () {
    return {
      login: false,
      left: 'left',
      keyword: '',
      headcss: 'nav',
      headindex_active: 1,
      activenav: 0,
      selactive: 0,
      navlist: ['要闻', '政治', '财经', '科技', '军事', '社会', '教育', '运动', '娱乐', '生活'],
      imgnews: [],
      textnews: [],
      likenews: [],
      likeimgnews: {},
      likewords: '',
      hotwords: [],
      history: []
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/font/font.css';
.login_btn {
  color: black
}

.login_btn:visited {
  color: black
}
.news h2{
  text-align: center;
}
.news .content{
  text-align:justify;
  line-height: 35px;
  font-size: 18px;
  letter-spacing: 2px;
  font-family:"微软雅黑";
  overflow: hidden;
  width: 1084px;
  margin: 0 auto;
}
.search{
  padding:20px 0px;
  width: 984px;
  margin: 0 auto;
  margin-top: 20px;
}
#logo{
  width:50px;
  height:50px;
  transform: translate(0,-10%);
}
.btn_search{
      background-color: #4e6ef2 !important;
      color:#fff !important;
      border-radius: 0;
      padding: 14px 15px !important;
      border: none !important;
}
.type:hover{
  background-color: crimson;
  cursor: pointer;
}

.content ul li:hover{
  color:rgb(207, 33, 33);
  cursor: pointer;
}
.btn_search{
  background-color: #4e6ef2 !important;
  color:#fff !important;
  border-radius: 0;
  padding: 14px 15px !important;
  border: none !important;
}
.help{
    text-align: center;
    height: 40px;
    line-height: 40px;
    text-decoration: underline;
}
.nav_tab{
  float:left;
  width:60px;
  text-align: center;
  padding:0px 2px;
  background:#01204f;
}
.nav_active{
  float:left;
  width:60px;
  text-align: center;
  padding:0px 2px;
  background:crimson;
}
.news_tit{
  border-bottom: 2px solid rgb(48, 101, 201);
  text-align: center;
  width:30%;
  padding:5px;
  color: #2f63ba;
  vertical-align: baseline;
}
.nav{
  background:#01204f;
  color:#fff;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
}
.nav2{
  background:#01204f;
  color:#fff;
  font-weight: bold;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  width: 98%;
  right: 1%;
  z-index: 999;
}
.dot{
    position: absolute;
    top: 12px;
    left: 0;
    display: block;
    width: 5px;
    height: 5px;
    background: #da4453;
    *font-size: 0;
}
.box{
  line-height: 30px;
  overflow: hidden;
}
.box h3{
  margin:4px;
}
.box2{
  padding-left: 20px;
  font-size: 14px;
}
.box ul ,.box2 ul{
  list-style-type: none;
  padding:0px;
}
.box ul li{
  position: relative;
}
.box ul li h3,.box ul li span{
  margin-left: 8px;;
}
.tit2{
      color: #254282;
      border-bottom: 1px solid #ccc;
      padding:4px 0px;
}
.tit2 span{
      position: relative;
    top: 1px;
    padding-left: 5px;
    font: 500 12px/18px arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #999;
}
.img_tit1{
  padding: 0px;
  margin: 0 !important;
  text-align: center;
  font-weight: normal;
  color: #fff;
  position: relative;
  top:-25px;
  background:#000;
  opacity: 0.8;
}
.img_tit1:hover{
  opacity: 1;
}
.img_tit{
  padding: 0px;
  margin: 0 !important;
  text-align: center;
  font-weight: normal;
  padding:2px 0px;
  background-color: black;
  color: white;
}
.img_title_box{
  position:absolute;
  width:100%;
  height:100px;
  bottom: -15%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.466);
  color: white;
  padding-left: 10px;
  text-align: left;
}
.img_title{
  font-weight: bold;
  font-size: 15px;
  opacity: 1;
}
.img_tit:hover{
  background:rgb(79, 125, 192);
  color: #fff;
}
.child_tit{
  display: block;
  font-size: 18px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 25px;
  cursor: pointer;
}
.news_word{
    font-size: 18px;
    padding:20px 10px;
    border:1px solid #fff;
    background: #3064bb;
    height:100px;
    color: #fff;
    text-align: center;
    line-height: 24px;
}
.news_word1{
    font-size: 18px;
    padding:20px 10px;
    border:1px solid #fff;
    background: #6699c9;
    height:100px;
    color: #fff;
    text-align: center;
    line-height: 24px;
}
.news_word:hover{
  background-color:#003599;
  cursor: pointer;
}
.news_word1:hover{
  background-color:#003599;
  cursor: pointer;
}
.news_word_small{
    font-size: 14px;
    padding:20px 12px;
    border:1px solid #fff;
    background: #3064bb;
    height:100px;
    color: #fff;
    text-align: center;
    line-height: 20px;
}
.news_word_small1{
    font-size: 14px;
    padding:20px 12px;
    border:1px solid #fff;
    background: #6699c9;
    height:100px;
    color: #fff;
    text-align: center;
    line-height: 20px;
}
.news_word_small:hover{
  background-color:#003599;
  cursor: pointer;
}
.news_word_small1:hover{
  background-color:#003599;
  cursor: pointer;
}
.el-carousel__item:nth-child(2n) {
  background-color: gray;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: grey;
}

.login_btn {
  color: black
}

.login_btn:visited {
  color: black
}

.quit_btn {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

.searchinput{
  transform: translate(-5%,0);
}

/deep/ .el-carousel__container{
          height: 400px;
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

</style>
