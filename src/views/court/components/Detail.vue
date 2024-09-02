<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="courtName" :label="fields.courtName" :label-width="labelWidth">
            <el-input v-model="postForm.courtName" :placeholder="fields.courtName" maxlength="30" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="courtCode" :label="fields.courtCode" :label-width="labelWidth">
            <el-input v-model="postForm.courtCode" :placeholder="fields.courtCode" maxlength="18" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="courtCharge" :label="fields.courtCharge" :label-width="labelWidth">
            <el-input v-model="postForm.courtCharge" :placeholder="fields.courtCharge" maxlength="30" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="telephone" :label="fields.telephone" :label-width="labelWidth">
            <el-input v-model="postForm.telephone" :placeholder="fields.telephone" maxlength="11" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="courtAddress" :label="fields.courtAddress" :label-width="labelWidth">
            <el-cascader v-model="postForm.courtAddress" :options="regionData" :placeholder="fields.courtAddress" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
import { courtApi } from '@/api/court'
// components
// data
import { fields } from '../modules/fields'
import { rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { regionData } from 'element-china-area-data'
// settings
export default {
  name: 'CourtDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      labelWidth: '200px',
      isUpdate: false,
      fields,
      rulesForm,
      regionData,
      courtId: ''
    }
  },
  methods: {
    startHandle() {
      courtApi.getId().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtId = data
          this.gainDetail()
        } else {
          this.$message.error(msg)
        }
      })
    },
    gainDetail() {
      courtApi.detail({ courtId: this.courtId }).then(({ code, data, msg }) => {
        if (code === 200) {
          if (data) {
            if (+data.courtStatus === 0) {
              this.routerClose('/court/step')
            } else if (+data.courtStatus === 1) {
              this.routerClose('/court/success')
            } else {
              this.isUpdate = true
              this.submitTxt = '重新认证'
              const newForm = {}
              Object.keys(data).forEach((key) => {
                newForm[key] = data[key] ? data[key] : ''
              })
              newForm.courtAddress = (data.courtAddress || '').split(',')
              this.postForm = newForm
            }
          } else {
            this.submitTxt = '认证'
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          this.postForm.courtId = this.courtId
          this.postForm.courtAddress = this.postForm.courtAddress.join(',')
          courtApi.create(this.postForm).then(({ code, data, msg }) => {
            if (code === 200) {
              this.$message.success('认证成功')
              this.routerClose('/court/step')
            } else {
              this.$message.error(msg)
            }
          })
          this.submitLoadingClose()
        } else {
          this.validateErrHandle(fields)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
