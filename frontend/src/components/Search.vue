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
              <el-col :span="6" v-if="item.img!=''">
                <img :src="item.img" class="news_img" >
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
    this.keyword = this.$route.query.keyword
    this.ssindex()
    console.log('@@@@')
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
      this.$router.push({ path: '/searchresult', query: { keyword: this.keyword } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
