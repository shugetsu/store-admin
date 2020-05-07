<template>
  <div id="login">
    <a-form-model ref="form" :model="formData" :rules="formRules" class="login-form" labelAlign="left" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-model-item label="账   号" prop="userName" hasFeedback>
        <a-input v-model="formData.userName" placeholder="输入账号" @keyup.enter.native="onClickLogin">
          <a-icon slot="prefix" type="user" class="login-form-icon" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="密   码" prop="password" hasFeedback>
        <a-input-password v-model="formData.password" placeholder="输入密码" @keyup.enter.native="onClickLogin">
          <a-icon slot="prefix" type="lock" class="login-form-icon" />
        </a-input-password>
      </a-form-model-item>

      <a-form-model-item label="验证码" prop="captcha" hasFeedback>
        <a-input v-model="formData.captcha" placeholder="输入验证码" class="login-form-code" @keyup.enter.native="onClickLogin">
          <a-icon slot="prefix" type="safety-certificate" class="login-form-icon" />
        </a-input>
        <div class="login-form-verify" @click="refreshCaptcha">
          <img class="login-form-verify-img" :src="captchaImgUrl" />
        </div>
      </a-form-model-item>

      <div class="login-form-remember">
        <a-checkbox v-model="formData.remember">记住账号</a-checkbox>
      </div>

      <div class="login-form-button">
        <a-button type="primary" size="large" block :shape="IsLoadingLogin ? 'circle' : 'round'" @click="onClickLogin" :loading="IsLoadingLogin">{{ IsLoadingLogin ? '' : '登录' }}</a-button>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import md5 from 'js-md5'

export default {
  data () {
    return {
      captchaImgUrl: '',
      formData: {
        userName: '',
        password: '',
        captcha: ''
      },
      formRules: {
        userName: { required: true, whitespace: true, message: '请输入账号', trigger: ['change', 'blur'] },
        password: [{ required: true, whitespace: true, message: '请输入密码', trigger: ['change', 'blur'] }, { min: 6, message: '密码不能少于6个字符' } ],
        captcha: [{ required: true, whitespace: true, message: '请输入验证码', trigger: ['change', 'blur'] }, { len: 4, message: '验证码为4个字符' }],
      }
    }
  },
  computed: {
    ...mapState({
      IsLoadingLogin: state => state.User.IsLoadingLogin
    })
  },
  created () {
    this.refreshCaptcha()
  },
  methods: {
    ...mapActions({
      'Login': 'User/Login'
    }),
    // 刷新验证码图片
    refreshCaptcha () {
      this.captchaImgUrl = 'http://127.0.0.1:7001/api/admin/v1/common/captcha?v=' + Date.now()
    },
    // 点击登录
    onClickLogin () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const userName = md5(this.formData.userName)
          const password = md5(this.formData.password)
          const captcha = this.formData.captcha
          this.Login({ userName, password, captcha }).then(res => {
            if (res.code === 200) {
              this.$message.success('登录成功')
              this.$router.push('/')
            } else {
              this.formData.captcha = ''
              this.formData.password = ''
              this.refreshCaptcha()
              this.$refs['form'].clearValidate(['password', 'captcha'])
            }1
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#login { display: flex; justify-content: center; align-items: center; height: 100%; background: url('~@/assets/images/login-bg.jpg') no-repeat; background-size: cover; }
.login-form { width: 400px; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
.login-form-remember { margin-bottom: 20px; }
.login-form-button { text-align: center; }
.login-form-icon { color: rgba(0, 0, 0, 0.25); }
.login-form-code { width: 160px; }
.login-form-verify { width: 80px; height: 32px; line-height: 32px; margin: 3px 0; display: block; text-align: center; cursor: pointer; float: right; background: #fafbfc; position: relative; overflow: hidden; }
.login-form-verify-img { width: 82px; height: 34px; display: block; top: -1px; left: -1px; }
</style>
