<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cCourt" :label="fields.cCourt" :label-width="labelWidth">
            <el-select v-model="postForm.cCourt" :placeholder="fields.cCourt" :style="cStyle">
              <el-option v-for="(item, key) in courtAry" :key="key" :value="item.courtId" :label="item.courtName" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保全类类型-->
      <el-row v-show="typeUse">
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
        <div class="caseLine">
          <div>
            <el-form-item class="is-required" prop="caseYear" :label="fields.cCaseNo" :label-width="labelWidth">
              <el-date-picker v-model="postForm.caseYear" class="caseItem" type="year" :placeholder="fields.caseYear" :clearable="false" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseCode">
              <el-input v-model="postForm.caseCode" class="caseItem" :placeholder="fields.caseCode" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseZips">
              <el-input v-model="postForm.caseZips" class="caseItem zip" :placeholder="fields.caseZips" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="codeOrder">
              <el-input v-model="postForm.codeOrder" class="caseItem" :placeholder="fields.codeOrder" />
            </el-form-item>
          </div>
          <div class="caseHao">号</div>
          <div class="caseExps">例（2018）京01民初10号</div>
        </div>
        <template v-if="+postForm.cCaseType === 13">
          <!-- 行为案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReasonMain" :label="fields.cCaseReasonMain" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReasonMain" :placeholder="fields.cCaseReasonMain" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 行为案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReasonAction" :label="fields.cCaseReasonAction" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReasonAction" :placeholder="fields.cCaseReasonAction" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <!-- 案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReason" :label="fields.cCaseReason" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReason" :placeholder="fields.cCaseReason" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </template>
      <!-- 保全金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cMoney" :label="fields.cMoney" :label-width="labelWidth">
            <el-input v-model="postForm.cMoney" :placeholder="fields.cMoney" clearable :style="cStyle">
              <template slot="append">元</template>
            </el-input>
            <div class="bigPrice">{{ bigWritePrice }}</div>
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
import { preserveApi } from '@/api/preserve'
// components
import Notice from './Notice'
// data
import { DetailFields as fields } from '../modules/fields.js'
import { DetailCommon, DetailOne, DetailTwo, DetailThree } from '../modules/rules.js'
// filter
// function
import { postData } from '../modules/utils.js'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
import { controlInputPrice, numberPriceBigWrite } from 'abbott-methods/import'
// settings
export default {
  name: 'PreserveDetail',
  components: { Notice },
  mixins: [DetailMixin, MethodsMixin, GainDict],
  data() {
    return {
      fields,
      rulesForm: { ...DetailCommon },
      typeUse: false,
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！',
      postForm: {
        courtType: '1',
        courtCategory: '1',
        guaranteeCase: '1'
      },
      ensureAry: [
        { name: '有担保', dictValue: '1' },
        { name: '无需担保', dictValue: '2' }
      ],
      courtAry: [],
      bigWritePrice: '',
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
  watch: {
    'postForm.cMoney': function (val) {
      this.postForm.cMoney = controlInputPrice(val)
      this.bigWritePrice = this.postForm.cMoney ? numberPriceBigWrite(this.postForm.cMoney) : ''
    },
    'postForm.courtCategory': function (val) {
      if (String(val) === '1') {
        this.rulesForm = { ...DetailCommon }
      } else if (String(val) === '2') {
        this.rulesForm = { ...DetailCommon, ...DetailOne, ...DetailTwo }
      }
      this.$refs.postForm.clearValidate()
    },
    'postForm.cCaseType': function (val) {
      if (String(val) === '13') {
        this.rulesForm = { ...DetailCommon, ...DetailOne, ...DetailTwo, ...DetailThree }
      } else {
        this.rulesForm = { ...DetailCommon, ...DetailOne, ...DetailTwo }
      }
      this.$refs.postForm.clearValidate()
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
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const data = postData(this.postForm)
          if (this.isUpdate) {
            this.submitLoadingClose()
            //
          } else {
            preserveApi.create(data).then(({ code, data, msg }) => {
              if (code === 200) {
                const cId = data
                this.$message.success(msg)
                this.submitLoadingClose()
                if (+data.guaranteeCase === 2) {
                  this.routerClose('/preserve/details/' + cId)
                } else {
                  //
                }
              } else {
                this.$message.error(msg)
              }
            })
            this.submitLoadingClose()
            //
          }
        } else {
          this.validateErrHandle(fields)
        }
      })
    },
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
<style lang="scss" scoped>
.caseLine {
  width: 1015px;
  display: flex;
  justify-content: flex-start;
  .caseItem {
    margin-right: 10px;
    width: 115px;
    &.zip {
      width: 125px;
    }
  }
  .caseHao {
    line-height: 36px;
    font-size: 14px;
  }
  .caseExps {
    margin-left: 10px;
    color: #999;
    line-height: 36px;
    font-size: 14px;
  }
}
.selectTxt,
.bigPrice {
  color: #999;
}
</style>
