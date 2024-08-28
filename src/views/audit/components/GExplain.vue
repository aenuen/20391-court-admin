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
            <el-button :type="+postForm.status === 4 || +postForm.status === 6 ? 'success' : +postForm.status === 3 ? 'danger' : 'warning'" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
import { approveApi } from '@/api/approve'
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
    theStatus: { type: Number, default: -1 },
    gId: { type: String, default: '' }
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
    if (+this.theStatus === 0) {
      this.statusAry = [
        { label: '不接单', value: 2 },
        { label: '不通过', value: 3 },
        { label: '通过', value: 4 }
      ]
    } else if (+this.theStatus === 5) {
      this.statusAry = [
        { label: '不通过', value: 4 },
        { label: '通过', value: 6 }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            approveId: this.approvalId,
            gId: this.gId,
            status: this.postForm.status,
            description: this.postForm.description
          }
          approveApi.approval(newForm).then(({ code, data, msg }) => {
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
