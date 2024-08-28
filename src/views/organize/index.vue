<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <template v-if="+postForm.orgStatus === 3">
        <div class="h1Title">审批结果</div>
        <div style="text-indent: 2em; color: red">{{ postForm.description }}</div>
      </template>
      <div class="h1Title">机构信息</div>
      <div class="example">
        <div>
          <span>公司LOGO示例</span>
          <el-image :src="logoImage" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div>
          <span>营业执照示例</span>
          <el-image :src="licenseImageOne" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div>
          <span>营业执照示例</span>
          <el-image :src="licenseImageTwo" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div class="text">
          <ul>
            <li>请上传彩色原件或加盖企业公章的复印件；非企业单位，请使用登记执照照片</li>
            <li>仅限jpeg、jpg、png格式且 大小不超过10M</li>
          </ul>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" maxlength="30" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgCode" :label="fields.orgCode" :label-width="labelWidth">
            <el-input v-model="postForm.orgCode" :placeholder="fields.orgCode" maxlength="18" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgEmail" :label="fields.orgEmail" :label-width="labelWidth">
            <el-input v-model="postForm.orgEmail" :placeholder="fields.orgEmail" maxlength="30" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgTelephone" :label="fields.orgTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.orgTelephone" :placeholder="fields.orgTelephone" maxlength="11" style="width: 100%" />
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
                  <el-input v-model="postForm.dwellAddress" :placeholder="fields.dwellAddress" maxlength="30" style="width: 100%" />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <!-- TODO LOGO-->
        <el-col :span="12">
          <el-form-item class="is-required" :label="fields.logoImage" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="logo" :action="action" :width="200" :height="126" :data="{ type: 2, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
        <!-- TODO 营业执照-->
        <el-col :span="12">
          <el-form-item class="is-required" :label="fields.licenseImage" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="license" :action="action" :width="200" :height="126" :data="{ type: 1, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="h1Title">法人信息</div>
      <div class="example">
        <div>
          <span>身份证正面示例</span>
          <el-image :src="certOne" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div>
          <span>身份证背面示例</span>
          <el-image :src="certTwo" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div class="text">
          <ul>
            <li>仅限jpeg、jpg、png格式且 大小不超过10M</li>
          </ul>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgLegal" :label="fields.orgLegal" :label-width="labelWidth">
            <el-input v-model="postForm.orgLegal" maxlength="10" :placeholder="fields.orgLegal" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="legalCertNo" :label="fields.legalCertNo" :label-width="labelWidth">
            <el-input v-model="postForm.legalCertNo" maxlength="18" :placeholder="fields.legalCertNo" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="legalTelephone" :label="fields.legalTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.legalTelephone" maxlength="11" :placeholder="fields.legalTelephone" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- TODO 法人正面-->
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage1" :label="fields.agentImage1" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="legalOne" :action="action" :width="200" :height="126" :data="{ type: 3, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
        <!-- TODO 法人反面-->
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage2" :label="fields.agentImage2" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="legalTwo" :action="action" :width="200" :height="126" :data="{ type: 4, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="h1Title">经办信息</div>
      <div class="example">
        <div>
          <span>身份证正面示例</span>
          <el-image :src="certOne" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div>
          <span>身份证背面示例</span>
          <el-image :src="certTwo" :style="{ width: 150 + 'px', height: 110 + 'px' }" fit="contain" />
        </div>
        <div class="text">
          <ul>
            <li>仅限jpeg、jpg、png格式且 大小不超过10M</li>
          </ul>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgAgent" :label="fields.orgAgent" :label-width="labelWidth">
            <el-input v-model="postForm.orgAgent" maxlength="10" :placeholder="fields.orgAgent" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentCertNo" :label="fields.agentCertNo" :label-width="labelWidth">
            <el-input v-model="postForm.agentCertNo" maxlength="18" :placeholder="fields.agentCertNo" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentTelephone" :label="fields.agentTelephone" :label-width="labelWidth">
            <el-input v-model="postForm.agentTelephone" maxlength="11" :placeholder="fields.legalTelephone" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- TODO 经办正面-->
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage1" :label="fields.agentImage1" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="agentOne" :action="action" :width="200" :height="126" :data="{ type: 5, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
        <!-- TODO 经办反面-->
        <el-col :span="12">
          <el-form-item class="is-required" prop="agentImage2" :label="fields.agentImage2" :label-width="labelWidth">
            <Multi :auto="false" :accept="accept" :file-list="agentTwo" :action="action" :width="200" :height="126" :data="{ type: 6, orgId: theId }" :limit="1" @onUploadRemove="onUploadRemove" @onUploadSuccess="onUploadSuccess" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="h1Title">账户信息</div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" prop="bank" :label="fields.bank" :label-width="labelWidth">
            <el-input v-model="postForm.bank" maxlength="20" :placeholder="fields.bank" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="accountName" :label="fields.accountName" :label-width="labelWidth">
            <el-input v-model="postForm.accountName" maxlength="30" :placeholder="fields.accountName" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" prop="orgAccount" :label="fields.orgAccount" :label-width="labelWidth">
            <el-input v-model="postForm.orgAccount" maxlength="19" :placeholder="fields.orgAccount" style="width: 100%" />
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
import { rulesForm } from './modules/rules.js'
// filter
// function
import { getAddressText, getAddressArea } from '@/libs/utils/area'
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
      rulesForm,
      labelWidth: '200px',
      regionData,
      theId: '',
      accept: ['.jpg', '.jpeg', '.png', '.gif'].join(','),
      logoImage: require(`@/assets/image/example/full_logo.png`),
      licenseImageOne: require(`@/assets/image/example/licenseOne.jpg`),
      licenseImageTwo: require(`@/assets/image/example/licenseTwo.jpg`),
      certOne: require(`@/assets/image/example/certOne.png`),
      certTwo: require(`@/assets/image/example/certTwo.png`),
      license: [],
      logo: [],
      legalOne: [],
      legalTwo: [],
      agentOne: [],
      agentTwo: [],
      testData: {
        name: '万川集团',
        orgCode: '123456789123456789',
        orgEmail: 'aenuen@qq.com',
        orgTelephone: '13055297726',
        dwellArea: ['35', '3501', '350103'],
        dwellAddress: '交通路永裕花园1座204',
        orgLegal: '石志辉',
        legalCertNo: '350583198306167132',
        legalTelephone: '13055297726',
        orgAgent: '石志辉',
        agentCertNo: '350583198306167132',
        agentTelephone: '13055297726',
        bank: '兴业银行福建永泰支行',
        accountName: '石志辉',
        orgAccount: '1234567891234567891'
      }
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
          if (data) {
            if (+data.orgStatus === 0) {
              this.routerClose('/organize/step')
            } else if (+data.orgStatus === 1) {
              this.routerClose('/organize/success')
            } else {
              this.license = [{ url: data.license }]
              this.logo = [{ url: data.logo }]
              this.legalOne = data.legalCertImage1 ? [{ url: data.legalCertImage1 }] : []
              this.legalTwo = data.legalCertImage2 ? [{ url: data.legalCertImage2 }] : []
              this.agentOne = data.agentCertImage1 ? [{ url: data.agentCertImage1 }] : []
              this.agentTwo = data.agentCertImage2 ? [{ url: data.agentCertImage2 }] : []
              const newForm = {}
              if (data.orgId) newForm.orgId = data.orgId
              newForm.type = 72
              if (data.name) newForm.name = data.name
              if (data.orgCode) newForm.orgCode = data.orgCode
              if (data.orgEmail) newForm.orgEmail = data.orgEmail
              if (data.orgTelephone) newForm.orgTelephone = data.orgTelephone
              if (data.orgAddress) {
                newForm.dwellArea = getAddressArea(data.orgAddress)
                newForm.dwellAddress = getAddressText(data.orgAddress)
              }
              if (data.orgLegal) newForm.orgLegal = data.orgLegal
              if (data.legalCertNo) newForm.legalCertNo = data.legalCertNo
              if (data.legalTelephone) newForm.legalTelephone = data.legalTelephone
              if (data.orgAgent) newForm.orgAgent = data.orgAgent
              if (data.agentCertNo) newForm.agentCertNo = data.agentCertNo
              if (data.agentTelephone) newForm.agentTelephone = data.agentTelephone
              if (data.bank) newForm.bank = data.bank
              if (data.accountName) newForm.accountName = data.accountName
              if (data.orgAccount) newForm.orgAccount = data.orgAccount
              if (data.description) newForm.description = data.description
              newForm.orgStatus = data.orgStatus
              this.postForm = { ...this.postForm, ...newForm }
            }
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    onUploadRemove(type) {
      if (+type === 1) {
        this.license = []
      } else if (+type === 2) {
        this.logo = []
      } else if (+type === 3) {
        this.legalOne = []
      } else if (+type === 4) {
        this.legalTwo = []
      } else if (+type === 5) {
        this.agentOne = []
      } else if (+type === 6) {
        this.agentTwo = []
      }
    },
    onUploadSuccess(type, data) {
      if (+type === 1) {
        this.license = [data]
      } else if (+type === 2) {
        this.logo = [data]
      } else if (+type === 3) {
        this.legalOne = [data]
      } else if (+type === 4) {
        this.legalTwo = [data]
      } else if (+type === 5) {
        this.agentOne = [data]
      } else if (+type === 6) {
        this.agentTwo = [data]
      }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          this.postForm.orgId = this.theId
          this.postForm.type = 72
          this.postForm.orgAddress = (this.postForm.dwellArea.join(',') || '') + '/' + (this.postForm.dwellAddress || '')
          organizeApi.complete(this.postForm).then(({ code, data, msg }) => {
            if (code === 200) {
              this.routerClose('/organize/step')
              this.submitLoadingClose()
            } else {
              this.$message.error(msg)
            }
            this.submitLoadingClose()
          })
        } else {
          this.validateErrHandle(fields)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./styles/detail.scss');
</style>
