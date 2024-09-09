<template>
  <div class="app-container">
    <el-alert title="上传发票并提交后将再次更改。" show-icon :closable="false" type="warning" style="margin-bottom: 20px" />
    <!-- 表格 -->
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="warrantyNumber" label="保单号" :label-width="labelWidth">
            <el-input v-model="postForm.warrantyNumber" placeholder="保单号" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="电子保函" :label-width="labelWidth">
            <Base file-text="电子保函" :action="action" :file-list="fileList" :file-accept="accept" :data="{ gId }" :limit="1" @onSuccess="onSuccess" @onUploadRemove="onRemove" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" label="发票" :label-width="labelWidth">
            <Base file-text="发票" :action="billAction" :file-list="fileListBill" :file-accept="accept" :data="{ gId }" :limit="1" @onSuccess="onSuccessBill" @onUploadRemove="onRemoveBill" />
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
import { approveApi } from '@/api/approve.js'
// components
import Base from '@/components/Upload/MultiSweat'
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
    gId: { type: String, default: '' },
    warrantyNumber: { type: String, default: '' },
    gFileUrl: { type: String, default: '' },
    approveId: { type: String, default: '' }
  },
  data() {
    return {
      accept: ['.pdf', '.ofd', '.xml'].join(','),
      fileList: [],
      fileListBill: [],
      rulesForm: {
        warrantyNumber: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '保单号') }]
      }
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/guarantee/upload/file'
    },
    billAction() {
      return apiCourtUrl + '/guarantee/upload/bill'
    }
  },
  created() {
    this.submitTxt = '提交'
    this.postForm = { ...this.postForm, gId: this.gId, warrantyNumber: this.warrantyNumber }
    this.fileList = this.gFileUrl ? [{ name: '电子保函', url: this.gFileUrl }] : []
    this.postForm.letter = this.gFileUrl
  },
  methods: {
    onSuccessBill(data) {
      this.postForm.invoice = data
      // this.fileListBill.push(data)
    },
    onRemoveBill() {
      this.postForm.invoice = ''
      this.fileList = []
    },
    onSuccess(data) {
      this.postForm.letter = data
      // this.fileList.push(data)
    },
    onRemove() {
      this.postForm.letter = ''
      this.fileList = []
    },
    app() {
      approveApi
        .approval({
          approveId: this.approveId,
          gId: this.gId,
          status: 1,
          description: ''
        })
        .then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success('出函成功')
            this.$emit('onSweatSuccess')
            this.submitLoadingClose()
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 提交
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          if (this.postForm.letter !== '') {
            guaranteeApi
              .upt({
                gId: this.gId,
                warrantyNumber: this.postForm.warrantyNumber
              })
              .then(({ code, data, msg }) => {
                if (code === 200) {
                  if (this.postForm.invoice) {
                    this.app()
                  } else {
                    this.$message.success('出函成功')
                    this.$emit('onSweatSuccess')
                    this.submitLoadingClose()
                  }
                  this.submitLoadingClose()
                } else {
                  this.$message.error(msg)
                }
              })
          } else {
            this.$message.error('请上传电子保函')
          }
        } else {
          this.validateErrHandle(fields)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
