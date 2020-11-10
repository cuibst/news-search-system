<template>
<div style="padding:  1rem;" class="news">
  <div class="nav">
      <el-row>
        <el-col :span="24">
          <div>
            <el-col :span="1" :offset="1">
              <img src="@/assets/logo2.jpg" alt="" class="searchlogo">
            </el-col>
            <el-col :span="8" class="searchinput">
              <el-input placeholder = "请输入内容"
                suffix-icon = "el-icon-search"
                v-model = "keyword">
                <el-button slot="append" class="btn_search" @click="search">click me</el-button>
              </el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
  <div class="content">
      <el-row>
        <el-col :span="12" :offset="2">
          <el-col :span="24" v-for="(item,index) in infolist" :key="index">
            <div class="box">
              <h4 class="titles" v-html="item.title" @click="goto(item.news_url, item.category)">{{item.title}}</h4>
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
        <el-pagination background layout="prev, pager, next" :page-count="pages" @current-change="handleCurrent" :current-page.sync="currentpage">
        </el-pagination>
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
      pages: 0
    }
  },
  mounted () {
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
    goto (url, type) {
      axios.post('/api/views/',
        {
          news_type: type
        })
      window.open(url, '_blank')
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
        // console.log(this.infolist)
      }, error => {
        console.log(error)
        this.infolist = []
        alert('服务器忙')
      })
    },
    search () {
      // 此处变更搜索路径
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
    }
  }
}
</script>

<style lang="less" scoped>
.searchlogo {
  height: 50px;
}
.nav{
  padding:15px 0px;
}
.mg2{
  margin-right:10px;
  color:#626675;
  padding:3px 0;
  cursor: pointer;
}
.totalinfo{
  padding:1rem 0;
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
  margin-left: 10%;
}
</style>
