<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="gCourt" :label="fields.gCourt" :label-width="labelWidth">
            <el-input v-model="postForm.gCourt" :placeholder="fields.gCourt" clearable :style="{ width: commonWidth }" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 类别 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="guaranteeCategory" :label="fields.guaranteeCategory" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtCategoryAry" :key="key" v-model="postForm.guaranteeCategory" :disabled="item.dictValue === '3'" :label="item.dictValue">{{ item.name }}</el-radio>
            <div class="selectTxt">{{ selectTxt }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="postForm.guaranteeCategory === '1'">
        <!-- 非诉期间 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="outLawsuitTime" :label="fields.outLawsuitTime" :label-width="labelWidth">
              <el-select v-model="postForm.outLawsuitTime" :placeholder="fields.outLawsuitTime" :style="{ width: commonWidth }">
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
            <el-form-item class="is-required" prop="gCaseType" :label="fields.gCaseType" :label-width="labelWidth">
              <el-select v-model="postForm.gCaseType" :placeholder="fields.gCaseType" :style="{ width: commonWidth }">
                <el-option v-for="(item, key) in caseTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案号 -->
        <div class="caseLine">
          <div>
            <el-form-item class="is-required" prop="gCaseYear" :label="fields.gCaseNo" :label-width="labelWidth">
              <el-date-picker v-model="postForm.gCaseYear" class="caseItem" type="year" :placeholder="fields.gCaseYear" :clearable="false" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="gCaseCode">
              <el-input v-model="postForm.gCaseCode" class="caseItem" :placeholder="fields.gCaseCode" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="gCaseZips">
              <el-input v-model="postForm.gCaseZips" class="caseItem zip" :placeholder="fields.gCaseZips" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="gCodeOrder">
              <el-input v-model="postForm.gCodeOrder" class="caseItem" :placeholder="fields.gCodeOrder" />
            </el-form-item>
          </div>
          <div class="caseHao">号</div>
          <div class="caseExps">例（2018）京01民初10号</div>
        </div>
      </template>
      <!-- 保全金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="gMoney" :label="fields.gMoney" :label-width="labelWidth">
            <el-input v-model="postForm.gMoney" :placeholder="fields.gMoney" maxlength="11" :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
            <div class="bigPrice">{{ bigWritePrice }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 担保金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="guaranteeMoney" :label="fields.guaranteeMoney" :label-width="labelWidth">
            <el-input v-model="postForm.guaranteeMoney" :disabled="true" :placeholder="fields.guaranteeMoney" clearable :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交人身份 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="gIssueStatus" :label="fields.gIssueStatus" :label-width="labelWidth">
            <el-select v-model="postForm.gIssueStatus" :placeholder="fields.gIssueStatus" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in issueStatusAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col>
          <el-form-item prop="gDesc" :label="fields.gDesc" :label-width="labelWidth">
            <el-input v-model="postForm.gDesc" :placeholder="fields.gDesc" clearable :style="{ width: commonWidth }" />
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
import { DetailFields as fields } from '../modules/fields'
import { DetailCommon, DetailOne, DetailTwo } from '../modules/rules'
// filter
// function
import { dictGetValueByName } from '@/libs/utils/dict'
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import gainDict from '@/components/Mixins/gainDict'
// plugins
import { controlInputPrice, numberPriceBigWrite, timeGetYear } from 'abbott-methods/import'
// settings
export default {
  name: 'GuaranteeDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin, gainDict],
  props: {
    isUpdate: { type: Boolean, default: false },
    baseObj: { type: Object, default: () => {} }
  },
  data() {
    return {
      fields,
      bigWritePrice: '',
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！'
    }
  },
  watch: {
    'postForm.gMoney': function (val) {
      this.postForm.gMoney = controlInputPrice(val)
      this.bigWritePrice = this.postForm.gMoney ? numberPriceBigWrite(this.postForm.gMoney) : ''
      this.postForm.guaranteeMoney = this.postForm.gMoney
    },
    'postForm.guaranteeCategory': function (val) {
      if (String(val) === '1') {
        this.rulesForm = { ...DetailCommon, ...DetailOne }
      } else if (String(val) === '2') {
        this.rulesForm = { ...DetailCommon, ...DetailTwo }
      }
    }
  },
  created() {},
  methods: {
    async startHandle() {
      this.labelWidth = (this.isUpdate ? 120 : 260) + 'px'
      this.submitTxt = this.isUpdate ? '编辑资料' : '提交资料'
      this.gainDict_caseTypeAry()
      await this.gainDict_courtCategoryAry()
      await this.gainDict_outLawsuitTimeAry()
      await this.gainDict_issueStatusAry()
      if (this.isUpdate && this.baseObj.guaranteeCategory) {
        const caseNoAry = this.baseObj.gCaseNo.split('|') || ['', '', '', '', '']
        const form = {
          guaranteeCategory: dictGetValueByName(this.courtCategoryAry, this.baseObj.guaranteeCategory),
          gCaseYear: String(caseNoAry[0]).replace(/^[（]+|[）+]$/g, ''),
          gCaseCode: caseNoAry[1],
          gCaseZips: caseNoAry[2],
          gCodeOrder: caseNoAry[3]
        }
        this.postForm = { ...this.baseObj, ...form }
      } else {
        const form = { guaranteeCategory: '1' }
        this.postForm = { ...this.postForm, ...form }
      }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            ...this.postForm,
            ...{ guaranteeType: 1 }
          }
          if (+this.postForm.guaranteeCategory === 1) {
            newForm.gCaseType = ''
            newForm.gCaseNo = ''
          } else {
            newForm.outLawsuitTime = ''
            const year = newForm.gCaseYear.length === 4 ? newForm.gCaseYear : timeGetYear(newForm.gCaseYear)
            newForm.gCaseNo = `（${year}）|${newForm.gCaseCode}|${newForm.gCaseZips}|${newForm.gCodeOrder}|号`
          }
          if (this.isUpdate) {
            // 转为值部分
            if (+newForm.guaranteeCategory === 1) {
              newForm.outLawsuitTime = dictGetValueByName(this.outLawsuitTimeAry, newForm.outLawsuitTime) // 非诉期间
            } else {
              newForm.gCaseType = dictGetValueByName(this.caseTypeAry, newForm.gCaseType) // 案件类型
            }
            newForm.gIssueStatus = dictGetValueByName(this.issueStatusAry, newForm.gIssueStatus) // 提交人
            guaranteeApi.update(newForm).then(({ code, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.submitLoadingClose()
                this.$emit('onDetailSuccess', newForm)
              } else {
                this.$message.error(msg)
                this.submitLoadingClose()
              }
            })
          } else {
            guaranteeApi.create(newForm).then(({ code, msg, data }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.routerGo(`/guarantee/details/${data}`)
                this.submitLoadingClose()
              } else {
                this.$message.error(msg)
                this.submitLoadingClose()
              }
            })
          }
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
