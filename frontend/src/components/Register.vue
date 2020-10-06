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
          <el-input prefix-icon="el-icon-user" v-model="username" placeholder="请输入您的用户名"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="password" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="secondpassword" placeholder="请确认您的密码"></el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item>
          <el-input prefix-icon="el-icon-s-promotion" v-model="email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item>
          <el-input prefix-icon="el-icon-phone" v-model="phonenumber" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="logbtn">
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      phonenumber: '',
      secondpassword: ''
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
  height: 600px;
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
  top: 100px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
