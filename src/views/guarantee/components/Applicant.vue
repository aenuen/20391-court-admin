<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm">
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
            <el-form-item prop="legal_job" :label="fields.legal_job" :label-width="labelWidth">
              <el-input v-model="postForm.legal_job" :placeholder="fields.legal_job" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="unit_address" :label="fields.unit_address" :label-width="labelWidth">
              <el-input v-model="postForm.unit_address" :placeholder="fields.unit_address" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="sign_address" :label="fields.sign_address" :label-width="labelWidth">
              <el-input v-model="postForm.sign_address" :placeholder="fields.sign_address" style="width: 100%" />
            </el-form-item>
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
            <el-form-item prop="address" :label="fields.address" :label-width="labelWidth">
              <el-input v-model="postForm.address" :placeholder="fields.address" style="width: 100%" />
            </el-form-item>
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
          <el-form-item prop="telephone" :label="fields.telephone" :label-width="labelWidth">
            <el-input v-model="postForm.telephone" :placeholder="fields.telephone" style="width: 30%" />
            <el-input v-model="postForm.telephone" :placeholder="fields.telephone" style="width: 40%" />
            <el-input v-model="postForm.telephone" :placeholder="fields.telephone" style="width: 30%" />
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
import { ApplicantFields } from '../modules/fields'
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
      postForm: { category: 1, sex: 1, nation: '汉族' },
      fields: ApplicantFields,
      identity: '',
      submitTxt: '',
      commonWidth: '300',
      regionData,
      unitNatureAry: []
    }
  },
  watch: {
    'postForm.category': function (val) {
      this.fields.name = val === 1 ? '姓名' : '单位名称'
    }
  },
  created() {
    this.identity = this.applicant ? '申请人' : '被申请人'
    const isUpdate = this.isUpdate ? '编辑' : '添加'
    this.submitTxt = this.identity + isUpdate
  },
  methods: {
    submitForm() {}
  }
}
</script>
<style lang="scss" scoped></style>
