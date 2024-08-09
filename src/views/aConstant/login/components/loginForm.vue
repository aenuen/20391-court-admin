<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="手机号码" name="username" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="login" />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="您输入的是大写" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="登录密码" name="password" tabindex="2" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="login" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-form-item style="position: relative">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input ref="code" v-model="loginForm.code" placeholder="验证码" name="code" type="text" autocomplete="off" style="width: 200px" />
        <img class="authCode" :src="authCode" @click="refreshCode" />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="login"> 登录 </el-button>
      <div class="toRegister"><i @click="toRegister">还没有账号?去注册</i><b>忘记密码？</b></div>
    </el-form>
  </div>
</template>

<script>
import { validateUsername, validateRequire } from 'abbott-methods/import'
import { CryptoJsEncode } from '@/libs/cryptojs'
import { apiBaseUrl } from '@/settings'

export default {
  name: 'LoginForm',
  props: {
    loginForm: { type: Object, required: true }
  },
  data() {
    return {
      loginRules: {
        username: [{ validator: validateUsername }],
        password: [
          {
            validator: (rule, value, callback) => validateRequire(rule, value, callback, '密码', 6, 30)
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      authCode: `${apiBaseUrl}/user/getCode`
    }
  },
  mounted() {
    // 自动聚焦
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  methods: {
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
    refreshCode() {
      this.authCode = `${apiBaseUrl}/user/getCode?timestamp=${Date.now()}`
    },
    toRegister() {
      this.$router.push({
        path: 'register'
      })
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const newLoginForm = {
            username: CryptoJsEncode(this.loginForm.username),
            password: CryptoJsEncode(this.loginForm.password)
          }
          this.$store
            .dispatch('user/login', newLoginForm)
            .then(() => {
              this.$emit('loginSubmit')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import url('./total.scss');
</style>

<style lang="scss" scoped>
$dark_gray: #333;
$light_gray: #333;

.login-form {
  position: absolute;
  left: 50%;
  top: 250px;
  width: 520px;
  max-width: 100%;
  padding: 20px 50px;
  margin: 0 auto;
  overflow: hidden;
  margin-left: -260px;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: #333;
  vertical-align: middle;
  width: 15%;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: #333;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}

.authCode {
  position: absolute;
  right: 4px;
  top: 4px;
  cursor: pointer;
}

.toRegister {
  text-align: center;
  i {
    font-size: 14px;
    font-style: normal;
    cursor: pointer;
    color: #333;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
