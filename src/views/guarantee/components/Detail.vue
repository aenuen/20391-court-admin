<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="court" :label="fields.court" :label-width="labelWidth">
            <el-input v-model="postForm.court" :placeholder="fields.court" clearable :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 类别 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="category" :label="fields.category" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtCategoryAry" :key="key" v-model="postForm.category" :disabled="item.dictValue === '3'" :label="item.dictValue">{{ item.name }}</el-radio>
            <div class="selectTxt">{{ selectTxt }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="postForm.category === '1'">
        <!-- 非诉期间 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="period" :label="fields.period" :label-width="labelWidth">
              <el-select v-model="postForm.period" :placeholder="fields.period" :style="{ width: commonWidth }">
                <el-option v-for="(item, key) in outLawsuitTimeAry" :key="key" :value="item.dictValue" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <!-- 案件类型 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="caseType" :label="fields.caseType" :label-width="labelWidth">
              <el-select v-model="postForm.caseType" :placeholder="fields.caseType" :style="{ width: commonWidth }">
                <el-option v-for="(item, key) in caseTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案号 -->
        <div class="caseLine">
          <div>
            <el-form-item class="is-required" prop="caseYear" :label="fields.caseNumber" :label-width="labelWidth">
              <el-date-picker v-model="postForm.caseYear" class="caseItem" type="year" placeholder="年份" :clearable="false" />
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
      </template>
      <!-- 保全金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="preserve" :label="fields.preserve" :label-width="labelWidth">
            <el-input v-model="postForm.preserve" :placeholder="fields.preserve" maxlength="11" :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
            <div class="bigPrice">{{ bigWritePrice }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 担保金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="assurance" :label="fields.assurance" :label-width="labelWidth">
            <el-input v-model="postForm.assurance" :disabled="true" :placeholder="fields.assurance" clearable :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交人身份 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="submitter" :label="fields.submitter" :label-width="labelWidth">
            <el-select v-model="postForm.submitter" :placeholder="fields.submitter" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in issueStatusAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col>
          <el-form-item prop="remark" :label="fields.remark" :label-width="labelWidth">
            <el-input v-model="postForm.remark" :placeholder="fields.remark" clearable :style="{ width: commonWidth }" />
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
import { guaranteeApi } from '@/api/guarantee'
// data
import { DetailFields } from '../modules/fields'
import { DetailCommon, DetailOne, DetailTwo } from '../modules/rules'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import caseTypeAry from '../mixins/caseTypeAry'
import courtCategoryAry from '../mixins/courtCategoryAry'
import outLawsuitTimeAry from '../mixins/outLawsuitTimeAry'
import issueStatusAry from '../mixins/issueStatusAry'
// plugins
import { controlInputPrice, numberPriceBigWrite, timeGetYear } from 'abbott-methods/import'
// settings
export default {
  name: 'GuaranteeDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin, caseTypeAry, courtCategoryAry, outLawsuitTimeAry, issueStatusAry],
  props: {
    isUpdate: { type: Boolean, default: false }
  },
  data() {
    return {
      fields: DetailFields,
      submitTxt: '',
      bigWritePrice: '',
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！'
    }
  },
  watch: {
    'postForm.preserve': function (val) {
      this.postForm.preserve = controlInputPrice(val)
      this.bigWritePrice = this.postForm.preserve ? numberPriceBigWrite(this.postForm.preserve) : ''
      this.postForm.assurance = this.postForm.preserve
    },
    'postForm.category': function (val) {
      if (val === '1') {
        this.rulesForm = { ...DetailCommon, ...DetailOne }
      } else if (val === '2') {
        this.rulesForm = { ...DetailCommon, ...DetailTwo }
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.labelWidth = (this.isUpdate ? 120 : 260) + 'px'
      this.submitTxt = this.isUpdate ? '编辑资料' : '提交资料'
      const form = { category: '1' }
      this.postForm = { ...this.postForm, ...form }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const form = { ...this.postForm }
          const common = {
            gCourt: form.court, // 申请法院
            guaranteeType: 1, // 保全类型（字典编号）
            guaranteeCategory: form.category, // 保全类别（字典编号）
            gMoney: form.preserve, // 保全金额
            guaranteeMoney: form.assurance, // 担保金额
            gIssueStatus: form.submitter, // 提交人身份（字典编号）
            gDesc: form.remark // 备注
          }
          const branchOne = {
            outLawsuitTime: form.period // 非诉期间（字典编号）
          }
          const year = timeGetYear(form.caseYear)
          const caseNumber = `（${year}）${form.caseCode}${form.caseZips}${form.codeOrder}号`
          const branchTwo = {
            gCaseType: form.caseType, // 	案件类型-诉讼保全（字典编号）
            gCaseNo: caseNumber // 案号
          }
          const inModel = { ...common, ...(+common.guaranteeCategory === 1 ? branchOne : branchTwo) }
          guaranteeApi.create(inModel).then(({ code, msg, data }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.routerGo(`/guarantee/details/${data}`)
              this.submitLoadingClose()
            } else {
              //
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
<style lang="scss" scoped>
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

.caseLine {
  width: 1015px;
  display: flex;
  justify-content: flex-start;
}

.selectTxt {
  width: 700px;
}

.case .selectTxt,
.bigPrice {
  color: #999;
}
</style>
