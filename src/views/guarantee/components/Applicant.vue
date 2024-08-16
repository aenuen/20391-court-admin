<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <el-row>
        <el-col>
          <el-form-item prop="category" :label="identity + '身份'" :label-width="labelWidth">
            <el-radio v-model="postForm.category" :label="1">自然人</el-radio>
            <el-radio v-model="postForm.category" :label="2">法人</el-radio>
            <el-radio v-model="postForm.category" :label="3">非法人组织</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="country" :label="fields.country" :label-width="labelWidth">
            <el-select v-model="postForm.country" :placeholder="fields.country" style="width: 100%">
              <el-option v-for="(item, key) in countryAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="idType" :label="fields.idType" :label-width="labelWidth">
            <el-select v-model="postForm.idType" :placeholder="fields.idType" style="width: 100%">
              <el-option v-for="(item, key) in certTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="idNumber" :label="fields.idNumber" :label-width="labelWidth">
            <el-input v-model="postForm.idNumber" :placeholder="fields.idNumber" maxlength="18" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="postForm.category !== 1">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="unitNature" :label="fields.unitNature" :label-width="labelWidth">
              <el-select v-model="postForm.unitNature" :placeholder="fields.unitNature" style="width: 100%">
                <el-option v-for="(item, key) in unitPropertyAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="legalPerson" :label="fields.legalPerson" :label-width="labelWidth">
              <el-input v-model="postForm.legalPerson" :placeholder="fields.legalPerson" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="legalJob" :label="fields.legalJob" :label-width="labelWidth">
              <el-input v-model="postForm.legalJob" :placeholder="fields.legalJob" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item prop="unitArea" :label="fields.address" :label-width="labelWidth">
                  <el-cascader v-model="postForm.unitArea" :options="regionData" :placeholder="fields.unitArea" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item prop="unitAddress">
                  <el-input v-model="postForm.unitAddress" :placeholder="fields.unitAddress" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item prop="signArea" :label="fields.signArea" :label-width="labelWidth">
                  <el-cascader v-model="postForm.signArea" :options="regionData" :placeholder="fields.signArea" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item prop="signAddress">
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
            <el-form-item prop="birthday" :label="fields.birthday" :label-width="labelWidth">
              <el-date-picker v-model="postForm.birthday" :placeholder="fields.birthday" type="date" :clearable="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="old" :label="fields.old" :label-width="labelWidth">
              <el-input v-model="postForm.old" :placeholder="fields.old" maxlength="18" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="nation" :label="fields.nation" :label-width="labelWidth">
              <el-select v-model="postForm.nation" :placeholder="fields.nation" style="width: 100%">
                <el-option v-for="(item, key) in nationAry" :key="key" :value="String(item.dickValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sex" :label="fields.sex" :label-width="labelWidth">
              <el-radio v-model="postForm.sex" :label="1">男性</el-radio>
              <el-radio v-model="postForm.sex" :label="2">女性</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="addressArea">
              <div class="area">
                <el-form-item prop="area" :label="fields.address" :label-width="labelWidth">
                  <el-cascader v-model="postForm.area" :options="regionData" :placeholder="fields.area" style="width: 100%" />
                </el-form-item>
              </div>
              <div class="address">
                <el-form-item prop="address">
                  <el-input v-model="postForm.address" :placeholder="fields.address" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" maxlength="11" style="width: 100%" />
          </el-form-item>
        </el-col>
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
// components
// data
import { ApplicantFields as fields } from '../modules/fields'
import { ApplicantCommon, ApplicantOne, ApplicantTwo } from '../modules/rules'
// filter
// function
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import nationAry from '../mixins/nationAry'
import countryAry from '../mixins/countryAry'
import certTypeAry from '../mixins/certTypeAry'
import unitPropertyAry from '../mixins/unitPropertyAry'
// plugins
import { regionData } from 'element-china-area-data'

// settings
export default {
  name: 'GuaranteeApplicant',
  components: {},
  mixins: [DetailMixin, MethodsMixin, nationAry, countryAry, certTypeAry, unitPropertyAry],
  props: {
    applicant: { type: Boolean, default: true }, // true为申请人,false为被申请人
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      identity: '',
      submitTxt: '',
      regionData
    }
  },
  watch: {
    'postForm.category': function (val) {
      this.fields.name = val === 1 ? '姓名' : '单位名称'
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
    initialize() {
      this.identity = this.applicant ? '申请人' : '被申请人'
      const isUpdate = this.isUpdate ? '编辑' : '添加'
      this.submitTxt = this.identity + isUpdate
      const form = { category: 1, sex: 1, nation: '汉族' }
      this.postForm = { ...this.postForm, ...form }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          // this.$router.push({
          //   path: `/guarantee/details/1`
          // })
          this.submitLoadingClose()
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
