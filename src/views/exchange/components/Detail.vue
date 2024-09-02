<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 机构 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="orgId" :label="fields.orgId" :label-width="labelWidth">
            <el-cascader v-model="postForm.orgId" :placeholder="fields.orgId" :options="organizeAry" filterable :style="cStyle" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="courtId" :label="fields.courtId" :label-width="labelWidth">
            <el-select v-model="postForm.courtId" :placeholder="fields.courtId" filterable :style="cStyle">
              <el-option v-for="(item, key) in courtAry" :key="key" :value="String(item.courtId)" :label="item.courtName" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 方式 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="expenseType" :label="fields.expenseType" :label-width="labelWidth">
            <el-radio v-for="(item, key) in expenseTypeAry" :key="key" v-model="postForm.expenseType" :disabled="item.dictValue === '3'" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.expenseType === 111">
        <!-- 最低费率 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="expenseLow" :label="fields.expenseLow" :label-width="labelWidth">
              <el-input v-model="postForm.expenseLow" :placeholder="fields.expenseLow" :style="cStyle">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 最低费用 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="costLow" :label="fields.costLow" :label-width="labelWidth">
              <el-input v-model="postForm.costLow" :placeholder="fields.costLow" :style="cStyle">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 最高费率 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="expenseHigh" :label="fields.expenseHigh" :label-width="labelWidth">
              <el-input v-model="postForm.expenseHigh" :placeholder="fields.expenseHigh" :style="cStyle">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else-if="+postForm.expenseType === 112">
        <!-- chargeLow -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="chargeLow" :label="fields.chargeLow" :label-width="labelWidth">
              <el-input v-model="postForm.chargeLow" :placeholder="fields.chargeLow" :style="cStyle">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 低于费率 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="chargeHigh" :label="fields.chargeHigh" :label-width="labelWidth">
              <el-input v-model="postForm.chargeHigh" :placeholder="fields.chargeHigh" :style="cStyle">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 超过费率 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="costLows" :label="fields.costLows" :label-width="labelWidth">
              <el-input v-model="postForm.costLows" :placeholder="fields.costLows" :style="cStyle">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 提交 -->
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
import { exchangeApi } from '@/api'
import { selectApi } from '@/api/select.js'
import { courtApi } from '@/api/court.js'
// components
// data
import { fields } from '../modules/fields.js'
import { DetailCommon as rulesForm, DetailOne, DetailTwo } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
import { controlInputPrice } from 'abbott-methods/import'
// settings
export default {
  name: 'ExchangeDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin, GainDict],
  props: {
    isUpdate: { type: Boolean, default: false },
    updateNumber: { type: Number, default: 0 }
  },
  data() {
    return {
      fields,
      rulesForm,
      organizeAry: [],
      courtAry: []
    }
  },
  computed: {
    cStyle() {
      return {
        width: this.commonWidth
      }
    }
  },
  watch: {
    'postForm.expenseLow': function (val) {
      this.postForm.expenseLow = controlInputPrice(val)
    },
    'postForm.costLow': function (val) {
      this.postForm.costLow = controlInputPrice(val)
    },
    'postForm.expenseHigh': function (val) {
      this.postForm.expenseHigh = controlInputPrice(val)
    },
    'postForm.chargeLow': function (val) {
      this.postForm.chargeLow = controlInputPrice(val)
    },
    'postForm.chargeHigh': function (val) {
      this.postForm.chargeHigh = controlInputPrice(val)
    },
    'postForm.costLows': function (val) {
      this.postForm.costLows = controlInputPrice(val)
    },
    'postForm.expenseType': function (val) {
      this.$refs.postForm.clearValidate()
      if (+val === 111) {
        this.rulesForm = { ...rulesForm, ...DetailOne }
      } else if (+val === 112) {
        this.rulesForm = { ...rulesForm, ...DetailTwo }
      }
    }
  },
  created() {
    this.submitTxt = this.isUpdate ? '编辑' : '新增'
    this.gainDict_expenseTypeAry()
    this.gainOrganizeList()
    this.gainCourtList()
    this.$nextTick(() => {
      this.postForm = {
        ...this.postForm,
        ...{
          expenseType: '111'
        }
      }
    }, 500)
    if (this.isUpdate && this.updateNumber > 0) {
      this.gainExchangeDetail()
    }
  },
  methods: {
    // 机构列表
    gainOrganizeList() {
      selectApi.list().then(({ code, data, msg }) => {
        if (code === 200) {
          const bank = data.bank || []
          bank.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          const dbjg = data.dbjg || []
          dbjg.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          const bx = data.bx || []
          bx.forEach((item) => {
            item.value = item.orgId
            item.label = item.name
          })
          if (bank.length > 0) {
            this.organizeAry.push({ value: 'bank', label: '银行', children: bank })
          }
          if (dbjg.length > 0) {
            this.organizeAry.push({ value: 'dbjg', label: '担保机构', children: dbjg })
          }
          if (bx.length > 0) {
            this.organizeAry.push({ value: 'bx', label: '保险', children: bx })
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 法院列表
    gainCourtList() {
      courtApi.all().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtAry = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    gainExchangeDetail() {
      exchangeApi.detail(this.updateNumber).then(({ code, data, msg }) => {
        if (code === 200) {
          if (+data.expenseType === 112) {
            data.costLows = data.costLow
            data.costLow = ''
          }
          this.postForm = {
            ...data,
            ...{
              expenseType: String(data.expenseType)
            }
          }
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
          const data = {}
          data.orgId = this.postForm.orgId[1]
          data.courtId = this.postForm.courtId
          data.expenseType = this.postForm.expenseType
          if (+data.expenseType === 111) {
            data.expenseLow = this.postForm.expenseLow
            data.costLow = this.postForm.costLow
            data.expenseHigh = this.postForm.expenseHigh
          } else {
            data.chargeLow = this.postForm.chargeLow
            data.chargeHigh = this.postForm.chargeHigh
            data.costLow = this.postForm.costLows
          }
          if (this.isUpdate) {
            data.expenseId = this.updateNumber
            exchangeApi.update(data).then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.$emit('updateSuccess')
              } else {
                this.$message.error(msg)
              }
            })
            this.submitLoadingClose()
          } else {
            exchangeApi.create(data).then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.$emit('createSuccess')
              } else {
                this.$message.error(msg)
              }
            })
            this.submitLoadingClose()
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
