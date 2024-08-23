<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <div class="h1Title">基本信息</div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgCode" :label="fields.orgCode" :label-width="labelWidth">
            <el-input v-model="postForm.orgCode" :placeholder="fields.orgCode" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgEmail" :label="fields.orgEmail" :label-width="labelWidth">
            <el-input v-model="postForm.orgEmail" :placeholder="fields.orgEmail" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgTelephone" :label="fields.orgTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.orgTelephone" :placeholder="fields.orgTelephone" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" :label="fields.logoImage" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :action="action" :width="200" :height="126" :data="{ type: 2, orgId: theId }" :limit="1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" :label="fields.licenseImage" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :action="action" :width="200" :height="126" :data="{ type: 1, orgId: theId }" :limit="1" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="h1Title">法人信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item class="is-required" prop="orgLegal" :label="fields.orgLegal" :label-width="labelWidth">
            <el-input v-model="postForm.orgLegal" :placeholder="fields.orgLegal" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="legalCertNo" :label="fields.legalCertNo" :label-width="labelWidth">
            <el-input v-model="postForm.legalCertNo" :placeholder="fields.legalCertNo" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="legalTelephone" :label="fields.legalTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.legalTelephone" :placeholder="fields.legalTelephone" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage1" :label="fields.agentImage1" :label-width="labelWidth"> <Multi :auto="false" /> </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage2" :label="fields.agentImage2" :label-width="labelWidth"> <Multi :auto="false" /> </el-form-item>
        </el-col>
      </el-row>
      <div class="h1Title">经办信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item class="is-required" prop="orgAgent" :label="fields.orgAgent" :label-width="labelWidth">
            <el-input v-model="postForm.orgAgent" :placeholder="fields.orgAgent" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="agentCertNo" :label="fields.agentCertNo" :label-width="labelWidth">
            <el-input v-model="postForm.agentCertNo" :placeholder="fields.agentCertNo" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="agentTelephone" :label="fields.agentTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.agentTelephone" :placeholder="fields.legalTelephone" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage1" :label="fields.agentImage1" :label-width="labelWidth">
            <Multi :auto="false" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage2" :label="fields.agentImage2" :label-width="labelWidth">
            <Multi :auto="false" />
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
import { organizeApi } from '@/api/organize'
// components
import Multi from '@/components/Upload/MultiOrganize'
// data
import { fields } from './modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
import { regionData } from 'element-china-area-data'
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'OrganizeIndex',
  components: { Multi },
  mixins: [DetailMixin, MethodsMixin, GainDict],
  data() {
    return {
      fields,
      labelWidth: '200px',
      regionData,
      theId: '',
      accept: ['.jpg', '.jpeg', '.png', '.gif'].join(',')
    }
  },
  computed: {
    action() {
      return apiCourtUrl + '/organization/upload'
    }
  },
  created() {},
  methods: {
    startHandle() {
      this.submitTxt = '信息' + (this.isUpdate ? '编辑' : '提交')
      this.gainDict_orgTypeAry()
      this.getId()
      this.getDetail()
    },
    getId() {
      organizeApi.getId().then(({ code, data, msg }) => {
        if (code === 200) {
          this.theId = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    getDetail() {
      organizeApi.detail().then(({ code, data, msg }) => {
        if (code === 200) {
          console.log('🚀 ~ ', data)
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {}
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/detail.scss');
</style>
