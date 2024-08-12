<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin: 30px 50px">
      <!-- 短信验证码 -->
      <el-row>
        <el-col>
          <el-form-item prop="telCode" :label="fields.telCode" :label-width="labelWidth">
            <el-input ref="telCode" v-model.trim="postForm.telCode" :placeholder="fields.telCode" maxlength="6" style="width: 150px" />
            <el-button :disabled="disable" class="getCode" @click="getTelCode">
              <template v-if="disable">还有{{ countdown }}秒后可再次获取</template>
              <template v-else>获取短信验证码</template>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 新的密码 -->
      <el-row>
        <el-col>
          <el-tooltip v-model="capsTooltip" content="您输入的是大写" placement="right" manual>
            <el-form-item prop="newPwd" :label="`新的${fields.password}`" :label-width="labelWidth">
              <el-input ref="newPwd" v-model.trim="postForm.newPwd" :placeholder="`新的${fields.password}`" show-password maxlength="30" style="width: 340px" @keyup.native="checkCapsLock" @blur="capsTooltip = false" />
            </el-form-item>
          </el-tooltip>
        </el-col>
      </el-row>
      <!-- 确认密码 -->
      <el-row>
        <el-col>
          <el-form-item prop="conPwd" :label="`确认${fields.password}`" :label-width="labelWidth">
            <el-input ref="conPwd" v-model.trim="postForm.conPwd" :placeholder="`确认${fields.password}`" show-password maxlength="30" style="width: 340px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" :disabled="submitLoading" type="primary" @click="submitForm"> 修改登录密码 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields } from '../modules/fields'
import { PasswordRule as rulesForm } from '../modules/rules'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
import { CryptoJsEncode } from '@/libs/cryptojs'
import Cookies from 'js-cookie'
// settings
export default {
  name: 'AccountPassword',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm,
      postForm: {
        telCode: '',
        newPwd: '',
        conPwd: ''
      },
      disable: false, // 按钮禁用开关
      countdown: 60, // 初始化倒计时为60秒
      countTime: null,
      capsTooltip: false
    }
  },
  computed: {
    ...mapGetters(['aid', 'mobile'])
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  created() {
    const countdown = Cookies.get('findCountdownCookie')
    if (countdown < 60 && countdown > 0) {
      this.countdown = countdown
      this.countPlay()
    }
  },
  methods: {
    // 大写时开启提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
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
      this.countdown = 60
      this.countTime = null
      this.disable = false
    },
    // 获取短信验证码
    getTelCode() {
      userApi.getUpdSMS(this.mobile).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success('短信验证码已发达，请在1分钟内进行找回密码')
          this.countPlay()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 修改密码
    submitForm() {
      if (!this.submitLoading) {
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.newPwd === this.postForm.conPwd) {
              this.submitLoadingOpen()
              const newPostForm = {
                telephone: CryptoJsEncode(this.mobile),
                telCode: this.postForm.telCode,
                password: CryptoJsEncode(this.postForm.conPwd)
              }
              userApi
                .find(newPostForm)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success('密码修改成功')
                    this.submitLoadingClose()
                    this.$refs.postForm.resetFields()
                  } else {
                    this.$message.error(msg)
                  }
                })
                .catch(() => {
                  this.submitLoadingClose()
                })
            } else {
              this.$message.error('两次密码不一致')
              this.$refs.conPwd.focus()
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
