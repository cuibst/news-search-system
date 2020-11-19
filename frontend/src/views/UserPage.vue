<template>
  <div id="UserPage" >
    <el-container>
    <el-aside :style="'width: '+ ((offsetWid > 400)? '140px' : '60px')" >
      <a href="/" class="index">
          <img src="../assets/logo3.png" width="60%" style="margin-top:30px">
      </a>
      <el-menu default-active="1" class="el-menu-vertial-demo"
       @select="changeindex" style="margin-top:20px; padding-top:0; border:0" :collapse="offsetWid < 400">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">用户详情</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">修改设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  <el-container>
    <el-header>
      <span class="welcome" v-show="offsetWid > 450">
        Hello, {{this.$store.state.username}}! This is your own world.
      </span>
      <span class="welcome" v-show="offsetWid <= 450">
        欢迎来到用户空间
      </span>
    </el-header>
    <el-main>
      <!-- 表单 -->
      <el-row>
        <el-col :xs="0" :sm="3" :md="6" :lg="8" style="color:white" v-if="activeindex == 2">.</el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="8" v-if="activeindex == 2">
          <User :user="user" v-if="activeindex == 2"></User>
        </el-col>
        <Profile :user="user" v-if="activeindex == 1"></Profile>
      </el-row>
    </el-main>
    <Endbar></Endbar>
  </el-container>
    </el-container>
  </div>
</template>

<script>
import User from '@/components/User.vue'
import Profile from '@/components/Profile.vue'
import Endbar from '@/components/Endbar.vue'
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'UserPage',
  components: {
    User,
    Profile,
    Endbar
  },
  data () {
    return {
      user: {
        type: Object,
        default: () => {}
      },
      activeindex: 1,
      offsetWid: 1000
    }
  },
  mounted () {
    this.offsetWid = document.documentElement.clientWidth || screen.width
    const that = this
    window.addEventListener('resize', () => {
      that.offsetWid = document.documentElement.clientWidth || screen.width
    })
    this.getUser()
  },
  methods: {
    getUser: function () {
      axios.get('/api/user/').then(ret => {
        this.user = ret.data.user
      }, error => {
        console.log(error)
        alert('服务器忙')
      })
    },
    changeindex: function (index) {
      this.getUser()
      this.activeindex = index
    }
  }
}
</script>

<style lang="less" scoped>
#UserPage {
  height: 100%;
}
.el-container {
  height:100%;
}
.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom:1px solid #ccc;
}
.el-aside {
    color: #333;
    text-align: center;
    height:100%;
    // border-right: darkgray 1px solid;
    box-shadow: lightgray 2px 0 5px 4px;
}
.el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
}
.welcome {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-style: italic;
  font-size: auto;
}
.index {
  text-align: center;
  color:black;
  text-decoration: none;
}
.index :visited{
  color:black;
  text-decoration: none;
}
</style>
