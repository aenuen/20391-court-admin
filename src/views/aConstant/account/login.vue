<template>
  <div class="theContainer">
    <div class="logo"></div>
    <div class="title">{{ someText.bigTitle }}</div>
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
        <el-input ref="code" v-model="postForm.code" type="text" :placeholder="fields.authCode" name="code" tabindex="3" autocomplete="off" style="width: 200px; ime-mode: disabled" @keyup.enter.native="submitForm" />
        <div class="authCode">
          <el-image :src="authCode" lazy @click="refreshCode" />
        </div>
      </el-form-item>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" class="submitBtn" @click="submitForm"> {{ someText.submitLogin }} </el-button>
      <!-- 链接 -->
      <div class="routerGo">
        <i @click="routerGo('/register')">{{ someText.toRegister }}</i>
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
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
import { v4 as uuidV4 } from 'uuid'
import {} from 'abbott-methods/import'
// settings
import { apiBaseUrl } from '@/settings'
export default {
  name: 'LoginIndex',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      fields,
      someText,
      formRules: loginRule,
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
    // 获取其它参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    },
    // 登录
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        if (valid) {
          this.submitLoadingOpen()
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
