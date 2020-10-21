<template>
  <div style="padding: 0 15px;" class="news">
    <div class="nav">
      <el-row>
        <el-col :span="24">
          <div>
            <el-col :span="2" :offset="6">
              <img src="@/assets/logo2.jpg" class="logo" alt="">
            </el-col>
            <el-col :span="10">
              <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="keyword">
                <el-button slot="append" class="btn_search" @click="search">百度一下</el-button>
              </el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="navbar">
      <ul class="type">
        <li v-for="(item, index) in navlist" :key="index" class="nav">{{item.name}}</li>
      </ul>
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
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in imgnews" :key="item">
            <img :src="item.img" class="image">
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
    }
  },
  data () {
    return {
      left: 'left',
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
  padding:50px 4rem;
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

.navbar {
  overflow: hidden;
  padding:20px 0px;
}
.navbar ul{
  list-style: none;
  overflow: hidden;
  padding: 0;
}
.navbar ul li{
  float:left;
  height:50px;
  line-height: 50px;
  padding:0px 25px;
  color: #ccc;
}

.navbar ul li:hover{
  color:rgb(207, 33, 33);
  cursor: pointer;
}
.logo{
  height: 50px;
}
.type{
  background-color: #01204f;
  width: 100%;
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

</style>
