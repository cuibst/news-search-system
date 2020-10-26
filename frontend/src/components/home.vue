<template>
  <div style="padding: 0 15px;" class="news">
    <div>
      <el-row style="padding:10px; border-bottom:1px solid #ccc;">
        <el-col :span="6"  :offset="22" style="text-align:right;">
          <el-col :span="4"  class="head_nav_h"  >
            <div >用户名称</div>
          </el-col>
          <el-col :span="4"  class="head_nav_h"  >
            <div >首页</div>
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
          <div :class="(activenav==index || selactive==index)?'nav_active':'nav_tab'"
           v-for="(item,index) in navlist" :key="index" >
            <div @click="selectclass(index)" class="type">
              <i class="el-icon-s-home" v-if="index==0"></i>{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="left">
        <div class="typelabel">
          <span class="shorttypelabel">热点要闻</span>
        </div>
        <ul class="hotnews">
          <li v-for="(item,index) in textnews" :key="index" @click="goto(item.url)" class="detail">{{item.title}}</li>
        </ul>
      </div>
      <div class="right">
        <el-carousel :interval="5000" arrow="always" indicator-position="outside" type="card">
          <el-carousel-item v-for="(item,index) in imgnews" :key="index">
            <span class="imgtext">{{item.title}}</span>
            <a :href="item.url">
              <img :src="item.img" class="image">
            </a>
          </el-carousel-item>
         </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
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
    handleScrollx () {
      var height = window.pageYOffset
      if (height > 222) {
        this.headcss = 'nav2'
      } else {
        this.headcss = 'nav'
      }
    },
    selectclass (index) {
      this.activenav = index
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollx, true)
    this.init()
  },
  data () {
    return {
      left: 'left',
      keyword: '',
      headcss: 'nav',
      headindex_active: 1,
      activenav: 0,
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
      imgnews: [
        {
          title: '安徽歙县古城“非遗”夜市再现“徽府盛景”',
          img: 'http://contentcms-bj.cdn.bcebos.com/cmspic/745182300a228b634d993bc3b834b806.jpeg?x-bce-process=image/crop,x_0,y_0,w_930,h_506',
          url: 'https://3w.huanqiu.com/a/58ef16/40N35LsSG8S?agt=8'
        },
        {
          title: '实拍英国波特利文海浪拍岸',
          img: 'http://contentcms-bj.cdn.bcebos.com/cmspic/0e69174619eb516c62cee299ea4f3a05.jpeg?x-bce-process=image/crop,x_0,y_0,w_2048,h_1114',
          url: 'https://3w.huanqiu.com/a/0d8d78/40N367RpL7e?agt=8'
        },
        {
          title: '安徽歙县古城“非遗”夜市再现“徽府盛景”',
          img: 'http://contentcms-bj.cdn.bcebos.com/cmspic/745182300a228b634d993bc3b834b806.jpeg?x-bce-process=image/crop,x_0,y_0,w_930,h_506',
          url: 'https://3w.huanqiu.com/a/58ef16/40N35LsSG8S?agt=8'
        },
        {
          title: '实拍英国波特利文海浪拍岸',
          img: 'http://contentcms-bj.cdn.bcebos.com/cmspic/0e69174619eb516c62cee299ea4f3a05.jpeg?x-bce-process=image/crop,x_0,y_0,w_2048,h_1114',
          url: 'https://3w.huanqiu.com/a/0d8d78/40N367RpL7e?agt=8'
        }
      ],
      textnews: [
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        },
        {
          title: '《为了和平》第五集：万众一心',
          url: 'https://news.cctv.com/2020/10/20/ARTIm0eaup9utd1jFTXMKQFb201020.shtml'
        }
      ]
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
.content .right{
  float:right;
  width:50%;
  padding:0px 4rem;
}
.content .left{
  float:left;
  width:20%;
  text-align: left;
  position: relative;
  top:0;
  left: 20%;
}
.news .imgs{
  text-align: center;
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
.typelabel{
  width: 100%;
  float: left;
  border-bottom: 1px solid gray;
  padding: 0px 20px;
  vertical-align: baseline;
}
.shorttypelabel{
  float: left;
  border-bottom: 2px solid #2f63ba;
  color: #2f63ba;
  font-size: 18px;
  font-weight: 700;
  padding: 0px;
  vertical-align: baseline;
}

.content ul li:hover{
  color:rgb(207, 33, 33);
  cursor: pointer;
}

.el-carousel__item{
  width: 500px;
  float: left;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.image{
  height: 100%;
  width: 100%;
}
.imgtext{
  font: 1em sans-serif;
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

.help{
    text-align: center;
    height: 40px;
    line-height: 40px;
    text-decoration: underline;
}
</style>
