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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone" @input="getKaptcha(loginForm)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="loginForm.code"></el-input>
        </el-form-item>
        <el-form-item  @click="getKaptcha(loginForm)">
          <img :src="kaptcha.image" />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitLoginForm('loginForm')"
            :loading="loginBtnLoading"
          >
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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"  @input="getKaptcha(registerForm)"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input
            v-model="registerForm.checkpassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="registerForm.code"></el-input>
        </el-form-item>
        <el-form-item  @click="getKaptcha(registerForm)">
          <img :src="kaptcha.image" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitRegisterForm('registerForm')"
            :loading="registerBtnLoading"
          >
            注册
          </el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ADD_ID, ADD_NAME, ADD_PHONE, ADD_TOKEN } from '@/store/types'

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
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      kaptcha: {
        kaptchaImg: '',
        key: '',
      },
      isLogin: true,
      loginBtnLoading: false,
      registerBtnLoading: false,
      loginForm: {
        phone: '13715752551',
        password: '123',
        code: '',
      },
      loginRules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
      },
      registerForm: {
        name: 'fur',
        phone: '13715752552',
        password: '123',
        checkpassword: '123',
        code: '',
      },
      registerRules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        checkpassword: [
          { validator: validatePass2, trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.getKaptcha(this.loginForm)
    this.getKaptcha(this.registerForm)
  },
  methods: {
    gotoCard(isLogin) {
      this.isLogin = isLogin
    },
    getKaptcha(form) {
        console.log(form)
      if (form.phone.length === 11) {
        this.$http.get(`/captcha/kaptcha?phone=${form.phone}`).then((res) => {
          this.kaptcha = res.data.data
        })
      }
    },
    async submitRegisterForm(formName) {
      this.registerBtnLoading = false
      this.registerForm.key = this.kaptcha.key
      let check = await this.$http.post(
        '/captcha/checkCaptcha',
        this.registerForm,
      )
      if (check.data.data === '验证码过期') {
        this.$message({
          type: 'error',
          message: '验证码过期或输入错误',
        })
        this.getKaptcha(this.registerForm)
        this.loginBtnLoading = false
        return
      }
      if (check.data.data === '验证码错误') {
        this.$message({
          type: 'error',
          message: '验证码错误',
        })
        this.getKaptcha(this.registerForm)
        this.loginBtnLoading = false
        return
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post(
            '/web_blog/user/saveUser',
            this.registerForm,
          )
          console.log(res)
          if (res.data.code === 0) {
            //   注册后直接登录
            this.isLogin = true
            // this.loginForm.phone = this.registerForm.phone
            // this.loginForm.password = this.registerForm.password
            // this.submitLoginForm('loginForm')
            // this.goHome()
            this.registerBtnLoading = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
            })
            this.registerBtnLoading = false
          }
        }
      })
    },
    async submitLoginForm(formName) {
      this.loginBtnLoading = true
      this.loginForm.key = this.kaptcha.key
      let check = await this.$http.post('/captcha/checkCaptcha', this.loginForm)
      console.log(check.data.data)
      if (check.data.data === '验证码过期') {
        this.$message({
          type: 'error',
          message: '验证码过期',
        })
        this.getKaptcha(this.loginForm)
        this.loginBtnLoading = false
        return
      }
      if (check.data.data === '验证码错误') {
        this.$message({
          type: 'error',
          message: '验证码错误',
        })
        this.getKaptcha(this.loginForm)
        this.loginBtnLoading = false
        return
      }
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/login/checkLogin', this.loginForm)
          if (res.data.code === 0) {
            this.setUserLocal(res.data.data)
            this.goHome()
            this.loginBtnLoading = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
            })
            this.loginBtnLoading = false
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setUserLocal(user) {
      const { token, phone, id, name } = user
      this.$store.commit(ADD_TOKEN, token)
      this.$store.commit(ADD_PHONE, phone)
      this.$store.commit(ADD_ID, id)
      this.$store.commit(ADD_NAME, name)
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
