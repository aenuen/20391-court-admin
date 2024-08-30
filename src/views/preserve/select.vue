<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 是否购买 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="purchaseStatus" :label="fields.purchaseStatus" :label-width="labelWidth">
            <el-radio v-for="(item, key) in purchaseStatusAry" :key="key" v-model="postForm.purchaseStatus" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.purchaseStatus === 1">
        <!-- 购买平台 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="purchasePlat" :label="fields.purchasePlat" :label-width="labelWidth">
              <el-select v-model="postForm.purchasePlat" :placeholder="fields.purchasePlat" :style="cStyle">
                <el-option v-for="(item, key) in purchasePlatAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="+postForm.purchasePlat === 1">
          <!-- 关联ID -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="gId" :label="fields.gId" :label-width="labelWidth">
                <el-input v-model="postForm.gId" :placeholder="fields.gId" clearable :style="cStyle">
                  <template slot="append">
                    <el-button @click="getGid">选取</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <!-- 上传保函 -->
          <!-- TODO -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" label="上传保函" :label-width="labelWidth">
                <Multi :action="action" :accept="accept" :data="{ cId: updateId }" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 担保方式 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="guaranteeType" :label="fields.guaranteeType" :label-width="labelWidth">
                <el-select v-model="postForm.guaranteeType" :placeholder="fields.guaranteeType" :style="cStyle">
                  <el-option v-for="(item, key) in orgTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 担保人 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="guaranteePerson" :label="fields.guaranteePerson" :label-width="labelWidth">
                <el-input v-model="postForm.guaranteePerson" :placeholder="fields.guaranteePerson" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 担保机构 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="orgId" :label="fields.orgId" :label-width="labelWidth">
                <el-input v-model="postForm.orgId" :placeholder="fields.orgId" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 担保价值 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="guaranteeValue" :label="fields.guaranteeValue" :label-width="labelWidth">
                <el-input v-model="postForm.guaranteeValue" :placeholder="fields.guaranteeValue" clearable :style="cStyle">
                  <template slot="append">元</template>
                </el-input>
                <div class="bigPrice">{{ bigWritePrice }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 担保机构 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="guaranteeDesc" :label="fields.guaranteeDesc" :label-width="labelWidth">
                <el-input v-model="postForm.guaranteeDesc" :placeholder="fields.guaranteeDesc" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </template>
      <!-- 提交 -->
      <el-row>
        <el-col>
          <el-form-item :label-width="labelWidth">
            <el-button v-if="+postForm.purchaseStatus === 0" @click="routerGo('/guarantee/create')">去购买</el-button>
            <el-button v-if="+postForm.purchaseStatus === 1" type="primary" @click="submitForm">{{ submitTxt }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 弹窗 -->
    <el-dialog v-if="dialogVisible" width="1100px" :visible.sync="dialogVisible" title="关联ID" :before-close="dialogClose">
      <Table :table-data="tableData" :table-data-length="tableDataLength" @handleFilter="onHandleFilter" @refresh="onRefresh" @selected="onSelected" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { preserveApi } from '@/api/preserve'
import { guaranteeApi } from '@/api/guarantee'
import { approveApi } from '@/api/approve'
// components
import Table from './table'
import Multi from '@/components/Upload/Multi'
// data
import { DetailFields as fields } from './modules/fields'
import { selectCommon as rulesForm } from './modules/rules'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
// plugins
import { controlInputPrice, numberPriceBigWrite } from 'abbott-methods/import'
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'PreserveSelect',
  components: { Table, Multi },
  mixins: [ListMixin, DetailMixin, MethodsMixin, GainDict],
  data() {
    return {
      isUpdate: true,
      fields,
      rulesForm,
      postForm: {
        purchaseStatus: '0'
      },
      submitTxt: '下一步',
      purchaseStatusAry: [
        { dictValue: '0', name: '未购买' },
        { dictValue: '1', name: '已购买' }
      ],
      purchasePlatAry: [
        { dictValue: '1', name: '本系统' },
        { dictValue: '2', name: '其它平台' }
      ],
      accept: ['.pdf'].join(','),
      fileList: [],
      litigationId: '',
      bigWritePrice: '',
      dialogVisible: false
    }
  },
  computed: {
    cStyle() {
      return { width: this.commonWidth }
    },
    action() {
      return apiCourtUrl + '/LitigationOrder/upload'
    }
  },
  watch: {
    'postForm.guaranteeValue': function (val) {
      this.postForm.guaranteeValue = controlInputPrice(val)
      this.bigWritePrice = this.postForm.guaranteeValue ? numberPriceBigWrite(this.postForm.guaranteeValue) : ''
    }
  },
  created() {
    this.gainDict_orgTypeAry()
    this.gainOrder()
  },
  methods: {
    startHandle() {
      this.getList()
    },
    // 获取列表
    getList() {
      guaranteeApi.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { records, total } = data
          this.tableData = records
          this.tableDataLength = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    setData() {
      return {
        isApprove: true,
        pageSize: 5
      }
    },
    onHandleFilter(queryList) {
      this.queryList = { ...this.queryList, ...queryList }
      this.handleFilter()
    },
    onRefresh(queryList) {
      this.queryList = { ...this.queryList, ...queryList }
      this.refresh()
    },
    onSelected(gId) {
      this.postForm.gId = gId
      this.dialogVisible = false
    },
    getGid() {
      this.dialogVisible = true
    },
    dialogClose() {
      this.dialogVisible = false
    },
    gainOrder() {
      preserveApi.order(this.updateId).then(({ code, data, msg }) => {
        if (code === 200) {
          this.litigationId = data.litigationId
        } else {
          this.$message.error(msg)
        }
      })
    },
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const newForm = {
            litigationId: this.litigationId,
            cid: this.updateId
          }
          newForm.purchaseStatus = this.postForm.purchaseStatus
          newForm.purchasePlat = this.postForm.purchasePlat
          if (+newForm.purchasePlat === 1) {
            newForm.gId = this.postForm.gId
          } else {
            newForm.guaranteeType = this.postForm.guaranteeType
            newForm.guaranteePerson = this.postForm.guaranteePerson
            newForm.orgId = this.postForm.orgId
            newForm.guaranteeValue = this.postForm.guaranteeValue
            newForm.guaranteeDesc = this.postForm.guaranteeDesc
          }
          if (this.isUpdate) {
            preserveApi.createOrder(newForm).then(({ code, data, msg }) => {
              if (code === 200) {
                if (+newForm.purchasePlat === 1) {
                  approveApi.preserveApprove({ cId: this.updateId }).then(({ code, data, msg }) => {
                    if (code === 200) {
                      this.$message.success('提交成功')
                      this.routerClose(`/preserve/audit/${this.updateId}`)
                    } else {
                      this.$message.error(msg)
                    }
                  })
                } else {
                  preserveApi.step({ cId: this.updateId, step: 11 }).then(({ code, data, msg }) => {
                    if (code === 200) {
                      this.$message.success('提交成功')
                      this.routerClose('/preserve/details/' + this.updateId)
                    } else {
                      this.$message.error(msg)
                    }
                  })
                }
              } else {
                this.$message.error(msg)
              }
            })
            this.submitLoadingClose()
          } else {
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
<style lang="scss" scoped>
.bigPrice {
  color: #999;
}
</style>
