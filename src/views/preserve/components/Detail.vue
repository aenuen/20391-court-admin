<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" :validate-on-rule-change="false">
      <!-- 法院 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cCourt" :label="fields.cCourt" :label-width="labelWidth">
            <el-select v-model="postForm.cCourt" :placeholder="fields.cCourt" :style="cStyle">
              <el-option v-for="(item, key) in courtAry" :key="key" :value="item.courtId" :label="item.courtName" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保全类类型-->
      <el-row v-show="typeUse">
        <el-col>
          <el-form-item class="is-required" prop="courtType" :label="fields.courtType" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtTypeAry" :key="key" v-model="postForm.courtType" :disabled="+item.dictValue === 2 || +item.dictValue === 3" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保全类别 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="courtCategory" :label="fields.courtCategory" :label-width="labelWidth">
            <el-radio v-for="(item, key) in courtCategoryAry" :key="key" v-model="postForm.courtCategory" :disabled="+item.dictValue === 3" :label="item.dictValue">{{ item.name }}</el-radio>
            <div class="selectTxt">{{ selectTxt }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.courtCategory === 2">
        <!-- 案件类型 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="cCaseType" :label="fields.cCaseType" :label-width="labelWidth">
              <el-select v-model="postForm.cCaseType" :placeholder="fields.cCaseType" :style="cStyle">
                <el-option v-for="(item, key) in caseTypeAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 案号 -->
        <div class="caseLine">
          <div>
            <el-form-item class="is-required" prop="caseYear" :label="fields.cCaseNo" :label-width="labelWidth">
              <el-date-picker v-model="postForm.caseYear" class="caseItem" type="year" :placeholder="fields.caseYear" :clearable="false" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseCode">
              <el-input v-model="postForm.caseCode" class="caseItem" :placeholder="fields.caseCode" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="caseZips">
              <el-input v-model="postForm.caseZips" class="caseItem zip" :placeholder="fields.caseZips" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="codeOrder">
              <el-input v-model="postForm.codeOrder" class="caseItem" :placeholder="fields.codeOrder" />
            </el-form-item>
          </div>
          <div class="caseHao">号</div>
          <div class="caseExps">例（2018）京01民初10号</div>
        </div>
        <template v-if="+postForm.cCaseType === 13">
          <!-- 行为案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReasonMain" :label="fields.cCaseReasonMain" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReasonMain" :placeholder="fields.cCaseReasonMain" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 行为案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReasonAction" :label="fields.cCaseReasonAction" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReasonAction" :placeholder="fields.cCaseReasonAction" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <!-- 案由 -->
          <el-row>
            <el-col>
              <el-form-item class="is-required" prop="cCaseReason" :label="fields.cCaseReason" :label-width="labelWidth">
                <el-input v-model="postForm.cCaseReason" :placeholder="fields.cCaseReason" clearable :style="cStyle" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </template>
      <!-- 保全金额 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cMoney" :label="fields.cMoney" :label-width="labelWidth">
            <el-input v-model="postForm.cMoney" :placeholder="fields.cMoney" clearable :style="cStyle">
              <template slot="append">元</template>
            </el-input>
            <div class="bigPrice">{{ bigWritePrice }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 担保情况-->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="guaranteeCase" :label="fields.guaranteeCase" :label-width="labelWidth">
            <el-radio v-for="(item, key) in ensureAry" :key="key" v-model="postForm.guaranteeCase" :label="item.dictValue">{{ item.name }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="+postForm.guaranteeCase === 1">
        <!-- 是否购买 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="purchaseStatus" :label="fields.purchaseStatus" :label-width="labelWidth">
              <el-radio v-for="(item, key) in purchaseStatusAry" :key="key" v-model="postForm.purchaseStatus" :label="item.dictValue">{{ item.name }}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="+postForm.purchaseStatus === 0">
          <el-row>
            <el-col>
              <el-form-item :label-width="labelWidth">
                <el-button @click="routerGo('/guarantee/create')">去购买</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
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
                  <el-input v-model="postForm.gId" :disabled="true" :placeholder="fields.gId" :style="cStyle">
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
            <el-row>
              <el-col>
                <el-form-item class="is-required" label="上传保函" :label-width="labelWidth">
                  <Multi ref="upload" :action="action" :accept="accept" :limit="1" :auto="false" :data="{ cId: updateId }" @onUploadSuccess="onUploadSuccess" />
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
                  <div class="bigPrice">{{ bigPrice }}</div>
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
      </template>
      <template v-if="+postForm.guaranteeCase === 2">
        <!-- 无需担保原因 -->
        <el-row>
          <el-col>
            <el-form-item class="is-required" prop="noGuaranteeReason" :label="fields.noGuaranteeReason" :label-width="labelWidth">
              <el-select v-model="postForm.noGuaranteeReason" :placeholder="fields.noGuaranteeReason" :style="cStyle">
                <el-option v-for="(item, key) in noGuaranteeReasonAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 提交人身份 -->
      <el-row>
        <el-col>
          <el-form-item class="is-required" prop="cIssueStatus" :label="fields.cIssueStatus" :label-width="labelWidth">
            <el-select v-model="postForm.cIssueStatus" :placeholder="fields.cIssueStatus" :style="cStyle">
              <el-option v-for="(item, key) in issueStatusAry" :key="key" :value="String(item.dictValue)" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col>
          <el-form-item prop="cDesc" :label="fields.cDesc" :label-width="labelWidth">
            <el-input v-model="postForm.cDesc" :placeholder="fields.cDesc" clearable :style="cStyle" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 需知 -->
      <el-row>
        <el-col>
          <el-form-item prop="IAgree" :label-width="labelWidth">
            <el-checkbox v-model="postForm.IAgree">同意</el-checkbox>
            <span style="color: #1890ff; cursor: pointer" @click="noticeOpen">《诉讼保全需知》</span>
          </el-form-item>
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
    <!-- 须知 -->
    <el-dialog v-if="noticeControl" width="840px" title="诉讼保全需知" :visible.sync="noticeControl" :before-close="noticeClose">
      <Notice @IAgree="IAgree" />
    </el-dialog>
    <!-- 关联ID -->
    <el-dialog v-if="dialogVisible" width="1100px" :visible.sync="dialogVisible" title="关联ID" :before-close="dialogClose">
      <Table :table-data="tableData" :table-data-length="tableDataLength" @handleFilter="onHandleFilter" @refresh="onRefresh" @selected="onSelected" />
    </el-dialog>
  </div>
</template>
<script>
// api
import { courtApi } from '@/api/court'
import { preserveApi } from '@/api/preserve'
import { guaranteeApi } from '@/api/guarantee'
import { approveApi } from '@/api/approve'
// components
import Notice from './Notice'
import Multi from '@/components/Upload/MultiNoAuto'
import Table from '../table'
// data
import { DetailFields as fields } from '../modules/fields.js'
import { DetailCommon, DetailOne, DetailTwo, DetailThree, selectOne, selectTwo } from '../modules/rules.js'
// filter
// function
import { postData } from '../modules/utils.js'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import GainDict from '@/components/Mixins/GainDict'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { controlInputPrice, numberPriceBigWrite } from 'abbott-methods/import'
// settings
import { apiCourtUrl } from '@/settings'
export default {
  name: 'PreserveDetail',
  components: { Notice, Multi, Table },
  mixins: [DetailMixin, MethodsMixin, GainDict, ListMixin],
  data() {
    return {
      fields,
      rulesForm: { ...DetailCommon },
      typeUse: false,
      selectTxt: '如未在法院立案，请选择“诉前保全”，如已在法院立案，请选择“诉讼保全”，若选择错误，可能导致保全不成功！',
      postForm: {
        courtType: '1',
        courtCategory: '1',
        guaranteeCase: '1',
        purchaseStatus: '0',
        purchasePlat: '1'
      },
      ensureAry: [
        { name: '有担保', dictValue: '1' },
        { name: '无需担保', dictValue: '2' }
      ],
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
      bigPrice: '',
      dialogVisible: false,
      courtAry: [],
      noticeControl: true,
      commonStyle: {
        width: this.commonWidth
      },
      tempCase: 0
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
    'postForm.cMoney': function (val) {
      this.postForm.cMoney = controlInputPrice(val)
      this.bigWritePrice = this.postForm.cMoney ? numberPriceBigWrite(this.postForm.cMoney) : ''
    },
    'postForm.guaranteeValue': function (val) {
      this.postForm.guaranteeValue = controlInputPrice(val)
      this.bigPrice = this.postForm.guaranteeValue ? numberPriceBigWrite(this.postForm.guaranteeValue) : ''
    }
  },
  created() {
    this.gainDict_courtTypeAry()
    this.gainDict_courtCategoryAry()
    this.gainDict_issueStatusAry()
    this.gainDict_noGuaranteeReasonAry()
    this.gainDict_caseTypeAry()
    this.gainDict_orgTypeAry()
    this.gainList()
    this.submitTxt = '保全申请'
    this.rulesForm = { ...DetailCommon, ...DetailOne, ...DetailTwo, ...DetailThree, ...selectOne, ...selectTwo }
  },
  methods: {
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
    // 过滤
    onHandleFilter(queryList) {
      this.queryList = { ...this.queryList, ...queryList }
      this.getList()
    },
    // 刷新
    onRefresh(queryList) {
      this.queryList = { ...this.queryList, ...queryList }
      this.getList()
    },
    // 选中担保记录
    onSelected(gId) {
      this.postForm = {
        ...this.postForm,
        ...{ gId }
      }
      this.dialogVisible = false
    },
    // 打开选取弹窗
    getGid() {
      this.dialogVisible = true
      this.$router.push({
        path: this.$route.path,
        query: {
          isApprove: true,
          pageNum: 1,
          pageSize: 5
        }
      })
      this.getList()
    },
    // 关闭选取弹窗
    dialogClose() {
      this.dialogVisible = false
    },
    // 上传成功
    onUploadSuccess() {
      this.stepJump(11)
    },
    // 更新步聚并跳转
    stepJump(num) {
      if (+num === 11) {
        preserveApi.step({ cId: this.updateId, step: 11 }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success('提交成功')
            this.routerClose('/preserve/details/' + this.updateId)
          } else {
            this.$message.error(msg)
          }
        })
      } else if (+num === 1) {
        approveApi.preserveApprove({ cId: this.updateId }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success('提交成功')
            this.routerClose(`/preserve/audit/${this.updateId}`)
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 提交
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          const data = postData(this.postForm)
          if (this.isUpdate) {
            this.submitLoadingClose()
          } else {
            preserveApi.create(data).then(({ code, data, msg }) => {
              if (code === 200) {
                this.updateId = data
                this.$message.success(msg)
                this.tempCase = +data.guaranteeCase
                this.submitLoadingClose()
                if (+data.guaranteeCase === 2) {
                  // 无需担保
                  this.stepJump(11)
                } else {
                  // 有但保
                  if (+data.purchasePlat === 1) {
                    // 本系统
                    this.stepJump(1)
                  } else {
                    // 其它平台
                    this.$refs.upload.fileName = ''
                    this.$nextTick(() => {
                      this.$refs.upload.$refs.multi.submit()
                    }, 100)
                  }
                }
              } else {
                this.$message.error(msg)
              }
            })
            this.submitLoadingClose()
          }
        } else {
          this.validateErrHandle(fields)
        }
      })
    },
    // 法院列表
    gainList() {
      courtApi.all().then(({ code, data, msg }) => {
        if (code === 200) {
          this.courtAry = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 我同意
    IAgree() {
      this.noticeControl = false
      this.postForm.IAgree = true
    },
    // 打开须知
    noticeOpen() {
      this.noticeControl = true
    },
    // 关闭须知
    noticeClose() {
      this.noticeControl = false
    }
  }
}
</script>
<style lang="scss" scoped>
.caseLine {
  width: 1015px;
  display: flex;
  justify-content: flex-start;
  .caseItem {
    margin-right: 10px;
    width: 115px;
    &.zip {
      width: 125px;
    }
  }
  .caseHao {
    line-height: 36px;
    font-size: 14px;
  }
  .caseExps {
    margin-left: 10px;
    color: #999;
    line-height: 36px;
    font-size: 14px;
  }
}
.selectTxt,
.bigPrice {
  color: #999;
}
</style>
