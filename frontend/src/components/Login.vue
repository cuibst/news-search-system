<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 表单 -->
      <el-form class="login-form">
        <!--用户名-->
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="logbtn">
          <el-button type="primary" @click="sendlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  data () {
    return {
      username: '',
      password: '',
      lastURL: '/home'
    }
  },
  methods: {
    sendlogin () {
      axios.post('/api/login/', {
        username: this.username,
        password: this.password
      }).then(ret => {
        console.log(ret)
        if (ret.data.code === 200) {
          window.sessionStorage.setItem('token', ret.data.Token)
          this.$message.success('登陆成功')
          document.location = '/#/sample'
        } else {
          this.password = ''
          this.$message.error('其他错误')
        }
      }, error => {
        if (error.response.status === 404) {
          this.$message.error('网络连接错误')
        } else if (error.response.status === 401) {
          this.password = ''
          this.$message.error('错误的用户名或密码')
        } else {
          this.password = ''
          this.$message.error('危险的访问')
        }
      })
    }
  },
  route: {
    canActivate (transition) {
      this.lastURL = transition.from.path
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.login_container {
  background-color: #66CCFF;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: aliceblue;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatar_box{
    height: 130px;
    width: 130px;
    background-color: aliceblue;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: gray;
    }
  }
}

.header {
  position: absolute;
  left: 50%;
  top: 20%;
}

.logbtn {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
