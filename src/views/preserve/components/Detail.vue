<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cCourt" :label="fields.cCourt" :label-width="labelWidth">
            <el-select v-model="postForm.cCourt" :placeholder="fields.cCourt" :style="cStyle">
              <el-option v-for="(item, key) in courtAry" :key="key" :value="String(item.courtId)" :label="item.courtName" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保全类类型-->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="courtType" :label="fields.courtType" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtTypeAry" :key="key" v-model="postForm.courtType" :disabled="+item.dictValue === 2 || +item.dictValue === 3" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保全类别 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="courtCategory" :label="fields.courtCategory" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtCategoryAry" :key="key" v-model="postForm.courtCategory" :disabled="+item.dictValue === 3" :label="item.dictValue">{{ item.name }}</el-radio>
            <div class="selectTxt">{{ selectTxt }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.courtCategory === 2">
        <!-- 案件类型 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="cCaseType" :label="fields.cCaseType" :label-width="labelWidth">
              <el-select v-model="postForm.cCaseType" :placeholder="fields.cCaseType" :style="cStyle">
                <el-option v-for="(item, key) in caseTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案号 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="cCaseNo" :label="fields.cCaseNo" :label-width="labelWidth">
              <el-input v-model="postForm.cCaseNo" :placeholder="fields.cCaseNo" clearable :style="cStyle" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案由 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="cCaseReason" :label="+postForm.cCaseType === 13 ? fields.cCaseReasonMain : fields.cCaseReason" :label-width="labelWidth">
              <el-input v-model="postForm.cCaseReason" :placeholder="+postForm.cCaseType === 13 ? fields.cCaseReasonMain : fields.cCaseReason" clearable :style="cStyle" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案由2 -->
        <el-row v-if="+postForm.cCaseType === 13">
          <el-col>
            <el-form-item class="is-required" prop="cCaseReason2" :label="+postForm.cCaseType === 13 ? fields.cCaseReasonAction : fields.cCaseReason2" :label-width="labelWidth">
              <el-input v-model="postForm.cCaseReason2" :placeholder="+postForm.cCaseType === 13 ? fields.cCaseReasonAction : fields.cCaseReason2" clearable :style="cStyle" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 保全金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cMoney" :label="fields.cMoney" :label-width="labelWidth">
            <el-input v-model="postForm.cMoney" :placeholder="fields.cMoney" clearable :style="cStyle">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 担保情况-->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="guaranteeCase" :label="fields.guaranteeCase" :label-width="labelWidth">
            <el-radio v-for="(item, key) in ensureAry" :key="key" v-model="postForm.guaranteeCase" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 无需担保原因 -->
      <el-row v-if="+postForm.guaranteeCase === 2">
        <el-col>
          <el-form-item class="is-required" prop="noGuaranteeReason" :label="fields.noGuaranteeReason" :label-width="labelWidth">
            <el-select v-model="postForm.noGuaranteeReason" :placeholder="fields.noGuaranteeReason" :style="cStyle">
              <el-option v-for="(item, key) in noGuaranteeReasonAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交人身份 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cIssueStatus" :label="fields.cIssueStatus" :label-width="labelWidth">
            <el-select v-model="postForm.cIssueStatus" :placeholder="fields.cIssueStatus" :style="cStyle">
              <el-option v-for="(item, key) in issueStatusAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col>
          <el-form-item prop="cDesc" :label="fields.cDesc" :label-width="labelWidth">
            <el-input v-model="postForm.cDesc" :placeholder="fields.cDesc" clearable :style="cStyle" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="IAgree" :label-width="labelWidth">
            <el-checkbox v-model="postForm.IAgree">同意</el-checkbox>
            <span style="color: #1890ff; cursor: pointer" @click="noticeOpen">《诉讼保全需知》</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交 -->
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog v-if="noticeControl" width="840px" title="诉讼保全需知" :visible.sync="noticeControl" :before-close="noticeClose">
      <Notice @IAgree="IAgree" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { courtApi } from '@/api/court'
// import { preserveApi } from '@/api/preserve'
// components
import Notice from './Notice'
// data
import { fields } from '../modules/fields.js'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// settings
export default {
  name: 'PreserveDetail',
  components: { Notice },
  mixins: [DetailMixin, MethodsMixin, GainDict],
  data() {
    return {
      fields,
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！',
      postForm: {
        courtType: '1',
        courtCategory: '1'
      },
      ensureAry: [
        { name: '有担保', dictValue: '1' },
        { name: '无需担保', dictValue: '2' }
      ],
      courtAry: [],
      noticeControl: true,
      commonStyle: {
        width: this.commonWidth
      }
    }
  },
  computed: {
    cStyle() {
      return { width: this.commonWidth }
    }
  },
  created() {
    this.gainDict_courtTypeAry()
    this.gainDict_courtCategoryAry()
    this.gainDict_issueStatusAry()
    this.gainDict_noGuaranteeReasonAry()
    this.gainDict_caseTypeAry()
    this.gainList()
    this.submitTxt = '保全申请'
  },
  methods: {
    submitForm() {},
    gainList() {
      courtApi.all().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtAry = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    IAgree() {
      this.noticeControl = false
      this.postForm.IAgree = true
    },
    noticeOpen() {
      this.noticeControl = true
    },
    noticeClose() {
      this.noticeControl = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
