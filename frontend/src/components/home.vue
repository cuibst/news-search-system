<template>
  <div style="padding: 0 15px;" class="news">
    <div>
      <el-row style="padding:10px; border-bottom:1px solid #ccc;">
        <el-col :span="6"  :offset="22" style="text-align:right;">
          <el-col :span="4"  class="head_nav_h"  >
            <div >登录</div>
          </el-col>
          <el-col :span="4"  class="head_nav_h"  >
            <div >注册</div>
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
      <el-row>
        <el-col :span="7" :offset="4">
          <el-col :span="24">
            <h2 class="news_tit">热点要闻</h2>
            <div class="box">
              <ul v-for="(item,index) in textnews" :key="index" >
                <li>
                  <i :class="dot"></i>
                  <h3 v-if="index%5==0">{{item.title}}</h3> 
                  <span v-else>{{item.title}}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-col>

        <el-col :span="10">
          <el-col :span="24">
            <div class="imgs">
              <img src="@/assets/imgs.jpg" style="width:100%;height:100%;" alt="" srcset="">
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
                <img src="@/assets/home/imgs.jpg" style="width:100%;height:100%;" alt="" srcset="">
                <h5 class="img_tit1">Iphone 12</h5>
              </div>
            </el-col>
            <el-col :span="14" class="box2">
              <ul>
                <li v-for="(item,index) in tempArr2[0]" :key="index">
                  <h3 v-if="item.istit">{{item.name}}</h3> 
                  <span v-else class="child_tit">{{item.name}}</span>
                </li>
              </ul>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-top:5px;">
            <el-col :span="10">
              <el-col :span="11">
                <div class="imgs">
                  <img src="@/assets/home/imgs.jpg" style="width:100%;height:150px;" alt="" srcset="">
                  <h5 class="img_tit">Iphone 12</h5>
                </div>
              </el-col>
              <el-col :span="11" :offset="2">
                <div class="imgs">
                  <img src="@/assets/home/imgs.jpg" style="width:100%;height:150px;" alt="" srcset="">
                  <h5 class="img_tit">Iphone 12</h5>
                </div>
              </el-col>
            </el-col>
            <el-col :span="14" class="box2">
              <ul>
                <li v-for="(item,index) in tempArr2[1]" :key="index">
                  <h3 v-if="item.istit">{{item.name}}</h3> 
                  <span v-else class="child_tit">{{item.name}}</span>
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
</style>
