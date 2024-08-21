<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <!-- 代理人类型 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="agentType"
            :label="fields.agentType"
            :label-width="labelWidth"
          >
            <el-select
              v-model="postForm.agentType"
              :placeholder="fields.agentType"
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, key) in agentTypeAry"
                :key="key"
                :value="String(item.dictValue)"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 代理人 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="agentName"
            :label="fields.agentName"
            :label-width="labelWidth"
          >
            <el-input
              v-model="postForm.agentName"
              :placeholder="fields.agentName"
              maxlength="10"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- 性别 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="sex"
            :label="fields.sex"
            :label-width="labelWidth"
          >
            <el-radio v-model="postForm.sex" :label="0">男性</el-radio>
            <el-radio v-model="postForm.sex" :label="1">女性</el-radio>
          </el-form-item>
        </el-col>
        <!-- 执业号 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="practiceCertNo"
            :label="fields.practiceCertNo"
            :label-width="labelWidth"
          >
            <el-input
              v-model="postForm.practiceCertNo"
              :placeholder="fields.practiceCertNo"
              maxlength="18"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- 证件类型 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="certType"
            :label="fields.certType"
            :label-width="labelWidth"
          >
            <el-select
              v-model="postForm.certType"
              :placeholder="fields.certType"
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, key) in certTypeAry"
                :key="key"
                :value="String(item.dictValue)"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 证件号 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="certNo"
            :label="fields.certNo"
            :label-width="labelWidth"
          >
            <el-input
              v-model="postForm.certNo"
              :placeholder="fields.certNo"
              maxlength="18"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="addressArea">
            <!-- 省市区 -->
            <div class="area">
              <el-form-item
                class="is-required"
                prop="dwellArea"
                :label="fields.dwellAddress"
                :label-width="labelWidth"
              >
                <el-cascader
                  v-model="postForm.dwellArea"
                  :options="regionData"
                  :placeholder="fields.dwellArea"
                  style="width: 100%"
                />
              </el-form-item>
            </div>
            <!-- 地址 -->
            <div class="address">
              <el-form-item class="is-required" prop="dwellAddress">
                <el-input
                  v-model="postForm.dwellAddress"
                  :placeholder="fields.dwellAddress"
                  style="width: 100%"
                />
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <!-- 手机号码 -->
        <el-col :span="12">
          <el-form-item
            class="is-required"
            prop="mobile"
            :label="fields.mobile"
            :label-width="labelWidth"
          >
            <el-input
              v-model="postForm.mobile"
              :placeholder="fields.mobile"
              maxlength="11"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <!-- 固定电话 -->
        <el-col :span="12">
          <div class="telArea">
            <div>
              <el-form-item
                prop="areaNumber"
                :label="fields.telephone"
                :label-width="labelWidth"
              >
                <el-input
                  v-model="postForm.areaNumber"
                  :placeholder="fields.areaNumber"
                />
              </el-form-item>
            </div>
            <div class="telephone">
              <el-form-item prop="telephone">
                <el-input
                  v-model="postForm.telephone"
                  :placeholder="fields.telephone"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="runNumber">
                <el-input
                  v-model="postForm.runNumber"
                  :placeholder="fields.runNumber"
                />
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" @click="submitForm">{{
              submitTxt
            }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// api
import { agentApi } from '@/api/agent'
// components
// data
import { AgentFields as fields } from '../modules/fields'
import { AgentRules as rulesForm } from '../modules/rules'
// filter
// function
import { getAddressText, getAddressArea } from '@/libs/utils/area'
import { dictGetValueByName } from '@/libs/utils/dict'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import gainDict from '../mixins/gainDict'
// plugins
import { regionData } from 'element-china-area-data'
// settings
export default {
  name: 'GuaranteeAgent',
  components: {},
  mixins: [DetailMixin, MethodsMixin, gainDict],
  props: {
    id: { type: String, default: '' }, // 担保订单ID
    agentId: { type: String, default: '' }, // 代理人ID
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      rulesForm,
      regionData
    }
  },
  computed: {},
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.submitTxt = '原告代理人' + (this.isUpdate ? '编辑' : '添加')
      await this.gainDict_agentTypeAry()
      await this.gainDict_certTypeAry()
      if (this.isUpdate && this.agentId) {
        agentApi.details(this.agentId).then(({ code, data, msg }) => {
          if (code === 200) {
            this.handleData(data)
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    handleData(data) {
      data.agentType = dictGetValueByName(this.agentTypeAry, data.agentType)
      data.certType = dictGetValueByName(this.agentTypeAry, data.certType)
      data.dwellArea = getAddressArea(data.address)
      data.dwellAddress = getAddressText(data.address)
      data.mobile = data.telephone
      // 固定电话
      const telephone = String(data.fixedTelephone).split('|')
      data.areaNumber = telephone[0] || ''
      data.telephone = telephone[1] || ''
      data.runNumber = telephone[2] || ''
      this.postForm = { ...data }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            gcId: this.id, // 担保ID
            agentType: dictGetValueByName(
              this.agentTypeAry,
              this.postForm.agentType
            ),
            agentName: this.postForm.agentName,
            sex: this.postForm.sex,
            practiceCertNo: this.postForm.practiceCertNo,
            certType: dictGetValueByName(
              this.certTypeAry,
              this.postForm.certType
            ),
            certNo: this.postForm.certNo,
            address:
              (this.postForm.dwellArea || '') +
              '/' +
              (this.postForm.dwellAddress || ''),
            telephone: this.postForm.mobile,
            fixedTelephone: `${this.postForm.areaNumber || ''}|${
              this.postForm.telephone || ''
            }|${this.postForm.runNumber || ''}`
          }
          if (this.isUpdate) {
            newForm.agentId = this.agentId
            agentApi.update(newForm).then(({ code, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.submitLoadingClose()
                this.$emit('AgentUpdateSuccess')
              } else {
                this.$message.error(msg)
                this.submitLoadingClose()
              }
            })
          } else {
            agentApi.create(newForm).then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.submitLoadingClose()
                this.$emit('AgentCreateSuccess')
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
.addressArea,
.telArea {
  display: flex;
  justify-content: flex-start;

  .telephone {
    margin: auto 5px;
  }

  .area {
    width: 335px;
  }

  .address {
    width: 530px;
    margin-left: 5px;
  }
}
</style>
