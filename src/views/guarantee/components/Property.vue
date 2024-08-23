<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="8">
          <el-form-item class="is-required" prop="money" :label="fields.money" :label-width="labelWidth">
            <el-input v-model="postForm.money" :placeholder="fields.money" maxlength="10" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="assetType" :label="fields.assetType" :label-width="labelWidth">
            <el-select v-model="postForm.assetType" :placeholder="fields.assetType" style="width: 100%">
              <el-option v-for="(item, key) in assetTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="is-required" prop="assetBelong" :label="fields.assetBelong" :label-width="labelWidth">
            <el-input v-model="postForm.assetBelong" :placeholder="fields.assetBelong" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="addressArea">
            <!-- 省市区 -->
            <div class="area">
              <el-form-item prop="dwellArea" :label="fields.dwellAddress" :label-width="labelWidth">
                <el-cascader v-model="postForm.dwellArea" :options="regionData" :placeholder="fields.dwellArea" style="width: 100%" />
              </el-form-item>
            </div>
            <!-- 地址 -->
            <div class="address">
              <el-form-item prop="dwellAddress">
                <el-input v-model="postForm.dwellAddress" :placeholder="fields.dwellAddress" style="width: 100%" />
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="description" :label="fields.description" :label-width="labelWidth">
            <el-input v-model="postForm.description" type="textarea" :placeholder="fields.description" :rows="4" resize="none" style="width: 100%" />
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
import { propertyApi } from '@/api/property'
// components
// data
import { PropertyFields as fields } from '../modules/fields'
import { PropertyRules as rulesForm } from '../modules/rules'
// filter
// function
import { getAddressText, getAddressArea } from '@/libs/utils/area'
import { dictGetValueByName } from '@/libs/utils/dict'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import gainDict from '@/components/Mixins/gainDict'
// plugins
import { regionData } from 'element-china-area-data'
// settings
export default {
  name: 'GuaranteeProperty',
  mixins: [DetailMixin, MethodsMixin, gainDict],
  props: {
    id: { type: String, default: '' }, // 担保订单ID
    clueId: { type: String, default: '' }, // 代理人ID
    isUpdate: { type: Boolean, default: false } // true为编辑模式，false为添加模式
  },
  data() {
    return {
      fields,
      rulesForm,
      regionData
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.submitTxt = '财产线索' + (this.isUpdate ? '编辑' : '添加')
      await this.gainDict_assetTypeAry()
      if (this.isUpdate && this.clueId) {
        propertyApi.details(this.clueId).then(({ code, data, msg }) => {
          if (code === 200) {
            this.handleData(data)
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    handleData(data) {
      data.assetType = dictGetValueByName(this.assetTypeAry, data.assetType)
      data.dwellArea = getAddressArea(data.address)
      data.dwellAddress = getAddressText(data.address)
      this.postForm = { ...data }
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            gcId: this.id, // 担保ID
            money: this.postForm.money,
            assetType: dictGetValueByName(this.assetTypeAry, this.postForm.assetType),
            assetBelong: this.postForm.assetBelong,
            address: (this.postForm.dwellArea || '') + '/' + (this.postForm.dwellAddress || ''),
            description: this.postForm.description
          }
          if (this.isUpdate) {
            newForm.clueId = this.clueId
            propertyApi.update(newForm).then(({ code, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.submitLoadingClose()
                this.$emit('PropertyUpdateSuccess')
              } else {
                this.$message.error(msg)
                this.submitLoadingClose()
              }
            })
          } else {
            propertyApi.create(newForm).then(({ code, data, msg }) => {
              if (code === 200) {
                this.$message.success(msg)
                this.submitLoadingClose()
                this.$emit('PropertyCreateSuccess')
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
