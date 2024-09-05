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
      <!-- 费用规则 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" label="费用规则" :label-width="labelWidth">
            <a style="color: #1890ff" @click="createLine"><i class="el-icon-plus" /> 添加一条规则</a>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 循环行 -->
      <el-row v-for="(item, index) in postForm.rules" :key="index">
        <el-col>
          <div class="InputGroup">
            <div>
              <el-form-item class="is-required" :label="'费用规则（' + (index + 1) + '）'" :label-width="labelWidth">
                <el-select v-model="item.type" placeholder="选择方式" filterable style="width: 130px">
                  <el-option v-for="(i, key) in typeAry" :key="key" :value="i.value" :label="i.label" />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="+item.type === 1 || +item.type === 2">
              <el-form-item class="is-required">
                <el-input v-model="item.greater" placeholder="大于等于" filterable style="width: 150px">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </div>
            <div v-if="+item.type === 1 || +item.type === 3">
              <el-form-item class="is-required">
                <el-input v-model="item.less" placeholder="小于" filterable style="width: 150px">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="is-required">
                <el-select v-model="item.percent" placeholder="是否百分比" filterable style="width: 130px">
                  <el-option v-for="(i, key) in percentAry" :key="key" :value="i.value" :label="i.label" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="is-required">
                <el-input v-model="item.cost" placeholder="费率" filterable style="width: 130px">
                  <template slot="append">{{ +item.percent === 0 ? '元' : '%' }}</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-button icon="el-icon-minus" style="width: 50px" type="warning" @click="removeLine(index)" />
            </div>
            <div style="line-height: 36px">{{ computeText(item) }}</div>
          </div>
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
import { DetailCommon as rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
// import { controlInputPrice } from 'abbott-methods/import'
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
      typeAry: [
        { value: '1', label: '区间' },
        { value: '2', label: '大于等于' },
        { value: '3', label: '小于' }
      ],
      percentAry: [
        { value: '0', label: '固定金额' },
        { value: '1', label: '百分比' }
      ],
      organizeAry: [],
      courtAry: []
    }
  },
  computed: {
    cStyle() {
      return {
        width: '860px'
      }
    }
  },
  watch: {},
  created() {
    this.submitTxt = this.isUpdate ? '编辑' : '新增'
    this.gainOrganizeList() // 机构列表
    this.gainCourtList() // 法院列表
    // 表单添加初始值
    this.$nextTick(() => {
      this.postForm = {
        ...this.postForm,
        rules: [
          {
            type: '1', // 1-区间，2-大于等于，3-小于
            greater: '', // 大于等于
            less: '', // 小于
            percent: '0', // 是否百分比
            cost: '' // 费率
          }
        ]
      }
    }, 500)
    // 编辑时获取详情
    if (this.isUpdate && this.updateNumber > 0) {
      this.gainExchangeDetail()
    }
  },
  methods: {
    // 显示规则信息
    computeText(item) {
      if (+item.type === 1) {
        return item.greater && item.less ? `${item.greater}元 <= X <${item.less}元` : ''
      } else if (+item.type === 2) {
        return item.greater ? `${item.greater}元 <= X` : ''
      } else if (+item.type === 3) {
        return item.less ? `X <${item.less}元` : ''
      }
    },
    // 添加规则
    createLine() {
      this.postForm.rules.push({
        type: '1', // 1-区间，2-大于等于，3-小于
        greater: '', // 大于等于
        less: '', // 小于
        percent: '0', // 是否百分比
        cost: '' // 费率
      })
    },
    // 删除规则
    removeLine(index) {
      this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.postForm.rules.splice(index, 1)
      })
    },
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
    // 费率详情
    gainExchangeDetail() {
      exchangeApi.detail(this.updateNumber).then(({ code, data, msg }) => {
        if (code === 200) {
          this.postForm = Object.assign({}, data)
          data.rules = JSON.parse(data.rules) || [] // 字符串解析
          // 循环处理
          data.rules.forEach((item) => {
            item.type = String(item.type) // 1-区间，2-大于等于，3-小于
            item.greater = item.greater || '' // 大于等于
            item.less = item.less || '' // 小于
            item.percent = item.percent ? '1' : '0' // 是否百分比
            item.cost = item.cost || '' // 费率
          })
          this.postForm.rules = data.rules
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
          data.rules = []
          let isRight = true
          this.postForm.rules.forEach((item, index) => {
            const temp = {}
            temp.type = +item.type
            temp.greater = +item.greater // 大于等于
            temp.less = +item.less // 小于
            temp.percent = +item.percent === 1 // 是否百分比
            temp.cost = +item.cost // 费率
            // 大于等于验证
            if (+item.type === 1 || +item.type === 2) {
              if (!item.greater) {
                isRight = false
                this.$message.error(`费率规则（${index + 1}）的“大于等于”为必填项`)
                return
              } else if (!/^-?\d+(\.\d+)?$/.test(item.greater)) {
                isRight = false
                this.$message.error(`费率规则（${index + 1}）的“大于等于”必须是数字`)
                return
              }
            }
            // 小于验证
            if (+item.type === 1 || +item.type === 3) {
              if (!item.less) {
                isRight = false
                this.$message.error(`费率规则（${index + 1}）的“小于”为必填项`)
                return
              } else if (!/^-?\d+(\.\d+)?$/.test(item.less)) {
                isRight = false
                this.$message.error(`费率规则（${index + 1}）的“小于”必须是数字`)
                return
              }
            }
            // 费率验证
            if (!item.cost) {
              isRight = false
              this.$message.error(`费率规则（${index + 1}）的“费率”为必填项`)
              return
            } else if (!/^-?\d+(\.\d+)?$/.test(item.cost)) {
              isRight = false
              this.$message.error(`费率规则（${index + 1}）的“费率”必须是数字`)
              return
            }
            data.rules.push(temp)
          })
          if (isRight) {
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
@import url('../styles/detail.scss');
</style>
