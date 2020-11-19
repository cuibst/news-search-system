<template>
  <div class="user_container">
      <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="user-form" label-width = "80px">
        <!--用户名-->
        <el-form-item prop = 'username' label = '用户名'>
           <el-input class="input" prefix-icon="el-icon-user" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <!--新的密码-->
        <el-form-item prop = 'password' label = '修改密码'>
          <el-input class="input" prefix-icon="el-icon-view" show-password v-model="ruleForm.password" placeholder="请输入新的密码（不修改请留空）"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop = 'passwordCheck' label = '确认密码'>
          <el-input class="input" prefix-icon="el-icon-view" show-password v-model="ruleForm.passwordCheck" placeholder="请确认您的新密码">
            <i class="el-icon-check" slot="append" v-if="passwordcheck"></i>
          </el-input>
          <span v-if="passwordcheck===false && password_input" style="color: red;font-size:12px;" class="errorPassword">请输入相同密码!</span>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop = 'email' label = '电子邮箱'>
          <el-input class="input" prefix-icon="el-icon-s-promotion" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item prop = 'phonenumber' label = '电话号码'>
          <el-input class="input" prefix-icon="el-icon-phone" v-model="ruleForm.phonenumber"></el-input>
        </el-form-item>
        <!--旧密码-->
        <el-form-item prop = 'oldpasswd' label = '原有密码'>
          <el-input class="input" prefix-icon="el-icon-view" show-password v-model="ruleForm.oldpasswd" placeholder="请输入原有密码"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="logbtn">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios'
// import '@/mock/index'
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    var _that = this
    var validatePass = function (rule, value, callback) {
      if (value !== _that.ruleForm.password) {
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
          { required: false, message: '请输入新的密码', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不超过20个字符', trigger: 'blur' }
        ],
        passwordCheck: [
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        phonenumber: [
          { validator: validatePhonenumber, trigger: 'blur' }
        ],
        oldpasswd: [
          { required: true, message: '请输入您原先的密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    user (to, from) {
      this.getback()
    }
  },
  methods: {
    getback () {
      this.ruleForm.username = this.user.username
      this.ruleForm.email = this.user.email
      this.ruleForm.phonenumber = this.user.phonenumber
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/userchange/', {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            email: this.ruleForm.email,
            phonenumber: this.ruleForm.phonenumber,
            oldpasswd: this.ruleForm.oldpasswd
          }).then(ret => {
            if (ret.data.code === 200) {
              this.$store.commit('set_token', { token: this.$store.state.token, username: this.ruleForm.username })
              this.$message.success('信息更改成功')
            } else if (ret.data.code === 401) {
              this.$refs[formName].resetFields()
              this.$message.error('新用户名已被使用')
              this.getback()
            } else {
              this.$refs[formName].resetFields()
              this.$message.error('信息核验失败')
              this.getback()
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
.user_container {
 margin-top: 5pc;
 height:100%;
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

.user-form {
  margin-top: 10px;
  margin-left: 10px;
  box-sizing: border-box;
}

</style>
