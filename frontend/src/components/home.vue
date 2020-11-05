<template>
  <div style="padding: 0 15px;" class="news">
    <div>
      <el-row style="padding:10px; border-bottom:1px solid #ccc;">
        <el-col :span="6"  :offset="22" style="text-align:right;">
          <el-col :span="4"  class="head_nav_h"  >
            <a href="#/login" class="login_btn" >登录</a>
          </el-col>
          <el-col :span="4"  class="head_nav_h"  >
            <a href="#/register" class="login_btn" >注册</a>
          </el-col>
        </el-col>
      </el-row>

      <el-row class="search">
        <el-col :span="24" >
          <div>
            <el-col :span="2" :offset="6">
              <img src="@/assets/logo2.jpg" id="logo" alt="">
            </el-col>
            <el-col :span="10">
              <el-input
                placeholder="请输入内容"
                v-model="keyword">
                <el-button slot="append" class="btn_search">click me!</el-button>
              </el-input>
            </el-col>
            <el-col :span="2" class="help">
              <span>帮助</span>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <el-row :class="headcss">
        <el-col :span="16" :offset="4" style="overflow:hidden;height:47px;line-height:47px;">
          <div :class="(activenav==index|| selactive==index)?'nav_active':'nav_tab'"
            @mouseover="selectStyle (index) " @mouseout="outStyle(index)"
            v-for="(item,index) in navlist" :key="index">
            <div @click="selectclass(index)" class="type">
              <i class="el-icon-s-home" v-if="index==0"></i>{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="content">
      <el-row>
        <el-col :span="7" :offset="4">
          <el-col :span="24">
            <h2 class="news_tit">热点要闻</h2>
            <div class="box">
              <ul v-for="(item,index) in textnews" :key="index" >
                <li @click="goto(item.news_url)">
                  <i class="dot"></i>
                  <span>{{item.title}}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-col>

        <el-col :span="10">
          <el-col :span="24">
            <div class="imgs">
              <el-carousel :interval="5000" arrow="always" indicator-position="outside">
                <el-carousel-item v-for="(item,index) in imgnews" :key="index">
                  <a :href="item.news_url">
                    <img :src="item.img" style="width:100%;height:100%;" alt="" srcset="">
                    <div class="img_title">{{item.title}}</div>
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>

          <el-col :span="24">
            <h3 class="tit2">热搜新闻词 <span>HOT WORDS</span></h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" class="news_word">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="8" class="news_word">中共中央政治局召开会议习近平主持</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
            <el-col :span="4" class="news_word_small">习近平见习全国双拥模范表彰大会代表</el-col>
          </el-col>

          <el-col :span="24">
            <h3 class="tit2">猜你喜欢 <span>LIKE</span></h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <div class="imgs">
                <img src="@/assets/imgs.jpg" style="width:100%;height:100%;" alt="" srcset="">
                <h5 class="img_tit1">Iphone 12</h5>
              </div>
            </el-col>
            <el-col :span="14" class="box2">
              <ul>
                <li v-for="(item,index) in textnews" :key="index">
                  <span class="child_tit">{{item.title}}</span>
                </li>
              </ul>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-top:5px;">
            <el-col :span="10">
              <el-col :span="11">
                <div class="imgs">
                  <img src="@/assets/imgs.jpg" style="width:100%;height:150px;" alt="" srcset="">
                  <h5 class="img_tit">Iphone 12</h5>
                </div>
              </el-col>
              <el-col :span="11" :offset="2">
                <div class="imgs">
                  <img src="@/assets/imgs.jpg" style="width:100%;height:150px;" alt="" srcset="">
                  <h5 class="img_tit">Iphone 12</h5>
                </div>
              </el-col>
            </el-col>
            <el-col :span="14" class="box2">
              <ul>
                <li v-for="(item,index) in textnews" :key="index">
                  <span class="child_tit">{{item.title}}</span>
                </li>
              </ul>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'homepage',
  props: {
    news: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goto (url) {
      window.location.href = url
    },
    // he是为了方便单元测试 默认传参不影响
    handleScrollx (event, he = -1) {
      var height = window.pageYOffset
      if (he !== -1) {
        height = 300
      }
      if (height > 222) {
        this.headcss = 'nav2'
      } else {
        this.headcss = 'nav'
      }
    },
    selectclass (index) {
      this.activenav = index
    },
    selectStyle (index) {
      if (index !== this.selactive) {
        this.selactive = index
      }
    },
    outStyle (index) {
      this.selactive = -1
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  created () {
    axios.get('/api/getnews/').then(ret => {
      this.imgnews = ret.data.data.imgnews
      this.textnews = ret.data.data.textnews
    }, error => {
      this.imgnews = []
      this.textnews = []
      console.log(error)
      alert('服务器忙')
    })
  },
  data () {
    return {
      left: 'left',
      keyword: '',
      headcss: 'nav',
      headindex_active: 1,
      activenav: 0,
      selactive: 0,
      navlist: [
        {
          name: '要闻',
          url: ''
        },
        {
          name: '娱乐',
          url: ''
        },
        {
          name: '财经',
          url: ''
        },
        {
          name: '体育',
          url: ''
        },
        {
          name: '时尚',
          url: ''
        }
      ],
      imgnews: [],
      textnews: []
    }
  }
}
</script>

<style scoped>
.news{
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
}
.btn_search{
      background-color: #4e6ef2 !important;
      color:#fff !important;
      border-radius: 0;
      padding: 14px 15px !important;
      border: none !important;
}
.search{
  padding:20px 0px;
  margin-top:20px;
}
#logo{
  width:100px;
  height:30px;
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
}
.nav2{
  background:#01204f;
  color:#fff;
  font-weight: bold;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  width: 100%;
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
.help{
    text-align: center;
    height: 40px;
    line-height: 40px;
    text-decoration: underline;
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
/* .img_title{
 width: 100%;
 color: white;
 text-align: center;
 font-weight: normal;
 vertical-align: text-top;
} */
.img_title{
  position:absolute;
  width:475px;
  height:100px;
  bottom: -20%;
  left: 0%;
  background-color: transparent;
  color: white;
  text-align: center;
}
.img_tit:hover{
  background:rgb(79, 125, 192);
  color: #fff;
}
.child_tit{
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.news_word{
    font-size: 18px;
    background: #3064bb;
    padding:20px 12px;
    border:1px solid #fff;
    height:100px;
    color: #fff;
    text-align: center;
}
.news_word:hover{
  background-color: green;
  cursor: pointer;
}
.news_word_small{
    font-size: 14px;
    background: #3064bb;
    padding:20px 12px;
    border:1px solid #fff;
    height:100px;
    color: #fff;
    text-align: center;
}
.news_word_small:hover{
  background-color: green;
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
</style>
