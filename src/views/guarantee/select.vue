<template>
  <div class="app-container">
    <Steps :step="2" />
    <div class="details" style="width: 800px; margin: auto; margin-top: 30px">
      <el-form ref="postForm" :model="postForm">
        <div class="itemBox">
          <div class="boxTitle">
            <div class="titleName">选择机构品类</div>
          </div>
          <div class="boxContent" style="padding: 5px"></div>
        </div>
        <el-row>
          <el-col>
            <el-form-item class="is-required" label="选择机构品类" :label-width="labelWidth">
              <el-radio v-for="(item, key) in theTypeAry" :key="key" v-model="theType" :label="item.label" @change="handleRadioChange">
                {{ item.name }}
              </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="itemBox">
          <div class="boxTitle">
            <div class="titleName">选择担保机构</div>
          </div>
          <div class="boxContent" style="padding: 5px"></div>
        </div>
        <el-row>
          <el-col>
            <el-form-item class="is-required" label="选择机构品类" :label-width="labelWidth">
              <el-radio-group v-if="theType === 'bank'" v-model="radio" class="radio-group">
                <el-radio v-for="(item, key) in bankList" :key="key" :label="item.orgId">
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
              <el-radio-group v-if="theType === 'dbjg'" v-model="radio" class="radio-group">
                <el-radio v-for="(item, key) in guaranteeList" :key="key" :label="item.orgId">
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
              <el-radio-group v-if="theType === 'bx'" v-model="radio" class="radio-group">
                <el-radio v-for="(item, key) in insuranceList" :key="key" :label="item.orgId">
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="text-align: center; padding: 50px 0">
      <el-button @click="routerClose(`/guarantee/upload/${updateId}`)"> 上一步 </el-button>
      <el-button type="primary" @click="submitForm">保存，继续下一步</el-button>
    </div>
  </div>
</template>
<script>
// api
import { guaranteeApi } from '@/api/guarantee'
import { selectApi } from '@/api/select'
// components
import Steps from './components/Steps'
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'GuaranteeSelect',
  components: { Steps },
  mixins: [DetailMixin, MethodsMixin],
  data() {
    return {
      isUpdate: true,
      step: 0,
      theTypeAry: [
        { name: '银行', label: 'bank' },
        { name: '担保机构', label: 'dbjg' },
        { name: '保险', label: 'bx' }
      ],
      bankList: [],
      guaranteeList: [],
      insuranceList: [],
      theType: 'bank',
      radio: '0'
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.getStep()
      this.getList()
    },
    getList() {
      selectApi.list().then(({ code, data, msg }) => {
        if (code === 200) {
          this.bankList = data.bank
          this.guaranteeList = data.dbjg
          this.insuranceList = data.bx
        } else {
          this.$message.error(msg)
        }
      })
    },
    getStep() {
      guaranteeApi.details(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.step = data.guaranteeBaseInfo.step || 0
          this.theType = data.guaranteeBaseInfo.typeName || ''
          this.radio = data.guaranteeBaseInfo.orgId || ''
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      if (this.radio !== '0') {
        console.log(this.updateId, this.radio)
        guaranteeApi.select({ gId: this.updateId, orgId: this.radio }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success('选择担保机构成功')
            if (+this.step === -1) {
              this.routerClose(`/guarantee/preview/${this.updateId}`)
            } else {
              guaranteeApi
                .step({
                  gId: this.updateId,
                  step: 4
                })
                .then(({ code, data, msg }) => {
                  if (code === 200) {
                    this.routerClose(`/guarantee/preview/${this.updateId}`)
                  } else {
                    this.$message.error(msg)
                  }
                })
            }
          } else {
            this.message.error(msg)
          }
        })
      } else {
        this.$message.error('请选择一个担保机构')
      }
    },
    handleRadioChange() {
      this.radio = '0'
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/details.scss');
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    height: 36px;
    line-height: 36px;
  }
}
</style>
