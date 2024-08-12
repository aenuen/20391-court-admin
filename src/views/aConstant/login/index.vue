<template>
  <div class="theContainer">
    <div class="logo"></div>
    <div class="title">智慧法院电子管理平台</div>
    <el-form ref="postForm" :model="postForm" :rules="formRules" class="postForm">
      <!-- 标题 -->
      <div class="title-container">
        <div class="formTitle">用户登录</div>
      </div>
      <!-- 手机号码 -->
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" placeholder="手机号码" name="telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="submitForm" />
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" content="您输入的是大写" placement="right" manual>
        <el-form-item prop="password" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <el-input ref="password" v-model="postForm.password" :type="passwordType" placeholder="登录密码" name="password" tabindex="2" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="submitForm" />
          <span class="showPwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 验证码 -->
      <el-form-item style="position: relative">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input ref="code" v-model="postForm.code" type="text" placeholder="验证码" name="code" tabindex="3" autocomplete="off" style="width: 200px" @keyup.enter.native="submitForm" />
        <div class="authCode">
          <el-image :src="authCode" lazy />
        </div>
      </el-form-item>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" style="width: 100%; margin-bottom: 30px" @click="submitForm"> 登录 </el-button>
      <!-- 链接 -->
      <div class="routerGo"><i @click="routerGo('/register')">还没账号？去注册</i><b @click="routerGo('/find')">忘记密码？</b></div>
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
import { v4 as uuidV4 } from 'uuid'
// settings
import { apiBaseUrl } from '@/settings'
export default {
  name: 'LoginIndex',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      formRules: {
        telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
        password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '密码', '填写', 6, 30) }]
      },
      postForm: { telephone: '' },
      passwordType: 'password',
      capsTooltip: false,
      otherQuery: {},
      uuid: '',
      authCode: ''
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
  created() {
    this.refreshCode()
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
      this.uuid = uuidV4()
      this.authCode = `${apiBaseUrl}/user/getCode?codeId=${this.uuid}&timestamp=${Date.now()}`
    },
    toRegister() {
      this.$router.push({
        path: 'register'
      })
    },
    loginSubmit() {
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    },
    submitForm() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const newPostForm = {
            codeId: this.uuid,
            telephone: CryptoJsEncode(this.postForm.telephone),
            password: CryptoJsEncode(this.postForm.password),
            code: this.postForm.code
          }
          this.$store
            .dispatch('user/login', newPostForm)
            .then(() => {
              this.submitLoading = false
              this.loginSubmit()
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
@import '../register/css/adjust.scss';
</style>
<style lang="scss" scoped>
@import '../register/css/common.scss';
</style>
