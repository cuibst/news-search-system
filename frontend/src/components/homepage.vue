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
      <ul class="type">
        <li v-for="(item, index) in navlist" :key="index" class="nav">{{item.name}}</li>
      </ul>
    </div>
    <div class="content">
      <div :class="left">
      </div>
      <div class="right">
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
  width:90%;
  padding:0 4rem;
}
.content .left{
  float:left;
  width:10%;
  border-right: 1px solid #ccc;
  text-align: center;
  position: relative;
  top:0;
}
.content .left2{
  float:left;
  width:10%;
  border-right: 1px solid #ccc;
  text-align: center;
  position: fixed;
  top:0;
}
.news .imgs{
  text-align: center;
}

.nav {
  overflow: hidden;
  padding:20px;
}
.nav ul{
  list-style: none;
  overflow: hidden;
  padding: 0;
}
.nav ul li{
  float:left;
  height:50px;
  line-height: 50px;
  padding:0px 25px;
}

.nav ul li:hover{
  color:rgb(33, 88, 207);
  cursor: pointer;
}
.logo{
  height: 50px;
}
.type{
  background-color: #01204f;
  width: 100%;
}
</style>
