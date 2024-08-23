<template>
  <div class="app-container">
    <div style="width: 800px; margin: 50px auto auto">
      <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
        <!-- 手机号码 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="telephone" :label="fields.telephone" :label-width="labelWidth">
              <el-input v-model="postForm.telephone" :placeholder="fields.telephone" maxlength="11" tabindex="1" :style="{ width: commonWidth }" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 密码 -->
        <el-row>
          <el-col>
            <el-tooltip v-model="capsTooltip" :content="capsLock" placement="right" manual>
              <el-form-item class="is-required" prop="password" :label="fields.password" :label-width="labelWidth">
                <el-input v-model="postForm.password" :placeholder="fields.password" type="password" tabindex="2" show-password :style="{ width: commonWidth }" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" />
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>
        <!-- 密码 -->
        <el-row>
          <el-col>
            <el-form-item :label-width="labelWidth">
              <el-button :loading="submitLoading" type="primary" class="submitBtn" @click="submitForm">{{ submitTxt }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields } from '../modules/fields'
import { DetailRules as rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
// settings
export default {
  name: 'UserDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      fields,
      rulesForm,
      capsTooltip: false,
      submitTxt: '创建用户',
      capsLock: '您输入的是大写'
    }
  },
  created() {},
  methods: {
    // 大写时开启提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    // 提交
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            telephone: CryptoJsEncode(this.postForm.telephone),
            password: CryptoJsEncode(this.postForm.password),
            roleId: 2
          }
          userApi
            .create(newForm)
            .then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.routerClose('/user/list')
              } else {
                this.$message.error(msg)
                this.submitLoadingClose()
              }
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
<style lang="scss" scoped></style>
