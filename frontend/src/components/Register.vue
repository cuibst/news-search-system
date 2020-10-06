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
          <el-input v-if="username_valid===false" prefix-icon="el-icon-user" v-model="username" placeholder="请输入您的用户名"></el-input>
          <el-input v-if="username_valid" prefix-icon="el-icon-user" suffix-icon="el-icon-check" v-model="username" placeholder="请输入您的用户名"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="password" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item>
          <el-input prefix-icon="el-icon-view" show-password v-model="secondpassword" placeholder="请确认您的密码"></el-input>
          <span v-if="passwordcheck===false" style="color: red">请输入相同密码!</span>
        </el-form-item>
        <!--邮箱-->
        <el-form-item>
          <el-input v-if="email_valid===false" prefix-icon="el-icon-s-promotion" v-model="email" placeholder="请输入您的邮箱"></el-input>
          <el-input v-if="email_valid" suffix-icon="el-icon-check" prefix-icon="el-icon-s-promotion" v-model="email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item>
          <el-input v-if="phonenumber_valid===false" prefix-icon="el-icon-phone" v-model="phonenumber" placeholder="请输入您的手机号"></el-input>
          <el-input v-if="phonenumber_valid" prefix-icon="el-icon-phone" suffix-icon="el-icon-check" v-model="phonenumber" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="logbtn">
          <el-button type="primary" :disabled="phonenumber_valid === false">注册</el-button>
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
      secondpassword: '',
      username_valid: false,
      passwordcheck: false,
      email_valid: false,
      phonenumber_valid: false
    }
  },
  watch: {
    username: {
      handler (newName) {
        this.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    },
    secondpassword: {
      handler () {
        this.passwordcheck = (this.password === this.secondpassword)
      }
    },
    email: {
      handler (newEmail) {
        this.email_valid = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/.test(newEmail)
      }
    },
    phonenumber: {
      handler (newPhoneNumber) {
        this.phonenumber_valid = /^[1][3,4,5,7,8][0-9]{9}$/.test(newPhoneNumber)
      }
    }
  },
  computed: {
    total_valid: function () {
      return this.username_valid && this.phonenumber_valid && this.email_valid && this.passwordcheck
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
  width: 90%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
