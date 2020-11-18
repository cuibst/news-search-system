<template>
  <div class="login_container">
    <div class="left">
      <img src="https://passport.baidu.com/static/passpc-account/img/reg_bg_min.jpg" class="back">
    </div>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 表单 -->
      <el-form class="login-form">
        <!--用户名-->
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="username" placeholder="请输入您的用户名"></el-input>
        </el-form-item>
        <br>
        <!--密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="password" placeholder="请输入您的密码" class="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <br>
        <br>
        <el-form-item style="text-align:center">
          <el-button type="primary"  round @click="sendlogin" class="logbtn">登 录</el-button>
        </el-form-item>
        <div class="for-regist">
          还没有账户？<a href='#/register'>注册</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    sendlogin () {
      axios.post('/api/login/', {
        username: this.username,
        password: this.password
      }).then(ret => {
        if (ret.data.code === 200) {
          this.$store.commit('set_token', { token: ret.data.Token, username: this.username })
          this.$message.success('登陆成功')
          this.$emit('succeed')
        } else {
          this.password = ''
          this.$message.error('错误的用户名或密码')
        }
      }, error => {
        console.log(error)
        this.$message.error('网络连接错误')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.login_container {
  height: 100%;
  background-color:aliceblue;
}

.left{
  float: left;
  width: 100%;
  height: 100%;
  left: 0.1%;
  position: relative;
  display: block;
}

.back{
  height: 100%;
  width: 100%;
}

.login_box {
  width: 340px;
  height: 540px;
  background-color: rgba(255,255,255,.9);
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-30%,-50%);
  .avatar_box{
    height: 22%;
    width: 40%;
    background-color: aliceblue;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,40%);
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
  width: 50%;
  transform: translate(0,-100%);
}

.login-form {
  position: absolute;
  top: 45%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

/deep/ .el-input__inner{
          height: 45px;
        }

.for-regist {
  margin-right : 1pc;
  display: flex;
  justify-content: flex-end;
  transform: translate(10%,30%);
}

.password{
  transform: translate(0,-30%);
}
</style>
