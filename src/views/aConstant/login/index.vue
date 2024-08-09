<template>
  <div class="theContainer">
    <div class="logo"></div>
    <div class="title">智慧法院电子管理平台</div>
    <el-form ref="postForm" :model="postForm" :rules="formRules" class="postForm">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" placeholder="手机号码" name="telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="login" />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="您输入的是大写" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <el-input ref="password" v-model="postForm.password" :type="passwordType" placeholder="登录密码" name="password" tabindex="2" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="login" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-form-item style="position: relative">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input ref="code" v-model="postForm.code" placeholder="验证码" name="code" type="text" autocomplete="off" style="width: 200px" />
        <img class="authCode" :src="authCode" @click="refreshCode" />
      </el-form-item>
      <el-button :loading="submitLoading" type="primary" style="width: 100%; margin-bottom: 30px" @click="submitForm"> 登录 </el-button>
      <div class="routerGo"><i @click="routerGo('/register')">已有账号，去登录</i><b @click="routerGo('/forget')">忘记密码？</b></div>
    </el-form>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
import { validateMobile, validateRequire } from 'abbott-methods/import'
// settings
import { apiBaseUrl } from '@/settings'
export default {
  name: '',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      formRules: {
        telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
        password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '密码', '填写', 6, 30) }]
      },
      postForm: {
        telephone: 13055297726,
        password: 'ee123123'
      },
      passwordType: 'password',
      capsTooltip: false,
      otherQuery: {},
      authCode: `${apiBaseUrl}/user/getCode`
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
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
    submitForm() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const newPostForm = {
            telephone: CryptoJsEncode(this.postForm.telephone),
            password: CryptoJsEncode(this.postForm.password),
            code: this.postForm.code
          }
          this.$store
            .dispatch('user/login', newPostForm)
            .then(() => {
              this.submitLoading = false
            })
            .catch(() => {
              this.submitLoading = false
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
@import url('../register/adjust.scss');
</style>
<style lang="scss" scoped>
@import url('../register/index.scss');
</style>
