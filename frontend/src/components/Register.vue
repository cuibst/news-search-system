<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="welcome">
        欢迎注册
        <div class="for-regist">
          已有账户？<a href='#/login'>登录</a>
        </div>
      </div>
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 表单 -->
      <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form">
        <!--用户名-->
        <el-form-item prop = 'username'>
          <el-input class="input" prefix-icon="el-icon-user" v-model="ruleForm.username" placeholder="请输入您的用户名"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop = 'password'>
          <el-input class="input" prefix-icon="el-icon-view" show-password v-model="ruleForm.password" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop = 'passwordCheck'>
          <el-input class="input" prefix-icon="el-icon-view" show-password v-model="ruleForm.passwordCheck" placeholder="请确认您的密码">
            <i class="el-icon-check" slot="append" v-if="passwordcheck"></i>
          </el-input>
          <span v-if="passwordcheck===false && password_input" style="color: red;font-size:12px;" class="errorPassword">请输入相同密码!</span>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop = 'email'>
          <el-input class="input" prefix-icon="el-icon-s-promotion" v-model="ruleForm.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item prop = 'phonenumber'>
          <el-input class="input" prefix-icon="el-icon-phone" v-model="ruleForm.phonenumber" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="logbtn">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'Register',
  data () {
    var _that = this
    var validatePass = function (rule, value, callback) {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== _that.ruleForm.password) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        return callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else if (!(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/.test(value))) {
        callback(new Error('请输入正确的邮箱格式!'))
      } else {
        callback()
      }
    }
    var validatePhonenumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('电话号码不能为空'))
      } else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码格式!'))
      } else {
        callback()
      }
    }
    return {
      passwordcheck: false,
      password_input: false,
      ruleForm: {
        username: '',
        password: '',
        email: '',
        phonenumber: '',
        passwordCheck: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        passwordCheck: [
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        phonenumber: [
          { validator: validatePhonenumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/register/', {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            email: this.ruleForm.email,
            phonenumber: this.ruleForm.phonenumber
          }).then(ret => {
            if (ret.data.code === 200) {
              window.document.cookie = 'user=' + this.ruleForm.username + ';'
              this.$message.success('注册成功')
              document.location = '/#/login'
            } else if (ret.data.code === 401) {
              this.$refs[formName].resetFields()
              this.$message.error('账号已被注册')
            } else {
              this.$refs[formName].resetFields()
              this.$message.error('信息核验失败')
            }
          }, error => {
            console.log(error)
            this.$message.error('网络连接错误')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
@import '../common/font/font.css';
.login_container {
  background-color: #66CCFF;
  height: 100%;
  background-image:url("../assets/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-size: contain;
  -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
  -o-background-size: cover;/* 兼容Opera */
}

.login_box {
  width: 340px;
  height: 800px;
  background-color: rgba(255,255,255,.9);
  border-radius: 30px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-30%,-50%);
  .avatar_box{
    height: 22%;
    width: 50%;
    background-color: aliceblue;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,30%);
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
  transform: translate(0,60%);
}

.login-form {
  position: absolute;
  top: 45%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.welcome{
  font-family: "pingfang";
  font-size: 30px;
  transform: translate(5%,50%);
  font-weight:bold
}

.for-regist{
  font-size: 15px;
}
</style>
