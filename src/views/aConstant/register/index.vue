<!--
 * @Author: abbott
 * @Date: 2024-08-08 17:36:02
 * @LastEditors: abbott
 * @LastEditTime: 2024-08-09 08:43:25
 * @Description:
-->
<template>
  <div class="theContainer">
    <div class="logo"></div>
    <div class="title">智慧法院电子管理平台</div>
    <el-form ref="postForm" :model="postForm" :rules="formRules" class="postForm">
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" placeholder="手机号码" name="telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" />
      </el-form-item>
      <div class="telCode">
        <el-form-item prop="telCode">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input v-model="postForm.telCode" placeholder="短信验证码" name="telCode" type="text" tabindex="2" autocomplete="off" maxlength="6" style="width: 185px" />
        </el-form-item>
        <el-button :disabled="disable" class="getCode" @click="getTelCode">
          <template v-if="disable">还有{{ countdown }}秒后可再次获取</template>
          <template v-else>获取短信验证码</template>
        </el-button>
      </div>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="postForm.password" placeholder="登录密码" name="password" type="password" tabindex="3" autocomplete="off" maxlength="30" />
      </el-form-item>
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="postForm.name" placeholder="姓名" name="name" type="text" tabindex="4" autocomplete="off" maxlength="30" />
      </el-form-item>
      <el-form-item prop="cardNo">
        <span class="svg-container">
          <svg-icon icon-class="id-card" />
        </span>
        <el-input v-model="postForm.cardNo" placeholder="身份证号码" name="cardNo" tabindex="5" autocomplete="off" maxlength="30" />
      </el-form-item>
      <el-button :loading="submitLoading" type="primary" style="width: 100%; margin-bottom: 30px" @click="submitForm"> 注册 </el-button>
      <div class="routerGo"><i @click="routerGo('/login')">已有账号，去登录</i><b @click="routerGo('/forget')">忘记密码？</b></div>
    </el-form>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { validateMobile, validateRequire, validateAllCn, validateIdCard, validateErrMsg, formatMobile } from 'abbott-methods/import'
import { CryptoJsEncode } from '@/libs/cryptojs'
import Cookies from 'js-cookie'
export default {
  name: '',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      formRules: {
        telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
        telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '短信验证码', '填写', 6, 6) }],
        password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '密码', '填写', 6, 30) }],
        name: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, '姓名') }],
        cardNo: [{ validator: (rule, value, callback) => validateIdCard(rule, value, callback) }]
      },
      postForm: {
        telephone: '13055297726',
        password: 'ee123123',
        name: '石志辉',
        cardNo: '350583198306167132',
        code: '12345'
      },
      disable: false, // 按钮禁用开关
      countdown: 60, // 初始化倒计时为60秒
      countTime: null
    }
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  created() {
    const countdown = Cookies.get('countdown')
    if (countdown < 60 && countdown > 0) {
      this.countdown = countdown
      this.countPlay()
    }
  },
  methods: {
    countPlay() {
      this.disable = true
      this.startCountdown()
    },
    // 开始倒计时函数
    startCountdown() {
      this.countTime = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          Cookies.set('countdown', this.countdown)
        } else {
          this.clearCountdown()
        }
      }, 1000)
    },
    // 清除倒计时函数
    clearCountdown() {
      clearInterval(this.countTime)
      Cookies.remove('countdown')
      this.countdown = 60
      this.countTime = null
      this.disable = false
    },
    // 获取短信验证码
    getTelCode() {
      if (this.postForm.telephone.length === 0) {
        this.$message.error('请先输入手机号码')
        this.$refs.telephone.focus()
      } else if (formatMobile(this.postForm.telephone)) {
        this.countPlay()
        userApi.getRegSMS(this.postForm.telephone).then(({ code, msg }) => {
          if (code === 200) {
            this.$message.success('短信验证码已发达，请在1分钟内进行注册')
            this.startCountdown()
          } else {
            this.$message.error(msg)
          }
        })
      } else {
        this.$message.error('请先输入正确的手机号码')
        this.$refs.telephone.focus()
      }
    },
    // 开始注册
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        if (valid) {
          this.submitLoading = true
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
              this.submitLoading = false
            })
            .catch(() => {
              this.submitLoading = false
            })
        } else {
          const msg = validateErrMsg(fields)
          this.$message.error(msg)
          this.submitLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import url('./adjust.scss');
</style>
<style lang="scss" scoped>
@import url('./index.scss');
</style>
