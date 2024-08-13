<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" :placeholder="fields.realName" maxlength="10" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="cardNo" :label="fields.cardNo" :label-width="labelWidth">
            <el-input v-model.trim="postForm.cardNo" :placeholder="fields.cardNo" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" type="primary" @click="submitAction"> 修改基本资料 </el-button>
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
import { BaseDataRule as rulesForm } from '../modules/rules'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
import { CryptoJsEncode } from '@/libs/cryptojs'
// settings
export default {
  name: 'AccountBaseData',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm
    }
  },
  computed: {
    ...mapGetters(['aid', 'realName', 'cardNo'])
  },
  created() {
    this.postForm = {
      ...{
        userId: this.aid,
        realName: this.realName,
        cardNo: this.cardNo
      }
    }
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const data = {
              userId: this.postForm.userId,
              name: this.postForm.realName,
              cardNo: CryptoJsEncode(this.postForm.cardNo)
            }
            userApi
              .baseData(data)
              .then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$store.commit('user/SET_RealName', this.postForm.realName)
                } else {
                  this.$message.success(msg)
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
}
</script>
