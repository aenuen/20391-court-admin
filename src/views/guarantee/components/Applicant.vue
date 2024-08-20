<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <!-- 申请人 -->
        <el-col>
          <el-form-item class="is-required" prop="applyType" :label="identity + '身份'" :label-width="labelWidth">
            <el-radio v-for="(item, key) in applyTypeAry" :key="key" v-model="postForm.applyType" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- 姓名、单位名称 -->
        <el-col :span="12">
          <el-form-item class="is-required" prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 国别 -->
        <el-col :span="12">
          <el-form-item class="is-required" prop="area" :label="fields.area" :label-width="labelWidth">
            <el-select v-model="postForm.area" :placeholder="fields.area" style="width: 100%">
              <el-option v-for="(item, key) in countryAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- 证件类型 -->
          <el-form-item class="is-required" prop="certType" :label="fields.certType" :label-width="labelWidth">
            <el-select v-model="postForm.certType" :placeholder="fields.certType" style="width: 100%">
              <el-option v-for="(item, key) in certTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 证件号码 -->
        <el-col :span="12">
          <el-form-item class="is-required" prop="certNo" :label="fields.certNo" :label-width="labelWidth">
            <el-input v-model="postForm.certNo" :placeholder="fields.certNo" maxlength="18" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.applyType !== 1">
        <el-row>
          <!-- 单位性质 -->
          <el-col :span="8">
            <el-form-item class="is-required" prop="unitProperty" :label="fields.unitProperty" :label-width="labelWidth">
              <el-select v-model="postForm.unitProperty" :placeholder="fields.unitProperty" style="width: 100%">
                <el-option v-for="(item, key) in unitPropertyAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 法人代表 -->
          <el-col :span="8">
            <el-form-item class="is-required" prop="legalName" :label="fields.legalName" :label-width="labelWidth">
              <el-input v-model="postForm.legalName" :placeholder="fields.legalName" style="width: 100%" />
            </el-form-item>
          </el-col>
          <!-- 法人职务 -->
          <el-col :span="8">
            <el-form-item class="is-required" prop="legalJob" :label="fields.legalJob" :label-width="labelWidth">
              <el-input v-model="postForm.legalJob" :placeholder="fields.legalJob" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 单位地址 -->
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item class="is-required" prop="unitArea" :label="fields.unitAddress" :label-width="labelWidth">
                  <el-cascader v-model="postForm.unitArea" :options="regionData" :placeholder="fields.unitArea" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item class="is-required" prop="unitAddress">
                  <el-input v-model="postForm.unitAddress" :placeholder="fields.unitAddress" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 注册地址 -->
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item class="is-required" prop="signArea" :label="fields.signAddress" :label-width="labelWidth">
                  <el-cascader v-model="postForm.signArea" :options="regionData" :placeholder="fields.signArea" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item class="is-required" prop="signAddress">
                  <el-input v-model="postForm.signAddress" :placeholder="fields.signAddress" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row>
          <el-col :span="12">
            <el-form-item class="is-required" prop="birthday" :label="fields.birthday" :label-width="labelWidth">
              <el-date-picker v-model="postForm.birthday" :placeholder="fields.birthday" type="date" :clearable="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <!-- 年龄 -->
          <el-col :span="12">
            <el-form-item class="is-required" prop="age" :label="fields.age" :label-width="labelWidth">
              <el-input v-model="postForm.age" :placeholder="fields.age" maxlength="18" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 民族 -->
          <el-col :span="12">
            <el-form-item class="is-required" prop="nation" :label="fields.nation" :label-width="labelWidth">
              <el-select v-model="postForm.nation" :placeholder="fields.nation" style="width: 100%">
                <el-option v-for="(item, key) in nationAry" :key="key" :value="String(item.nationId)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 性别 -->
          <el-col :span="12">
            <el-form-item class="is-required" prop="sex" :label="fields.sex" :label-width="labelWidth">
              <el-radio v-model="postForm.sex" :label="1">男性</el-radio>
              <el-radio v-model="postForm.sex" :label="2">女性</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 地址 -->
        <el-row>
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item class="is-required" prop="dwellArea" :label="fields.dwellAddress" :label-width="labelWidth">
                  <el-cascader v-model="postForm.dwellArea" :options="regionData" :placeholder="fields.dwellArea" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item class="is-required" prop="dwellAddress">
                  <el-input v-model="postForm.dwellAddress" :placeholder="fields.dwellAddress" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <el-row>
        <!-- 手机号码 -->
        <el-col :span="12">
          <el-form-item class="is-required" prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" maxlength="11" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 固定电话 -->
        <el-col :span="12">
          <div class="telArea">
            <div>
              <el-form-item prop="areaNumber" :label="fields.telephone" :label-width="labelWidth">
                <el-input v-model="postForm.areaNumber" :placeholder="fields.areaNumber" />
              </el-form-item>
            </div>
            <div class="telephone">
              <el-form-item prop="telephone">
                <el-input v-model="postForm.telephone" :placeholder="fields.telephone" />
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="runNumber">
                <el-input v-model="postForm.runNumber" :placeholder="fields.runNumber" />
              </el-form-item>
            </div>
          </div>
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
import { applicantApi } from '@/api/applicant'
// import { respondentApi } from '@/api/respondent'
// components
// data
import { ApplicantFields as fields } from '../modules/fields'
import { ApplicantCommon, ApplicantOne, ApplicantTwo } from '../modules/rules'
// filter
// function
import { getAddressText, getAddressArea } from '@/libs/utils/area'
import { dictGetValueByName } from '@/libs/utils/dict'
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import gainDict from '../mixins/gainDict'
// plugins
import { timeGetDate } from 'abbott-methods/import'
import { regionData } from 'element-china-area-data'
// settings
export default {
  name: 'GuaranteeApplicant',
  components: {},
  mixins: [DetailMixin, MethodsMixin, gainDict],
  props: {
    id: { type: String, default: '' }, // true为申请人,false为被申请人
    applicantId: { type: String, default: '' }, // true为申请人,false为被申请人
    applicant: { type: Boolean, default: true }, // true为申请人,false为被申请人
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      identity: '',
      submitTxt: '',
      regionData,
      dwellArea: '',
      unitArea: '',
      signArea: ''
    }
  },
  watch: {
    'postForm.applyType': function (val) {
      this.fields.name = +val === 1 ? '姓名' : '单位名称'
      if (val === 1) {
        this.rulesForm = { ...ApplicantCommon, ...ApplicantOne }
      } else {
        this.rulesForm = { ...ApplicantCommon, ...ApplicantTwo }
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      await this.gainDict_applyTypeAry() // 申请人类型
      await this.gainDict_nationAry() // 民族
      await this.gainDict_countryAry() // 国家
      await this.gainDict_certTypeAry() // 证件类型
      await this.gainDict_unitPropertyAry() // 单位性质
      this.identity = this.applicant ? '申请人' : '被申请人'
      const isUpdate = this.isUpdate ? '编辑' : '添加'
      this.submitTxt = this.identity + isUpdate
      const form = { applyType: String(1) }
      this.postForm = { ...this.postForm, ...form }
      if (this.isUpdate && this.applicantId) {
        applicantApi.details(this.applicantId).then(({ code, msg, data }) => {
          if (code === 200) {
            data.applyType = dictGetValueByName(this.applyTypeAry, data.applyType)
            data.dwellArea = getAddressArea(data.dwellAddress)
            data.dwellAddress = getAddressText(data.dwellAddress)
            data.unitArea = getAddressArea(data.unitAddress)
            data.unitAddress = getAddressText(data.unitAddress)
            data.signArea = getAddressArea(data.signAddress)
            data.signAddress = getAddressText(data.signAddress)
            data.mobile = data.telephone
            // 固定电话
            const telephone = String(data.fixedTelephone).split('|')
            data.areaNumber = telephone[0]
            data.telephone = telephone[1]
            data.runNumber = telephone[2]
            this.postForm = { ...data }
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const comForm = {
            gcId: this.id,
            applyType: this.postForm.applyType,
            name: this.postForm.name,
            area: dictGetValueByName(this.countryAry, this.postForm.area),
            certType: dictGetValueByName(this.certTypeAry, this.postForm.certType),
            certNo: this.postForm.certNo,
            telephone: this.postForm.mobile,
            fixedTelephone: `${this.postForm.areaNumber}|${this.postForm.telephone}|${this.postForm.runNumber}`
          }
          const oneForm = {
            birthday: timeGetDate(this.postForm.birthday),
            age: this.postForm.age,
            nation: this.postForm.nation,
            sex: this.postForm.sex,
            address: this.postForm.dwellArea + '/' + this.postForm.dwellAddress
          }
          const twoForm = {
            unitProperty: dictGetValueByName(this.unitPropertyAry, this.postForm.unitProperty),
            legalName: this.postForm.legalName,
            legalJob: this.postForm.legalJob,
            unitAddress: this.postForm.unitArea + '/' + this.postForm.unitAddress,
            signAddress: this.postForm.signArea + '/' + this.postForm.signAddress
          }
          let newForm = {}
          if (+this.postForm.applyType === 1) {
            newForm = { ...comForm, ...oneForm }
          } else {
            newForm = { ...comForm, ...twoForm }
          }
          if (this.applicant) {
            if (this.isUpdate) {
              newForm.applyId = this.applicantId
              applicantApi.update(newForm).then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$emit('ApplicantUpdateSuccess')
                } else {
                  this.$message.error(msg)
                }
              })
              this.submitLoadingClose()
            } else {
              applicantApi.create(newForm).then(({ code, msg }) => {
                if (code === 200) {
                  this.$message.success(msg)
                  this.$emit('ApplicantCreateSuccess')
                } else {
                  this.$message.error(msg)
                }
              })
              this.submitLoadingClose()
            }
          } else {
            if (this.isUpdate) {
              //
            } else {
              //
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
