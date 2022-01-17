<template>
  <div class="content">
    <el-card class="content-card">
      <div slot="header" class="clearfix">
        <span v-if="isLogin">登录</span>
        <span v-else>注册</span>
        <el-button
          style="float: right; padding: 3px 0;"
          type="text"
          v-if="isLogin"
          @click="gotoCard(false)"
        >
          去注册
        </el-button>
        <el-button
          style="float: right; padding: 3px 0;"
          type="text"
          v-else
          @click="gotoCard(true)"
        >
          去登录
        </el-button>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
        v-show="isLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">
            登录
          </el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="100px"
        class="registerForm"
        v-show="!isLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input v-model="registerForm.checkpassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">
            注册
          </el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkpassword !== '') {
          this.$refs.registerForm.validateField('checkpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
      registerForm: {
        username: '',
        password: '',
        checkpassword: '',
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        checkpassword: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    gotoCard(isLogin) {
      this.isLogin = isLogin
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goHome() {
      this.$router.push({ path: 'home' })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.content-card {
  width: 500px;
}
</style>
