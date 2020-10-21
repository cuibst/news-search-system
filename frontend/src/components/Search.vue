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
              <h4 class="titles" v-html="item.title" @click="goto(item.news_url)">{{item.title}}</h4>
              <!-- Do not show anything if no image in the web -->
              <el-col :span="6" v-if="item.img!='empty'">
                <img :src="item.img" class="news_img">
              </el-col>
              <el-col :span="item.img==''?24:18" class="news_info">
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
    </div>
</div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    infolist: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    // 此处调用高亮函数，当在此页面继续搜索时可能不会起作用，因为是相同url下的params变换跳转
    this.keyword = this.$route.params.keyword
    this.ssindex()
    console.log(this.keyword)
  },

  watch: {
    '$route' (to, from) {
      // Send new search content to the parent
      this.$emit('keychange', to.params.keyword)
    },
    infolist (to, from) {
      this.keyword = this.$route.params.keyword
      this.ssindex()
    }
  },
  methods: {
    goto (url) {
      window.location.href = url
    },
    ssindex () {
      if (this.keyword === '') {
        return
      }
      this.infolist.forEach(item => {
        if (item.title.indexOf(this.keyword) !== -1) {
          // 检索标题
          const reg = new RegExp(this.keyword)
          var str = ''
          str = item.title.replace(reg, `<span style="color:#F96600">${this.keyword}</span>`)
          item.title = str
          // 检索内容
          str = ''
          str = item.summary.replace(reg, `<span style="color:#F96600">${this.keyword}</span>`)
          item.summary = str
        }
      })
    },
    search () {
      // 此处变更搜索路径
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword } })
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
  border-radius: 8px;
  height: 100%;
  width: 100%;
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
</style>
