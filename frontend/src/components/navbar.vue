<template>
    <div class="nav">
      <el-row>
        <el-col :span="24">
          <div>
            <el-col :span="1">
              <img src="@/assets/logo2.jpg" alt="" class="searchlogo">
            </el-col>
            <div v-for="(item,index) in navlist" :key="index" class="nav">
              <el-col :span="1" class="li">
                {{item.name}}
              </el-col>
            </div>
            <el-col :span="4" class="searchinput" :offset="4">
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
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      keyword: '',
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
      ]
    }
  },
  mounted () {
    this.keyword = this.$route.params.keyword
  },
  methods: {
    search () {
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword } })
    }
  }
}
</script>

<style scoped>
.searchlogo {
  height: 50px;
}
.nav ul{
  list-style: none;
  overflow: hidden;
  padding: 0;
}
.li{
  float:left;
  height:50px;
  line-height: 50px;
  padding:0px 25px;
}
.li:hover{
  color:rgb(33, 88, 207);
  cursor: pointer;
  background-color: red;
}
.search-input{
  float: right;
}
.btn_search{
  background-color: #4e6ef2 !important;
  color:#fff !important;
  border-top-left-radius: 0% !important;
  border-bottom-left-radius: 0% !important;
  padding: 14px 15px !important;
  border: none !important;
}
</style>
