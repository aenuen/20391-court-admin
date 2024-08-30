<template>
  <div>
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="status" label="审核" :label-width="labelWidth">
            <el-select v-model="postForm.status" placeholder="审核">
              <el-option v-for="(item, key) in statusAry" :key="key" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="description" label="原因" :label-width="labelWidth">
            <el-input v-model="postForm.description" :rows="4" type="textarea" placeholder="原因" clearable style="resize: none" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button :type="+postForm.status === 1 ? 'success' : +postForm.status === 3 ? 'danger' : 'primary'" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
import { preserveApi } from '@/api/preserve'
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { validateRequire } from 'abbott-methods/import'
// settings
export default {
  name: 'AuditExplain',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    approvalId: { type: String, default: '' },
    cId: { type: String, default: '' }
  },
  data() {
    return {
      rulesForm: {
        status: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '审批') }],
        description: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '原因') }]
      },
      postForm: {},
      statusAry: []
    }
  },
  created() {
    this.submitTxt = '审批'
    this.statusAry = [
      { label: '通过', value: 1 },
      { label: '不通过', value: 3 }
    ]
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            approveId: this.approvalId,
            cId: this.cId,
            status: this.postForm.status,
            description: this.postForm.description
          }
          preserveApi.approve(newForm).then(({ code, data, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.$emit('onApprovalSuccess')
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
