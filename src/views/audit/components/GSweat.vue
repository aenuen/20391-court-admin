<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="warrantyNumber" label="保单号" :label-width="labelWidth">
            <el-input v-model="postForm.warrantyNumber" placeholder="保单号" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" label="电子保函" :label-width="labelWidth">
            <Base file-text="电子保函" :action="action" :file-list="fileList" :file-accept="accept" :file-data="{ gId }" @onSuccess="onSuccess" />
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
import { guaranteeApi } from '@/api/guarantee.js'
// components
import Base from '@/components/Upload/Base'
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { validateRequire } from 'abbott-methods/import'
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'AuditGSweat',
  components: { Base },
  mixins: [DetailMixin, MethodsMixin],
  props: {
    gId: { type: String, default: '' }
  },
  data() {
    return {
      accept: ['.pdf'].join(','),
      fileList: [],
      rulesForm: {
        warrantyNumber: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '保单号') }]
      }
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/guarantee/upload/file'
    }
  },
  created() {
    this.submitTxt = '提交'
  },
  methods: {
    onSuccess(data) {
      this.fileList.push(data)
      // this.$emit('onSweatSuccess')
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          guaranteeApi
            .upt({
              gId: this.gId,
              warrantyNumber: this.postForm.warrantyNumber
            })
            .then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success('出函成功')
                this.$emit('onSweatSuccess')
              } else {
                this.$message.error(msg)
              }
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
