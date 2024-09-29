<template>
  <div class="theContainer" :style="useBg">
    <div class="logo"></div>
    <div class="title">{{ bigTitle }}</div>
    <el-form ref="postForm" :model="postForm" :rules="formRules" class="postForm" :style="formBg">
      <!-- 标题 -->
      <div class="title-container">
        <div class="formTitle">{{ userRoles }}登录</div>
      </div>
      <!-- 手机号码 -->
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" :placeholder="fields.telephone" name="telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="submitForm" />
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" :content="someText.capsLock" placement="right" manual>
        <el-form-item prop="password" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <el-input ref="password" v-model="postForm.password" :type="passwordType" :placeholder="fields.password" name="password" tabindex="2" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="submitForm" />
          <span class="showPwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 验证码 -->
      <el-form-item prop="code" style="position: relative">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input ref="code" v-model="postForm.code" type="text" :placeholder="fields.authCode" name="code" tabindex="3" autocomplete="off" style="width: 200px; ime-mode: disabled" maxlength="6" @keyup.enter.native="submitForm" />
        <div class="authCode">
          <el-image :src="authCode" lazy @click="refreshCode" />
        </div>
      </el-form-item>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" class="submitBtn" @click="submitForm"> {{ someText.submitLogin }} </el-button>
      <!-- 链接 -->
      <div v-if="+nowType === 1" class="routerGo">
        <i @click="routerGo('/register')">{{ someText.toRegister }}</i>
        <b @click="routerGo('/find')">{{ someText.toFind }}</b>
      </div>
      <div v-else class="routerGo2">
        <b @click="routerGo('/find')">{{ someText.toFind }}</b>
      </div>
    </el-form>
  </div>
</template>
<script>
// api
// components
// data
import { fields, someText } from './modules/fields'
import { loginRule } from './modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Bg from './mixins/bg'
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
import { v4 as uuidV4 } from 'uuid'
import { holdNumber, holdLetterNumber } from 'abbott-methods/import'
// settings
import { apiBaseUrl } from '@/settings'
export default {
  name: 'LoginIndex',
  components: {},
  mixins: [DetailMixin, MethodsMixin, Bg],
  data() {
    return {
      fields,
      someText,
      formRules: loginRule,
      postForm: { telephone: '' },
      passwordType: 'password',
      capsTooltip: false,
      userRoles: '',
      otherQuery: {},
      uuid: '',
      authCode: ''
    }
  },
  computed: {
    formBg() {
      return {
        backgroundColor: +this.nowType === 2 || +this.nowType === 3 || +this.nowType === 4 ? '#fff' : 'none',
        borderRadius: '20px'
      }
    }
  },
  watch: {
    'postForm.telephone': function (value) {
      this.postForm.telephone = holdNumber(value)
    },
    'postForm.code': function (value) {
      this.postForm.code = holdLetterNumber(value)
    }
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    // 大写提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    // 显示|加密密码
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
    // 刷新验证码
    refreshCode() {
      this.uuid = uuidV4()
      this.authCode = `${apiBaseUrl}/user/getCode?codeId=${this.uuid}&timestamp=${Date.now()}`
    },
    // 登录跳转
    loginSubmit() {
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    },
    // 登录
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newPostForm = {
            codeId: this.uuid,
            telephone: CryptoJsEncode(this.postForm.telephone),
            password: CryptoJsEncode(this.postForm.password),
            code: this.postForm.code
          }
          this.$store
            .dispatch('user/login', newPostForm)
            .then(() => {
              this.submitLoadingClose()
              this.loginSubmit()
            })
            .catch(() => {
              this.refreshCode() // 刷新验证码
              this.submitLoadingClose()
            })
        } else {
          this.validateErrHandle(fields)
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import './styles/adjust.scss';
</style>
<style lang="scss" scoped>
@import './styles/common.scss';
</style>
