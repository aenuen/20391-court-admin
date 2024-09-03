<template>
  <div class="theContainer" :style="useBg">
    <div class="logo"></div>
    <div class="title">{{ someText.bigTitle }}</div>
    <el-form ref="postForm" :model="postForm" :rules="formRules" class="postForm" :style="formBg">
      <!-- 标题 -->
      <div class="title-container">
        <div class="formTitle">用户注册</div>
      </div>
      <!-- 手机号码 -->
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" :placeholder="fields.telephone" name="telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" />
      </el-form-item>
      <!-- 短信验证码 -->
      <div class="telCode">
        <el-form-item prop="telCode">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input v-model="postForm.telCode" :placeholder="fields.telCode" name="telCode" type="text" tabindex="2" autocomplete="off" maxlength="6" style="width: 185px" />
        </el-form-item>
        <el-button :disabled="disable" class="getCode" @click="getTelCode">
          <template v-if="disable">还有{{ countdown }}秒后可再次获取</template>
          <template v-else>获取短信验证码</template>
        </el-button>
      </div>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" :content="someText.capsLock" placement="right" manual>
        <el-form-item prop="password" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="postForm.password" :placeholder="fields.password" name="password" :type="passwordType" tabindex="3" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" />
          <span class="showPwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 姓名 -->
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="postForm.name" :placeholder="fields.name" name="name" type="text" tabindex="4" autocomplete="off" maxlength="30" />
      </el-form-item>
      <!-- 身份证号码 -->
      <el-form-item prop="cardNo">
        <span class="svg-container">
          <svg-icon icon-class="id-card" />
        </span>
        <el-input v-model="postForm.cardNo" :placeholder="fields.cardNo" name="cardNo" tabindex="5" autocomplete="off" maxlength="30" />
      </el-form-item>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" class="submitBtn" @click="submitForm"> {{ someText.submitRegister }} </el-button>
      <!-- 链接 -->
      <div class="routerGo">
        <i @click="routerGo('/login')">{{ someText.toLogin }}</i>
        <b @click="routerGo('/find')">{{ someText.toFind }}</b>
      </div>
    </el-form>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields, someText } from './modules/fields'
import { registerRule } from './modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import Bg from './mixins/bg'
// plugins
import { formatMobile } from 'abbott-methods/import'
import { CryptoJsEncode } from '@/libs/cryptojs'
import Cookies from 'js-cookie'
export default {
  name: '',
  components: {},
  mixins: [DetailMixin, MethodsMixin, Bg],
  data() {
    return {
      fields,
      someText,
      formRules: registerRule,
      postForm: { telephone: '' },
      passwordType: 'password',
      disable: false, // 按钮禁用开关
      countdown: 60, // 初始化倒计时为60秒
      countTime: null,
      capsTooltip: false
    }
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  created() {
    const countdown = Cookies.get('registerCountdownCookie')
    if (countdown < 60 && countdown > 0) {
      this.countdown = countdown
      this.countPlay()
    }
  },
  methods: {
    // 开始倒计时
    countPlay() {
      this.disable = true
      this.startCountdown()
    },
    // 开始倒计时函数
    startCountdown() {
      this.countTime = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          Cookies.set('registerCountdownCookie', this.countdown, { expires: this.countdown })
        } else {
          this.clearCountdown()
        }
      }, 1000)
    },
    // 清除倒计时函数
    clearCountdown() {
      clearInterval(this.countTime)
      Cookies.remove('registerCountdownCookie')
      this.countdown = 60
      this.countTime = null
      this.disable = false
    },
    // 打开|关闭显示密码
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
    // 大写时开启提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    // 获取短信验证码
    getTelCode() {
      if (this.postForm.telephone.length > 0) {
        if (formatMobile(this.postForm.telephone)) {
          userApi.getRegSMS(this.postForm.telephone).then(({ code, msg }) => {
            if (code === 200) {
              this.$message.success('短信验证码已发达，请在1分钟内进行找回密码')
              this.countPlay()
            } else {
              this.$message.error(msg)
            }
          })
        } else {
          this.$message.error('请先输入正确的手机号码')
          this.$refs.telephone.focus()
        }
      } else {
        this.$message.error('请先输入手机号码')
        this.$refs.telephone.focus()
      }
    },
    // 开始注册
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        if (valid) {
          this.submitLoadingOpen()
          const newPostForm = {
            telephone: CryptoJsEncode(this.postForm.telephone),
            telCode: this.postForm.telCode,
            password: CryptoJsEncode(this.postForm.password),
            name: this.postForm.name,
            cardNo: CryptoJsEncode(this.postForm.cardNo)
          }
          this.$store
            .dispatch('user/register', newPostForm)
            .then(({ code, msg }) => {
              if (code === 200) {
                this.$message.success('注册成功，请登录……')
                this.routerGo('/login')
              } else {
                this.$message.error(msg)
              }
              this.submitLoadingClose()
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
