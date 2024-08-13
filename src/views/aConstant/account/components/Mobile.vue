<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin: 30px 50px">
      <!-- 手机号码 -->
      <el-row>
        <el-col>
          <el-form-item :label="fields.oldMobile" :label-width="labelWidth">
            {{ mobile }}
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 新手机号码 -->
      <el-row>
        <el-col>
          <el-form-item prop="newMobile" :label="fields.newMobile" :label-width="labelWidth">
            <el-input ref="newMobile" v-model="postForm.newMobile" :placeholder="fields.newMobile" type="text" tabindex="1" autocomplete="off" maxlength="11" style="width: 340px" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 短信验证码 -->
      <el-row>
        <el-col>
          <el-form-item prop="telCode" :label="fields.telCode" :label-width="labelWidth">
            <el-input ref="telCode" v-model.trim="postForm.telCode" :placeholder="fields.telCode" maxlength="6" tabindex="2" style="width: 150px" />
            <el-button :disabled="disable" class="getCode" @click="getTelCode">
              <template v-if="disable">还有{{ countdown }}秒后可再次获取</template>
              <template v-else>获取短信验证码</template>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 按钮 -->
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitForm"> 更换手机号码 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields, cdTotalTime } from '../modules/fields'
import { MobileRule as rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
import { formatMobile } from 'abbott-methods/import'
import Cookies from 'js-cookie'
import { CryptoJsEncode } from '@/libs/cryptojs'
// settings
export default {
  name: 'AccountMobile',
  components: {},
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm,
      postForm: {
        newMobile: '',
        telCode: ''
      },
      disable: false, // 按钮禁用开关
      countdown: cdTotalTime, // 初始化倒计时为60秒
      countTime: null
    }
  },
  computed: {
    ...mapGetters(['aid', 'mobile'])
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  created() {
    // 读取cookie，查看是否还在倒计时
    const countdown = Cookies.get('findCountdownCookie')
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
          Cookies.set('findCountdownCookie', this.countdown, { expires: this.countdown })
        } else {
          this.clearCountdown()
        }
      }, 1000)
    },
    // 清除倒计时函数
    clearCountdown() {
      clearInterval(this.countTime)
      Cookies.remove('findCountdownCookie')
      this.countdown = cdTotalTime
      this.countTime = null
      this.disable = false
    },
    // 获取短信验证码
    getTelCode() {
      if (this.postForm.newMobile.length > 0) {
        if (formatMobile(this.postForm.newMobile)) {
          if (this.mobile === this.postForm.newMobile) {
            this.$message.warning('手机号码一致，无需更换……')
            this.$refs.newMobile.focus()
          } else {
            userApi.getTelSMS(this.postForm.newMobile).then(({ code, msg }) => {
              if (code === 200) {
                this.$message.success('短信验证码已发达，请在1分钟内进行找回密码')
                this.countPlay()
              } else {
                this.$message.error(msg)
              }
            })
          }
        } else {
          this.$message.error('请先输入正确的手机号码')
          this.$refs.newMobile.focus()
        }
      } else {
        this.$message.error('请先输入手机号码')
        this.$refs.newMobile.focus()
      }
    },
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 更换手机号码
    submitForm() {
      if (!this.submitLoading) {
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.mobile === this.postForm.newMobile) {
              this.$message.warning('手机号码一致，无需更换……')
              this.$refs.newMobile.focus()
            } else {
              const data = {
                userId: this.aid,
                telCode: this.postForm.telCode,
                telephone: CryptoJsEncode(this.postForm.newMobile)
              }
              userApi
                .baseData(data)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success('手机号码更换成功,请重新登录…')
                    this.submitLoadingClose()
                    this.$refs.postForm.resetFields()
                    this.logout()
                  } else {
                    this.$message.error(msg)
                  }
                })
                .catch(() => {
                  this.submitLoadingClose()
                })
            }
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.getCode {
  width: 180px;
  height: 38px;
  margin-left: 10px;
}
</style>
