<template>
  <div class="user_container">
     <h3 class="tit2">注册信息 <span>Profile</span></h3>
     <ul>
       <li>用户名：&nbsp;{{user.username}}</li>
       <li>电子邮箱：&nbsp;{{user.email}}</li>
       <li>手机号码：&nbsp;{{user.phonenumber}}</li>
     </ul>
     <h3 class="tit2" v-if="length>0">搜索记录 <span>History</span></h3>
     <ul v-if="length>0">
       <li v-for="(item, index) in history" :key="index">
         <span class="history" @click="search(item)">{{item}}</span>
       </li>
     </ul>
     <h3 class="tit2">猜你喜欢 <span>Like</span></h3>
     <el-row v-for="(item,index) in likenews" :key="index">
       <el-col :sm="24" :md="13">
         <h3 style="vertical-align: middle" class="title" @click="goto(item.news_url)">{{item.title}}</h3>
       </el-col>
       <el-col :xs="16" :sm="12" :md="4" :offset="5" v-if="(item.img!='empty'&&item.img!='unknown img')">
         <div :style="{'background-image': 'url('+item.img+')' }" class="news_img"></div>
       </el-col>
     </el-row>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'Profile',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      likewords: '',
      likenews: [],
      history: [],
      length: 0
    }
  },
  created () {
    axios.get('/api/getnews/',
      {
        params: {
          type: 0
        }
      }).then(ret => {
      this.likewords = ret.data.data.likeword
      this.getLikenews()
    }, error => {
      this.likewords = ''
      console.log(error)
      alert('服务器忙')
    })
    axios.get('/api/getrecord/').then(ret => {
      this.history = ret.data.data
      this.length = ret.data.length
    }, error => {
      this.length = 0
      console.log(error)
    })
  },
  methods: {
    goto (url) {
      window.open(url, '_blank')
    },
    search (keyword) {
      this.$router.push({ name: 'SearchResult', params: { keyword: keyword } })
    },
    unique (arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.title) && res.set(arr.title, 1))
    },
    getLikenews () {
      axios.get('https://news-search-lucene-rzotgorz.app.secoder.net/index/search',
        {
          params: {
            query: this.likewords,
            time: true
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
      }, error => {
        this.likenews = this.imgnews
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.user_container {
 margin-top: 5pc;
 margin-left: 10px;
 padding-left: 2pc;
 height:100%;
}

ul li {
  list-style-type: none;
  line-height: 30px;
  padding: 0;
  text-align: left;
  margin-bottom: 0;
}
.tit2{
      color: darkblue;
      border-bottom: 1px solid #ccc;
      padding:4px 0px;
      line-height: 20px;
      text-align: left;
      font-size: 30px;
}
.tit2 span{
    position: relative;
    top: 1px;
    padding-left: 5px;
    font: 500 20px/25px arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #999;
}
.el-row{
  margin-top: 10px;
  margin-bottom: 5px;
}
.news_img{
  width:100%;
  height:0;
  padding-bottom: 50%;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
.title{
  font-family: '黑体', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  margin: 5px 5px;
  cursor: pointer;
}
.el-col{
  text-align: left;
  min-height: 100px;
}
.history{
  cursor: pointer;
  text-decoration: underline;
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
