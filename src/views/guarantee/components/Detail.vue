<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm">
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="court" :label="fields.court" :label-width="labelWidth">
            <el-select v-model="postForm.court" :placeholder="fields.court" :style="{ width: commonWidth }">
              <el-option v-for="(item, key) in courtAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="category" :label="fields.category" :label-width="labelWidth">
            <el-radio v-model="postForm.category" :label="1">诉前保全</el-radio>
            <el-radio v-model="postForm.category" :label="2">诉讼保全</el-radio>
            <div class="selectTxt">{{ selectTxt }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="postForm.category === 1">
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="period" :label="fields.period" :label-width="labelWidth">
              <el-select v-model="postForm.period" :placeholder="fields.period" :style="{ width: commonWidth }">
                <el-option v-for="(item, key) in periodAry" :key="key" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="caseType" :label="fields.caseType" :label-width="labelWidth">
              <el-select v-model="postForm.caseType" :placeholder="fields.caseType" :style="{ width: commonWidth }">
                <el-option v-for="(item, key) in caseTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="display: flex; justify-content: flex-start">
          <div>
            <el-form-item class="is-required" prop="caseYear" :label="fields.caseNumber" :label-width="labelWidth">
              <el-date-picker v-model="postForm.caseYear" class="caseItem" type="year" placeholder="年份" :clearable="false" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseItem">
              <el-input v-model="postForm.caseCode" class="caseItem" :placeholder="fields.caseCode" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseItem">
              <el-input v-model="postForm.caseZips" class="caseItem zip" :placeholder="fields.caseZips" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseItem">
              <el-input v-model="postForm.codeOrder" class="caseItem" :placeholder="fields.codeOrder" />
            </el-form-item>
          </div>
          <div class="caseHao">号</div>
          <div class="caseExps">例（2018）京01民初10号</div>
        </div>
      </template>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="preserve" :label="fields.preserve" :label-width="labelWidth">
            <el-input v-model="postForm.preserve" :placeholder="fields.preserve" maxlength="10" :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
            <div class="bigPrice">{{ bigWritePrice }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="assurance" :label="fields.assurance" :label-width="labelWidth">
            <el-input v-model="postForm.assurance" :disabled="true" :placeholder="fields.assurance" clearable :style="{ width: commonWidth }">
              <template slot="append">元</template>
            </el-input>
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
// components
// data
import { DetailFields } from '../modules/fields'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { controlInputPrice, numberPriceBigWrite } from 'abbott-methods/import'
// settings
export default {
  name: 'GuaranteeDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: { type: Boolean, default: false }
  },
  data() {
    return {
      fields: DetailFields,
      commonWidth: '500px',
      submitTxt: '',
      bigWritePrice: '',
      postForm: {
        period: 1,
        category: 1
      },
      courtAry: [
        { value: 1, label: '鼓楼区人民法院' },
        { value: 2, label: '鼓楼区人民法院' }
      ],
      periodAry: [
        { value: 1, label: '未起诉或提起仲裁前' },
        { value: 2, label: '起诉或提起仲裁后' }
      ],
      institutionAry: [
        { value: 1, label: '中国平安' },
        { value: 2, label: '中国人寿' }
      ],
      caseTypeAry: [],
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！'
    }
  },
  watch: {
    'postForm.preserve': {
      handler(newValue) {
        this.postForm.preserve = controlInputPrice(newValue)
        this.bigWritePrice = this.postForm.preserve ? numberPriceBigWrite(this.postForm.preserve) : ''
        this.postForm.assurance = this.postForm.preserve
      },
      immediate: false // 如果需要在组件创建时立即触发，设置immediate为true
    }
  },
  created() {
    this.labelWidth = (this.isUpdate ? 120 : 260) + 'px'
    this.submitTxt = this.isUpdate ? '编辑资料' : '提交资料'
  },
  methods: {
    submitForm() {
      this.$router.push({
        path: `/guarantee/details/1`
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
.selectTxt,
.bigPrice {
  color: #999;
}
</style>
